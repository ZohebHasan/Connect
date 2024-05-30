"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    dateCreated: { type: Date, required: true, default: Date.now },
    likeNum: { type: Number, required: true },
    dislikeNum: { type: Number, required: true },
    share: { type: String, required: true },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comments", required: true }],
    location: { type: mongoose_1.Schema.Types.ObjectId, enum: ["Educational", "Personal", "Professional"], required: true },
    postdetail: { type: String },
    media: [{ type: mongoose_1.Schema.Types.ObjectId, enum: ["Chirp", "Clip", "Pixel", "Snip"], required: false }],
    censorable: { type: Boolean, required: true },
    isEighteenPlus: { type: Boolean, required: true },
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Tag" }]
});
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
