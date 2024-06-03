"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const commentSchema = new mongoose_2.Schema({
    dateCommented: { type: Date, required: true, default: Date.now() },
    ownedBy: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User' },
    parent: { type: mongoose_2.Schema.Types.ObjectId, required: false },
    body: { type: String, required: true },
    comments: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "Comment" }]
});
const CommentModel = mongoose_1.default.model('Comment', commentSchema);
exports.default = CommentModel;
