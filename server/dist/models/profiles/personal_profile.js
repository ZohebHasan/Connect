"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Personal' }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Personal' }],
    bio: { type: String, required: false, default: '' },
    profile_pic: { type: String, required: false, default: '' },
    pronouns: { type: String, required: false, default: '' }
});
exports.default = (0, mongoose_1.model)('Personal', schema);
