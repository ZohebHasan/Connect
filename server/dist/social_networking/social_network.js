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
exports.recommendationAlgo = exports.findSimilarPosts = void 0;
const post_model_1 = __importDefault(require("../models/posts/post_model"));
const findSimilarPosts = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield findPost(postId);
        if (post) {
            const tags = post.tags;
            const similarPosts = yield post_model_1.default.find({
                tags: { $in: tags },
                ownedBy: { $ne: userId }
            });
            return similarPosts;
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.findSimilarPosts = findSimilarPosts;
const findPostsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find({ ownedBy: userId });
        return posts;
    }
    catch (err) {
        console.log(err);
    }
});
const findSimilarPostsByMetadata = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield findPost(postId);
        if (post) {
            const { likes, views, comments, shared, tags } = getPostMetaData(post);
            const similarPosts = yield post_model_1.default.aggregate([
                {
                    $match: {
                        _id: { $ne: post._id },
                        tags: { $in: tags }
                    }
                },
                {
                    $addFields: {
                        similarityScore: {
                            $add: [
                                { $abs: { $subtract: ['$likes', likes] } },
                                { $abs: { $subtract: ['$views', views] } },
                                { $abs: { $subtract: ['$comments', comments] } },
                                { $abs: { $subtract: ['$shared', shared] } }
                            ]
                        }
                    }
                },
                {
                    $sort: { similarityScore: 1 }
                },
                {
                    $limit: 10
                }
            ]);
            return similarPosts;
        }
    }
    catch (err) {
        console.log(err);
    }
});
const findPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(postId);
        if (post) {
            return post;
        }
    }
    catch (err) {
        console.log(err);
    }
});
const getPostMetaData = (post) => {
    const { likes, views, comments, shared, tags, dateCreated } = post;
    return { likes, views, comments, shared, tags, dateCreated };
};
const recommendationAlgo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postID, userID, encrypted } = req.body;
    const post = yield findPost(postID);
    if (!post) {
        res.status(400).json("No post detected");
    }
    let recommendedPost;
    switch (encrypted) {
        case true:
            recommendedPost = yield findSimilarPostsByMetadata(postID);
            res.status(200).json(recommendedPost);
            break;
        case false:
            recommendedPost = yield (0, exports.findSimilarPosts)(postID, userID);
            res.status(200).json(recommendedPost);
            break;
        default:
            res.status(400).json("Invalid value for 'encrypted'");
            break;
    }
});
exports.recommendationAlgo = recommendationAlgo;
