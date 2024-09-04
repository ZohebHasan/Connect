"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    courseCode: { type: String, required: true },
    school: {
        school: { type: mongoose_1.Schema.Types.ObjectId, ref: 'School' },
        name: { type: String, required: true },
        domain: { type: String, required: true },
    },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Educational', required: true },
    instructor: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Educational' }],
    TAs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Educational' }],
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Educational' }],
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Post' }],
    isPrivate: { type: Boolean, required: true },
    pendingRequests: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Educational' }],
    isStudentLed: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Course', courseSchema);
