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
exports.Comment = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const post_model_1 = __importDefault(require("../../models/posts/post_model"));
const comment_model_1 = __importDefault(require("../../models/posts/comment_model"));
const Comment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownedBy, body, parent } = req.body;
    try {
        const user = yield userModel_1.default.findById(ownedBy);
        if (!user) {
            res.status(400).json("User does not exist");
        }
        const parentEntity = (yield post_model_1.default.findById(parent)) || (yield comment_model_1.default.findById(parent));
        if (!parentEntity) {
            return res.status(400).json("No post or comment found");
        }
        const comment = new comment_model_1.default({
            ownedBy: ownedBy._id,
            body,
            parent: parentEntity._id,
        });
        yield comment.save();
        parentEntity.comments.push(comment._id);
        yield parentEntity.save();
        yield parentEntity.populate("comments");
        res.status(200).json(comment);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.Comment = Comment;
