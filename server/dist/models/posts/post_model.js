"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
var location;
(function (location) {
    location[location["educationalProfile"] = 1] = "educationalProfile";
    location[location["professionalProfile"] = 2] = "professionalProfile";
    location[location["personalProfile"] = 3] = "personalProfile";
})(location || (location = {}));
const postSchema = new mongoose_2.Schema({
    dateCreated: { type: Date, required: false, default: Date.now },
    ownedBy: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User' },
    content: { type: mongoose_2.Schema.Types.ObjectId, required: false },
    comments: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Comment' }],
    location: { type: Number, required: false },
    content_type: { type: String, required: false },
    likes: { type: Number, required: false, default: 0 },
    views: { type: Number, required: false, default: 0 },
    shared: { type: Number, required: false, default: 0 },
    tags: [{ type: String, required: false }],
    censorable: { type: Boolean, required: false, default: false },
    isEighteen: { type: Boolean, required: false, default: true }
});
const PostModel = mongoose_1.default.model('Post', postSchema);
exports.default = PostModel;
