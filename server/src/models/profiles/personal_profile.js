"use strict";
// creating a person profile schema using mongoose
// full_name: string
// hobbies [] : string
// interest [] : string
// bio: string
// profile_pic: media --> picture 
// age: int
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// creating the user schema
const schema = new mongoose_1.Schema({
    // reference to the user
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    full_name: { type: String, required: true },
    hobbies: { type: [String], required: false },
    interest: { type: [String], required: false },
    bio: { type: String, required: false },
    // profile_pic: { type: String, required: false },
    age: { type: Number, required: false }
});
// export the personal profile model
exports.default = (0, mongoose_1.model)('Personal', schema);
