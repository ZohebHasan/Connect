"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = void 0;
const comments_1 = __importDefault(require("../../models/posts/comments"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const posts_1 = __importDefault(require("../../models/posts/posts"));
const comments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownedBy, body } = req.body;
    const { id } = req.params;
    if (!ownedBy) {
        return res.status(400).json({ message: 'user_id is required' });
    }
    if (!id) {
        return res.status(400).json({ message: 'post_id is required' });
    }
    try {
        const user = yield userModel_1.default.findById(ownedBy);
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        const post = yield posts_1.default.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post does not exist' });
        }
        const newComment = new comments_1.default({
            ownedBy,
            comment: body
        });
        yield newComment.save();
        post.comments.push(newComment._id);
        yield post.save();
        yield post.populate('comments');
        res.status(201).json({ comment: newComment });
    }
    catch (err) {
        res.status(500).json({ message: 'An error occurred' });
    }
});
exports.comments = comments;
