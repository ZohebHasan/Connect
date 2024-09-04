"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const school_1 = __importDefault(require("../../../../models/profiles/school/school"));
const userModel_1 = __importDefault(require("../../../../models/userModel"));
const course_1 = __importDefault(require("../../../../models/profiles/school/course"));
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Received request to create course with body:', req.body);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        console.error('User ID is missing');
        return res.status(400).json({ message: 'user_id required' });
    }
    const { courseName, courseCode, isPrivate, } = req.body;
    try {
        console.log('Finding user with ID:', userId);
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            console.error('User does not exist');
            return res.status(400).json({ message: 'User does not exist' });
        }
        console.log('Finding school profile for user with ID:', userId);
        const schoolProfile = yield school_1.default.findOne({ user: userId });
        if (!schoolProfile) {
            console.error('School profile not found');
            return res.status(404).json({ message: 'School profile not found' });
        }
        const sanitizedCourseCode = courseCode.replace(/\s+/g, '');
        const generateUniqueCourseId = () => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            console.log('Generating unique course ID');
            let courseId = '';
            let isUnique = false;
            while (!isUnique) {
                const randomNumericCode = Math.floor(100000 + Math.random() * 900000).toString();
                const domain = (_b = schoolProfile.campus.domain) !== null && _b !== void 0 ? _b : '';
                courseId = `${domain}${sanitizedCourseCode}${randomNumericCode}`;
                const existingCourse = yield course_1.default.findOne({ courseId });
                if (!existingCourse) {
                    isUnique = true;
                }
            }
            console.log('Generated unique course ID:', courseId);
            return courseId;
        });
        const courseId = yield generateUniqueCourseId();
        let instructor = [];
        let students = [];
        if (schoolProfile.userType === 'Student') {
            console.log('User is a student, adding user ID to students array');
            students.push(userId);
        }
        else if (schoolProfile.userType === 'Staff' || schoolProfile.userType === 'Faculty') {
            console.log('User is staff/faculty, adding user ID to instructor array');
            instructor.push(userId);
        }
        console.log('Creating new course object');
        const newCourse = new course_1.default({
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
        yield newCourse.save();
        console.log('Pushing new course ID to school profile');
        schoolProfile.courses.push(newCourse._id);
        console.log('Saving updated school profile');
        yield schoolProfile.save();
        console.log('Course created successfully');
        return res.status(201).json({ message: 'Course created successfully', course: newCourse });
    }
    catch (error) {
        console.error('Error creating course:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createCourse = createCourse;
