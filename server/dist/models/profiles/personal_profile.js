"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    full_name: { type: String, required: false },
    hobbies: { type: [String], required: false },
    interest: { type: [String], required: false },
    bio: { type: String, required: false },
    profile_pic: { type: String, required: false },
    age: { type: Number, required: false }
});
exports.default = (0, mongoose_1.model)('Personal', schema);
