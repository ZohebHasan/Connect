"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    school: { type: String, required: false, default: '' },
    degree: { type: String, required: false, default: '' },
    major: { type: String, required: false, default: '' },
    grad: { type: Date, required: false, default: null },
    schoolEmail: { type: String, required: false, default: '' },
    profilePhoto: { type: String, required: false, default: '' },
});
exports.default = (0, mongoose_1.model)('Educational', schema);
