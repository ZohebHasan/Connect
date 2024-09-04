"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization' }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization' }],
    location: { type: String, required: false, default: '' },
    bio: { type: String, required: false, default: '' },
    profilePhoto: { type: String, required: false, default: '' },
    domain: { type: String, required: false, default: '' },
});
exports.default = (0, mongoose_1.model)('Organization', schema);
