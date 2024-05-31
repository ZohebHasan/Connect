"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    ownedBy: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    body: { type: String, required: true },
    commentDate: { type: Date, required: true, default: Date.now },
});
const Comments = (0, mongoose_1.model)("Comments", commentSchema);
exports.default = Comments;
