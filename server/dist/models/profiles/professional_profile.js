"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    education: { type: String, required: true },
    jobTitle: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    skills: { type: [String], required: false },
    companies: { type: [String], required: false }
});
exports.default = (0, mongoose_1.model)('Professional', schema);
