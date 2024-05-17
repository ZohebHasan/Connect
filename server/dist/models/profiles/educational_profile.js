"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    major: { type: String, required: true },
    grad: { type: Date, required: true },
    schoolEmail: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Educational', schema);