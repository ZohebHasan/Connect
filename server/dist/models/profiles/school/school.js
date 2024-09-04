"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schoolSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    campus: {
        school: { type: mongoose_1.Schema.Types.ObjectId, default: null, ref: 'Organization' },
        name: { type: String, default: "" },
        domain: { type: String, default: "" },
    },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'School', default: [] }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'School', default: [] }],
    schoolEmail: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    courses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Course', default: [] }],
    clubs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'ClubsAndOrgs', default: [] }],
    userType: { type: String, enum: ['Student', 'Instructor', 'Alumni', 'Staff'], required: false },
    studentData: { type: mongoose_1.Schema.Types.Mixed, default: null },
    facultyData: { type: mongoose_1.Schema.Types.Mixed, default: null },
    alumniData: { type: mongoose_1.Schema.Types.Mixed, default: null },
    staffData: { type: mongoose_1.Schema.Types.Mixed, default: null },
    bio: { type: String, default: '' },
    verifiedSchoolEmail: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date }
});
exports.default = (0, mongoose_1.model)('School', schoolSchema);
