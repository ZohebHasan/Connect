"use strict";
// creating a professional profile schema using mongoose
Object.defineProperty(exports, "__esModule", { value: true });
// professional:
// education: string
// jobTitle: string
// yearsOfExperience: int
// skils[]: strings
// company(s)[]: string
const mongoose_1 = require("mongoose");
// creating the user schema
const schema = new mongoose_1.Schema({
    // reference to the user
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    education: { type: String, required: true },
    jobTitle: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    skills: { type: [String], required: false },
    companies: { type: [String], required: false }
});
// export the professional profile model
exports.default = (0, mongoose_1.model)('Professional', schema);
