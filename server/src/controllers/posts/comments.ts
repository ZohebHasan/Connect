import { Request, Response } from "express";
import Comment from "../../models/posts/comments";
import User from "../../models/userModel";
import Post from "../../models/posts/posts";
import { Types } from "mongoose";

export const comments = async (req: Request, res: Response) => {
    const { post_id, user_id, body } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: 'user_id is required' });
    }

    if (!post_id) {
        return res.status(400).json({ message: 'post_id is required' });
    }

    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const post = await Post.findById(post_id);
        if (!post) {
            return res.status(404).json({ message: 'Post does not exist' });
        }

        const newComment = new Comment({
            post: post_id,
            user: user_id,
            comment: body
        });

        await newComment.save();

        post.comments.push(newComment._id as any);

        await post.save();
        await post.populate('comments');

        res.status(201).json({ comment: newComment });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred'});
    }
};
