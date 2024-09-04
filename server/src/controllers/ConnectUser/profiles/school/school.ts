import { Request, Response } from 'express';
import { Types } from 'mongoose';
import SchoolProfile from '../../../../models/profiles/school/school';
import Course from '../../../../models/profiles/school/course';
import User from '../../../../models/userModel';
import Organization from '../../../../models/organization';
import { AuthenticatedRequest } from '../../../../middleware/authMiddleware';

interface UserProfile {
    userId: string;
    name?: string;
    isVerified?: boolean;
    userName: string;
    profilePhoto?: string;
}

interface Course {
    course: string;
    courseName: string;
    courseCode: string;
    instructor: UserProfile[];
    TAs: UserProfile[];
    courseId: string;
    isStudentLed: boolean;
}

interface Campus {
    school?: string; // This will hold the ObjectId as a string
    name?: string;
    domain?: string;
    isVerified?: boolean;
    profilePhoto?: string;
}

interface Student {
    degree?: string;
    major?: string;
    year?: string;
}

interface Faculty {
    position?: string;
    discipline?: string;
    office?: string;
}

interface Alumni {
    major?: string;
    graduationYear?: string;
}

interface Staff {
    department?: string;
    position?: string;
    office?: string;
}

interface SchoolProfileData {
    followers: string[];
    following: string[];
    bio: string;
    profilePhoto: string;
    campus: Campus;
    courses?: Course[];
    userType: 'Student' | 'Faculty' | 'Alumni' | 'Staff';
    studentData?: Student;
    facultyData?: Faculty;
    alumniData?: Alumni;
    staffData?: Staff;
    verifiedSchoolEmail: boolean;
    schoolEmail: string;
}

interface SchoolCampusData {
    campus: Campus;
    userType: 'Student' | 'Faculty' | 'Alumni' | 'Staff';
    verifiedSchoolEmail: boolean;
    schoolEmail: string;
}

export const setSchool = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    const { campusName } = req.body;

    if (!campusName) {
        return res.status(400).json({ message: 'Bad Request: campusName is required' });
    }

    try {
        const schoolProfile = await SchoolProfile.findOne({ user: userId });

        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }

        // Update the campus name
        schoolProfile.campus.name = campusName;

        // Save the updated school profile
        await schoolProfile.save();

        return res.status(200).json({ message: 'Campus name updated successfully', schoolProfile });
    } catch (error) {
        console.error('Error updating campus name:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteSchool = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    try {
        const schoolProfile = await SchoolProfile.findOne({ user: userId });

        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }

        // Remove the school email and any related information
  
        schoolProfile.campus.name = "";

        // Save the updated school profile
        await schoolProfile.save();

        return res.status(200).json({ message: 'School email deleted successfully', schoolProfile });
    } catch (error) {
        console.error('Error deleting school email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const deleteSchoolEmail = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
        const schoolProfile = await SchoolProfile.findOne({ user: userId });

        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }

        // Remove the school email and any related information
        schoolProfile.schoolEmail = "";
        schoolProfile.campus.domain = "";
        schoolProfile.verifiedSchoolEmail = false;

        // Save the updated school profile
        await schoolProfile.save();

        return res.status(200).json({ message: 'School email deleted successfully', schoolProfile });
    } catch (error) {
        console.error('Error deleting school email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

let emailAttempts = {
    count: 0,
    emails: [] as string[],
};

export const setSchoolEmail = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    const { schoolEmail } = req.body;

    if (!schoolEmail) {
        return res.status(400).json({ message: 'Bad Request: schoolEmail is required' });
    }

    try {
        const schoolProfile = await SchoolProfile.findOne({ user: userId });

        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }

        // Check if the school email already exists in another profile
        const userExists = await SchoolProfile.findOne({ schoolEmail });

        if (userExists) {
            emailAttempts.count += 1;
            emailAttempts.emails.push(schoolEmail);

            // If the user has tried three times
            if (emailAttempts.count >= 3) {
                // Check if the user tried the same email three times
                const allSameEmail = emailAttempts.emails.every(email => email === emailAttempts.emails[0]);

                // Clear the attempts after the max is reached
                emailAttempts = { count: 0, emails: [] };

                if (allSameEmail) {
                    // Send a specific code for too many attempts with the same email
                    return res.status(429).json({ message: 'Too many attempts: School email is already in use. Please try again later.' });
                } else {
                    // Send a different code for potential policy violation
                    return res.status(430).json({ message: 'Too many attempts with different emails. Potential violation of the safety policy.' });
                }
            }

            return res.status(409).json({ message: 'Conflict: School email is already in use' });
        }

        // Reset the attempts on successful email set
        emailAttempts = { count: 0, emails: [] };

        // Extract the domain from the email (e.g., "stonybrook" from "zoheb.hasan@stonybrook.edu")
        const domain = schoolEmail.split('@')[1]?.split('.')[0];

        if (!domain) {
            return res.status(400).json({ message: 'Bad Request: Invalid school email format' });
        }

        // Update the school email and domain in the profile
        schoolProfile.schoolEmail = schoolEmail;
        schoolProfile.campus.domain = domain;

        // Save the updated school profile
        await schoolProfile.save();

        return res.status(200).json({ message: 'School email and domain updated successfully', schoolProfile });
    } catch (error) {
        console.error('Error updating school email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const setUserType = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    const { userType } = req.body;

    if (!userType) {
        return res.status(400).json({ message: 'Bad Request: userType is required' });
    }

    try {
        const schoolProfile = await SchoolProfile.findOne({ user: userId });

        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }

        // Update the campus name
        schoolProfile.userType = userType;

        // Save the updated school profile
        await schoolProfile.save();

        return res.status(200).json({ message: 'Campus email updated successfully', schoolProfile });
    } catch (error) {
        console.error('Error updating campus email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




export const getUserSchool = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const schoolProfile = await SchoolProfile.findOne({ user: userId });

        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }

        let campus: Campus = {};

        // Step 1: Check if the school attribute is empty
        if (schoolProfile.campus.school) {
            const organization = await Organization.findById(schoolProfile.campus.school);
            if (organization) {
                campus = {
                    school: organization._id?.toString(),
                    domain: organization.domain,
                    profilePhoto: organization.profilePhoto,
                };

                const orgUser = await User.findById(organization.user);
                if (orgUser) {
                    campus.name = orgUser.fullName;
                    campus.isVerified = orgUser.isVerified;
                }
            }
        } else {
            campus = {
                domain: schoolProfile.campus.domain,
                name: schoolProfile.campus.name,
            };
        }

        let studentData: Student | undefined;
        let facultyData: Faculty | undefined;
        let alumniData: Alumni | undefined;
        let staffData: Staff | undefined;

        switch (schoolProfile.userType) {
            case 'Student':
                studentData = {
                    degree: schoolProfile.studentData?.degree,
                    major: schoolProfile.studentData?.major,
                    year: schoolProfile.studentData?.year,
                };
                break;
            case 'Faculty':
                facultyData = {
                    position: schoolProfile.facultyData?.position,
                    discipline: schoolProfile.facultyData?.discipline,
                    office: schoolProfile.facultyData?.office,
                };
                break;
            case 'Alumni':
                alumniData = {
                    major: schoolProfile.alumniData?.major,
                    graduationYear: schoolProfile.alumniData?.graduationYear,
                };
                break;
            case 'Staff':
                staffData = {
                    department: schoolProfile.staffData?.department,
                    position: schoolProfile.staffData?.position,
                    office: schoolProfile.staffData?.office,
                };
                break;
        }

        let courses: Course[] = [];
        if (schoolProfile.userType !== 'Alumni') {
            for (const courseId of schoolProfile.courses) {
                const courseDoc = await Course.findById(courseId).lean();

                if (courseDoc) {
                    let instructors: UserProfile[] = [];
                    for (const instructorID of courseDoc.instructor) {
                        const instructorProfileDoc = await SchoolProfile.findById(instructorID);
                        if (instructorProfileDoc) {
                            const instructorUserDoc = await User.findById(instructorProfileDoc.user);
                            if (instructorUserDoc) {
                                if (instructorUserDoc._id) {
                                   instructors.push( {
                                        userId: instructorUserDoc._id.toString(),
                                        name: instructorUserDoc.fullName,
                                        isVerified: instructorUserDoc.isVerified,
                                        profilePhoto: instructorProfileDoc.profilePhoto,
                                        userName: instructorUserDoc.username
                                    });
                                }
                            }
                        }
                    }

                    const TAs: UserProfile[] = [];
                    for (const taId of courseDoc.TAs) {
                        const taProfileDoc = await SchoolProfile.findById(taId);
                        if (taProfileDoc) {
                            const taUserDoc = await User.findById(taProfileDoc.user);
                            if (taUserDoc) {
                                if (taUserDoc._id) {
                                    TAs.push({
                                        userId: taUserDoc._id.toString(),
                                        name: taUserDoc.fullName,
                                        isVerified: taUserDoc.isVerified,
                                        profilePhoto: taProfileDoc.profilePhoto,
                                        userName: taUserDoc.username
                                    });
                                }
                            }
                        }
                    }

                    courses.push({
                        course: courseDoc._id.toString(),
                        courseName: courseDoc.courseName,
                        courseCode: courseDoc.courseCode,
                        instructor: instructors,
                        TAs: TAs,
                        courseId: courseDoc.courseId,
                        isStudentLed: courseDoc.isStudentLed


                    });
                }
            }
        }

        const profileData: SchoolProfileData = {
            followers: schoolProfile.followers.map(follower => follower.toString()),
            following: schoolProfile.following.map(following => following.toString()),
            bio: schoolProfile.bio,
            profilePhoto: schoolProfile.profilePhoto,
            campus: campus,
            userType: schoolProfile.userType,
            studentData,
            facultyData,
            alumniData,
            staffData,
            courses,
            verifiedSchoolEmail: schoolProfile.verifiedSchoolEmail,
            schoolEmail: schoolProfile.schoolEmail

        };

        return res.status(200).json(profileData);
    } catch (error) {
        console.error('Error fetching professional profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
