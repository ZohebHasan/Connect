"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    dateCreated: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    phoneNumber: { type: String, required: false, unique: true },
});
exports.default = (0, mongoose_1.model)('User', schema);
