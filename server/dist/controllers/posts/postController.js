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
exports.updatePost = exports.Post = void 0;
const gridfs_stream_1 = __importDefault(require("gridfs-stream"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const post_model_1 = __importDefault(require("../../models/posts/post_model"));
const clip_model_1 = __importDefault(require("../../models/posts/media/clip_model"));
const snip_model_1 = __importDefault(require("../../models/posts/media/snip_model"));
const pixel_model_1 = __importDefault(require("../../models/posts/media/pixel_model"));
const chirp_model_1 = __importDefault(require("../../models/posts/media/chirp_model"));
const conn = mongoose_1.default.createConnection('mongodb+srv://kamrulhassan:fNXADjxipNKubPlP@connect.kacb3bl.mongodb.net/?retryWrites=true&w=majority&appName=Connect');
let gfs;
conn.once('open', () => {
    gfs = (0, gridfs_stream_1.default)(conn.db, mongoose_1.default.mongo);
    gfs.collection('uploads');
});
const Post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownedBy, location, media_body } = req.body;
    const { media_type } = req.params;
    const file = req.file;
    const content_type = media_type;
    if (!file) {
        return res.status(400).json("Media file is required");
    }
    console.log("File: ", file);
    const user = yield userModel_1.default.findById(ownedBy);
    if (!user) {
        return res.status(404).json("User does not exist");
    }
    console.log("User: ", user);
    try {
        let media;
        const body = media_body.body;
        switch (media_type) {
            case "pixel":
                media = new pixel_model_1.default({
                    file: file.id,
                    body
                });
                yield media.save();
                break;
            case "snip":
                media = new snip_model_1.default({
                    file: file.id,
                    body
                });
                yield media.save();
                break;
            case "clip":
                media = new clip_model_1.default({
                    file: file.id,
                    body
                });
                yield media.save();
                break;
            case "chirp":
                if (!body) {
                    return res.status(400).json("Text is required");
                }
                media = new chirp_model_1.default({
                    body
                });
                yield media.save();
                break;
            default:
                return res.status(400).json("Invalid media type");
        }
        yield media.save();
        const post = new post_model_1.default({
            ownedBy: user._id,
            location,
            content_type,
            content: media._id,
        });
        yield post.save();
        res.status(201).json(post);
    }
    catch (error) {
        console.error("Failed to process file or create post:", error);
        res.status(500).json({ message: "Error processing file or creating post", error });
    }
});
exports.Post = Post;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id, likes, dislikes, views, shared } = req.body;
    console.log("Post ID: ", post_id);
    console.log("Likes: ", likes);
    console.log("Dislikes: ", dislikes);
    console.log("Views: ", views);
    console.log("Shared: ", shared);
    if (!post_id) {
        return res.status(400).json({ message: "Post ID is required." });
    }
    try {
        const post = yield post_model_1.default.findById(post_id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (likes != null)
            post.likes = (post.likes || 0) + 1;
        if (dislikes != null)
            post.likes = (post.dislikes || 0) - 1;
        if (views != null)
            post.views = (post.views || 0) + 1;
        if (shared != null)
            post.shared = (post.shared || 0) + 1;
        yield post.save();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json("Error updating post");
    }
});
exports.updatePost = updatePost;
