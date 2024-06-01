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
exports.Post = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const post_model_1 = __importDefault(require("../../models/posts/post_model"));
const pixel_model_1 = __importDefault(require("../../models/posts/media/pixel_model"));
const Post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownedBy, media_body } = req.body;
    const { media_type } = req.params;
    const user = yield userModel_1.default.findById(ownedBy);
    let media;
    if (!user) {
        res.status(404).json("User does not exist");
    }
    if (media_type === "pixel") {
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
            yield media.save();
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    else {
        return res.status(400).json("Invalid media type");
    }
    try {
        console.log(media);
        const post = new post_model_1.default({
            ownedBy: user,
            content: media,
        });
        yield post.save();
        res.status(200).json(post);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.Post = Post;