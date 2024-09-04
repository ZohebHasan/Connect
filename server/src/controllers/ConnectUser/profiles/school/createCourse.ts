import { Request, Response } from "express";
import mongoose from 'mongoose';
import SchoolProfile from '../../../../models/profiles/school/school';
import User from '../../../../models/userModel';
import Course from '../../../../models/profiles/school/course';

import { AuthenticatedRequest } from '../../../../middleware/authMiddleware';

interface School {
    school: string;
    name: string;
    domain: string; // Domain could be undefined, so we handle it
}

interface Course {
    courseId: string;
    courseName: string;
    courseCode: string;
    school: School;
    createdBy: string;
    instructor: string[];
    TAs: string[];
    students: string[];
    isPrivate: boolean;
    isStudentLed: boolean;
}

export const createCourse = async (req: AuthenticatedRequest, res: Response) => {
    console.log('Received request to create course with body:', req.body);

    const userId = req.user?.id;

    if (!userId) {
        console.error('User ID is missing');
        return res.status(400).json({ message: 'user_id required' });
    }

    const {
        courseName,
        courseCode,
        isPrivate,
    } = req.body;

    try {
        console.log('Finding user with ID:', userId);
        const user = await User.findById(userId);
        if (!user) {
            console.error('User does not exist');
            return res.status(400).json({ message: 'User does not exist' });
        }

        console.log('Finding school profile for user with ID:', userId);
        const schoolProfile = await SchoolProfile.findOne({ user: userId });

        if (!schoolProfile) {
            console.error('School profile not found');
            return res.status(404).json({ message: 'School profile not found' });
        }

         // Remove spaces from courseCode
         const sanitizedCourseCode = courseCode.replace(/\s+/g, '');

        // Generate a unique courseId
        const generateUniqueCourseId = async (): Promise<string> => {
            console.log('Generating unique course ID');
            let courseId = '';
            let isUnique = false;

            while (!isUnique) {
                const randomNumericCode = Math.floor(100000 + Math.random() * 900000).toString();
                const domain = schoolProfile.campus.domain ?? '';
                courseId = `${domain}${sanitizedCourseCode }${randomNumericCode}`;

                const existingCourse = await Course.findOne({ courseId });
                if (!existingCourse) {
                    isUnique = true;
                }
            }

            console.log('Generated unique course ID:', courseId);
            return courseId;
        };

        const courseId = await generateUniqueCourseId();

        let instructor = [];
        let students = [];

        if (schoolProfile.userType === 'Student') {
            console.log('User is a student, adding user ID to students array');
            students.push(userId);
        } else if (schoolProfile.userType === 'Staff' || schoolProfile.userType === 'Faculty') {
            console.log('User is staff/faculty, adding user ID to instructor array');
            instructor.push(userId);
        }

        console.log('Creating new course object');
        const newCourse = new Course({
            courseId,
            courseName: courseName,
            courseCode: courseCode,
            school: {
                school: schoolProfile.campus.school,
                name: schoolProfile.campus.name,
                domain: schoolProfile.campus.domain
            },
            createdBy: userId,
            instructor: instructor,
            students: students,
            isPrivate: isPrivate,
            isStudentLed: schoolProfile.userType === 'Student'
        });

        console.log('Saving new course to the database');
        await newCourse.save();

        console.log('Pushing new course ID to school profile');
        // Push the new course ID to the courses array in the school profile
        schoolProfile.courses.push(newCourse._id as mongoose.Types.ObjectId);
        
        console.log('Saving updated school profile');
        // Save the updated school profile
        await schoolProfile.save();

        console.log('Course created successfully');
        return res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error('Error creating course:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};