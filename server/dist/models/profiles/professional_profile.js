"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel_1 = __importDefault(require("../userModel"));
const schema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    full_name: userModel_1.default.schema.obj.fullName,
    age: userModel_1.default.schema.obj.age,
    education: { type: String, required: true },
    jobTitle: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    skills: { type: [String], required: false },
    companies: { type: [String], required: false }
});
exports.default = (0, mongoose_1.model)('Professional', schema);
