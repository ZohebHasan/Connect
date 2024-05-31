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
exports.createPost = void 0;
const posts_1 = __importDefault(require("../../models/posts/posts"));
const educational_profile_1 = __importDefault(require("../../models/profiles/educational_profile"));
const tags_1 = __importDefault(require("../../models/posts/tags"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags, postDetail, location, censorable, isEighteenPlus } = req.body;
    console.log(location);
    if (!location) {
        return res.status(400).json({ message: 'Profile location is required' });
    }
    try {
        const education = yield educational_profile_1.default.findById(location);
        if (!education) {
            return res.status(404).json({ message: 'Profile does not exist' });
        }
        const inputTags = tags.trim().split(/\s+/).map((tag) => tag.toLowerCase());
        const uniqueTags = [...new Set(inputTags)];
        const tagLists = yield Promise.all(uniqueTags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
            let tagList = yield tags_1.default.findOne({ name: tag });
            if (!tagList) {
                tagList = new tags_1.default({ name: tag });
                yield tagList.save();
            }
            return tagList._id;
        })));
        const newPost = new posts_1.default({
            postDetail,
            location,
            censorable,
            isEighteenPlus,
            tags: tagLists.map(tag => tag._id),
        });
        yield newPost.save();
        (yield newPost.populate('comments')).populate('tags');
        res.status(201).json({ post: newPost });
    }
    catch (err) {
        res.status(500).json({ message: 'An error occurred' });
    }
});
exports.createPost = createPost;
