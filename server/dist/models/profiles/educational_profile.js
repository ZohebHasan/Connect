"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel_1 = __importDefault(require("../userModel"));
const schema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    school: { type: String, required: true },
    degree: { type: String, required: true },
    major: { type: String, required: true },
    grad: { type: Date, required: true },
    schoolEmail: { type: String, required: true },
    full_name: userModel_1.default.schema.obj.fullName,
    age: userModel_1.default.schema.obj.age
});
exports.default = (0, mongoose_1.model)('Educational', schema);
