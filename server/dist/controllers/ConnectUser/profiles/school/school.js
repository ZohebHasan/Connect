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
exports.getUserSchool = exports.setUserType = exports.setSchoolEmail = exports.deleteSchoolEmail = exports.deleteSchool = exports.setSchool = void 0;
const school_1 = __importDefault(require("../../../../models/profiles/school/school"));
const course_1 = __importDefault(require("../../../../models/profiles/school/course"));
const userModel_1 = __importDefault(require("../../../../models/userModel"));
const organization_1 = __importDefault(require("../../../../models/organization"));
const setSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    const { campusName } = req.body;
    if (!campusName) {
        return res.status(400).json({ message: 'Bad Request: campusName is required' });
    }
    try {
        const schoolProfile = yield school_1.default.findOne({ user: userId });
        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }
        schoolProfile.campus.name = campusName;
        yield schoolProfile.save();
        return res.status(200).json({ message: 'Campus name updated successfully', schoolProfile });
    }
    catch (error) {
        console.error('Error updating campus name:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.setSchool = setSchool;
const deleteSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    try {
        const schoolProfile = yield school_1.default.findOne({ user: userId });
        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }
        schoolProfile.campus.name = "";
        yield schoolProfile.save();
        return res.status(200).json({ message: 'School email deleted successfully', schoolProfile });
    }
    catch (error) {
        console.error('Error deleting school email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteSchool = deleteSchool;
const deleteSchoolEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    try {
        const schoolProfile = yield school_1.default.findOne({ user: userId });
        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }
        schoolProfile.schoolEmail = "";
        schoolProfile.campus.domain = "";
        schoolProfile.verifiedSchoolEmail = false;
        yield schoolProfile.save();
        return res.status(200).json({ message: 'School email deleted successfully', schoolProfile });
    }
    catch (error) {
        console.error('Error deleting school email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteSchoolEmail = deleteSchoolEmail;
let emailAttempts = {
    count: 0,
    emails: [],
};
const setSchoolEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    const { schoolEmail } = req.body;
    if (!schoolEmail) {
        return res.status(400).json({ message: 'Bad Request: schoolEmail is required' });
    }
    try {
        const schoolProfile = yield school_1.default.findOne({ user: userId });
        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }
        const userExists = yield school_1.default.findOne({ schoolEmail });
        if (userExists) {
            emailAttempts.count += 1;
            emailAttempts.emails.push(schoolEmail);
            if (emailAttempts.count >= 3) {
                const allSameEmail = emailAttempts.emails.every(email => email === emailAttempts.emails[0]);
                emailAttempts = { count: 0, emails: [] };
                if (allSameEmail) {
                    return res.status(429).json({ message: 'Too many attempts: School email is already in use. Please try again later.' });
                }
                else {
                    return res.status(430).json({ message: 'Too many attempts with different emails. Potential violation of the safety policy.' });
                }
            }
            return res.status(409).json({ message: 'Conflict: School email is already in use' });
        }
        emailAttempts = { count: 0, emails: [] };
        const domain = (_e = schoolEmail.split('@')[1]) === null || _e === void 0 ? void 0 : _e.split('.')[0];
        if (!domain) {
            return res.status(400).json({ message: 'Bad Request: Invalid school email format' });
        }
        schoolProfile.schoolEmail = schoolEmail;
        schoolProfile.campus.domain = domain;
        yield schoolProfile.save();
        return res.status(200).json({ message: 'School email and domain updated successfully', schoolProfile });
    }
    catch (error) {
        console.error('Error updating school email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.setSchoolEmail = setSchoolEmail;
const setUserType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    const { userType } = req.body;
    if (!userType) {
        return res.status(400).json({ message: 'Bad Request: userType is required' });
    }
    try {
        const schoolProfile = yield school_1.default.findOne({ user: userId });
        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }
        schoolProfile.userType = userType;
        yield schoolProfile.save();
        return res.status(200).json({ message: 'Campus email updated successfully', schoolProfile });
    }
    catch (error) {
        console.error('Error updating campus email:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.setUserType = setUserType;
const getUserSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const userId = (_g = req.user) === null || _g === void 0 ? void 0 : _g.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    try {
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const schoolProfile = yield school_1.default.findOne({ user: userId });
        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }
        let campus = {};
        if (schoolProfile.campus.school) {
            const organization = yield organization_1.default.findById(schoolProfile.campus.school);
            if (organization) {
                campus = {
                    school: (_h = organization._id) === null || _h === void 0 ? void 0 : _h.toString(),
                    domain: organization.domain,
                    profilePhoto: organization.profilePhoto,
                };
                const orgUser = yield userModel_1.default.findById(organization.user);
                if (orgUser) {
                    campus.name = orgUser.fullName;
                    campus.isVerified = orgUser.isVerified;
                }
            }
        }
        else {
            campus = {
                domain: schoolProfile.campus.domain,
                name: schoolProfile.campus.name,
            };
        }
        let studentData;
        let facultyData;
        let alumniData;
        let staffData;
        switch (schoolProfile.userType) {
            case 'Student':
                studentData = {
                    degree: (_j = schoolProfile.studentData) === null || _j === void 0 ? void 0 : _j.degree,
                    major: (_k = schoolProfile.studentData) === null || _k === void 0 ? void 0 : _k.major,
                    year: (_l = schoolProfile.studentData) === null || _l === void 0 ? void 0 : _l.year,
                };
                break;
            case 'Faculty':
                facultyData = {
                    position: (_m = schoolProfile.facultyData) === null || _m === void 0 ? void 0 : _m.position,
                    discipline: (_o = schoolProfile.facultyData) === null || _o === void 0 ? void 0 : _o.discipline,
                    office: (_p = schoolProfile.facultyData) === null || _p === void 0 ? void 0 : _p.office,
                };
                break;
            case 'Alumni':
                alumniData = {
                    major: (_q = schoolProfile.alumniData) === null || _q === void 0 ? void 0 : _q.major,
                    graduationYear: (_r = schoolProfile.alumniData) === null || _r === void 0 ? void 0 : _r.graduationYear,
                };
                break;
            case 'Staff':
                staffData = {
                    department: (_s = schoolProfile.staffData) === null || _s === void 0 ? void 0 : _s.department,
                    position: (_t = schoolProfile.staffData) === null || _t === void 0 ? void 0 : _t.position,
                    office: (_u = schoolProfile.staffData) === null || _u === void 0 ? void 0 : _u.office,
                };
                break;
        }
        let courses = [];
        if (schoolProfile.userType !== 'Alumni') {
            for (const courseId of schoolProfile.courses) {
                const courseDoc = yield course_1.default.findById(courseId).lean();
                if (courseDoc) {
                    let instructors = [];
                    for (const instructorID of courseDoc.instructor) {
                        const instructorProfileDoc = yield school_1.default.findById(instructorID);
                        if (instructorProfileDoc) {
                            const instructorUserDoc = yield userModel_1.default.findById(instructorProfileDoc.user);
                            if (instructorUserDoc) {
                                if (instructorUserDoc._id) {
                                    instructors.push({
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
                    const TAs = [];
                    for (const taId of courseDoc.TAs) {
                        const taProfileDoc = yield school_1.default.findById(taId);
                        if (taProfileDoc) {
                            const taUserDoc = yield userModel_1.default.findById(taProfileDoc.user);
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
        const profileData = {
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
    }
    catch (error) {
        console.error('Error fetching professional profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserSchool = getUserSchool;
