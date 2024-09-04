"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ClubsAndOrgsSchema = new mongoose_1.Schema({
    photoUrl: { type: String, required: true },
    orgName: { type: String, required: true },
    orgCode: { type: String, required: true },
    school: {
        school: { type: mongoose_1.Schema.Types.ObjectId, ref: 'School', required: false },
        name: { type: String, required: false },
        domain: { type: String, required: false },
    },
    advisor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
    eBoard: [
        {
            position: { type: String, required: true },
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
        },
    ],
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Post' }],
});
exports.default = (0, mongoose_1.model)('ClubsAndOrgs', ClubsAndOrgsSchema);
