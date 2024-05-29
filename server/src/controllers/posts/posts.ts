import { Request, Response } from "express";
import Posts from "../../models/posts/posts";
import User from "../../models/userModel";
import Tags from "../../models/posts/tags";
export const posts = async (req: Request, res: Response) => {
    const {user_id, tags, media} = req.body;

    const inputTags = req.body.tags.trim().split(/\s+/).map(tag => tag.toLowerCase());
    const uniqueTags = [...new Set(inputTags)];
    const tagLists = await Promise.all(uniqueTags.map(async tag => {
        let tagList = await Tags.findOne({ name: tag });
        if (!tagList) {
            tagList = new Tags({ name: tag });
            await tagList.save();
        }
        return tagList;
    }))

    if (!user_id) {
        return res.status(400).json({ message: 'user_id required'});
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const newPost = new Posts({
        user: user,
        media: [media],
        tags: tagLists,

    });
    (await (await newPost.save()).populate('comments')).populate('tags');
    res.status(200).json({ posts: newPost });
}