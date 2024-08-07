"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    education: { type: String, required: false, default: '' },
    jobTitle: { type: String, required: false, default: '' },
    yearsOfExperience: { type: Number, required: false, default: null },
    skills: { type: [String], required: false, default: [] },
    companies: { type: [String], required: false, default: [] },
    profilePhoto: { type: String, required: false, default: '' },
});
exports.default = (0, mongoose_1.model)('Professional', schema);
