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
const userModel_1 = __importDefault(require("../../models/userModel"));
const post_model_1 = __importDefault(require("../../models/posts/post_model"));
const clip_model_1 = __importDefault(require("../../models/posts/media/clip_model"));
const snip_model_1 = __importDefault(require("../../models/posts/media/snip_model"));
const pixel_model_1 = __importDefault(require("../../models/posts/media/pixel_model"));
const chirp_model_1 = __importDefault(require("../../models/posts/media/chirp_model"));
const Post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownedBy, location, media_body } = req.body;
    const { media_type } = req.params;
    const user = yield userModel_1.default.findById(ownedBy);
    let media;
    let content_type;
    if (!user) {
        res.status(404).json("User does not exist");
    }
    switch (media_type) {
        case "pixel":
            try {
                const file = media_body.file;
                const caption = media_body.caption;
                if (!file) {
                    res.status(400).json("Media file is required");
                }
                media = new pixel_model_1.default({
                    file,
                    caption,
                    dateEdit: null
                });
                content_type = 1;
                yield media.save();
            }
            catch (err) {
                res.status(400).json(err);
            }
            break;
        case "chirp":
            try {
                const body = media_body.body;
                if (!body) {
                    res.status(400).json("Text is required");
                }
                media = new chirp_model_1.default({
                    body,
                    dateEdit: null
                });
                content_type = 2;
                yield media.save();
            }
            catch (err) {
                res.status(400).json(err);
            }
            break;
        case "snip":
            try {
                const file = media_body.file;
                const caption = media_body.caption;
                if (!file) {
                    res.status(400).json("Media file is required");
                }
                media = new snip_model_1.default({
                    file,
                    caption,
                    dateEdit: null
                });
                content_type = 3;
                yield media.save();
            }
            catch (err) {
                res.status(400).json(err);
            }
            break;
        case "clip":
            try {
                const file = media_body.file;
                const caption = media_body.caption;
                if (!file) {
                    res.status(400).json("Media file is required");
                }
                media = new clip_model_1.default({
                    file,
                    caption,
                    dateEdit: null
                });
                content_type = 4;
                yield media.save();
            }
            catch (err) {
                res.status(400).json(err);
            }
            break;
        default:
            res.send(400).json("Media file is not valid");
            break;
    }
    try {
        const post = new post_model_1.default({
            ownedBy: user === null || user === void 0 ? void 0 : user._id,
            location,
            content_type,
            content: media === null || media === void 0 ? void 0 : media._id,
        });
        yield post.save();
        res.status(200).json(post);
    }
    catch (err) {
        res.status(400).json(err);
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
            post.dislikes = (post.dislikes || 0) + 1;
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
