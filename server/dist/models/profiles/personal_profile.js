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
    hobbies: { type: [String], required: false },
    interest: { type: [String], required: false },
    bio: { type: String, required: false },
    profile_pic: { type: String, required: false },
    age: userModel_1.default.schema.obj.age
});
exports.default = (0, mongoose_1.model)('Personal', schema);
