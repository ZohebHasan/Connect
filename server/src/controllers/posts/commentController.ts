import {Request, Response} from 'express';

import User from '../../models/userModel';

import PostModel from '../../models/posts/post_model';
import CommentModel from '../../models/posts/comment_model';
import { Types } from 'mongoose';

export const Comment = async (req: Request, res: Response) => {
    const { ownedBy, body, parent } = req.body;
    try{
        const user = await User.findById(ownedBy);
        if(!user){
            res.status(400).json("User does not exist");
        }

        const parentEntity = await PostModel.findById(parent) || await CommentModel.findById(parent);
        if (!parentEntity) {
            return res.status(400).json("No post or comment found");
        }

        const comment = new CommentModel({
            ownedBy: ownedBy._id,
            body,
            parent: parentEntity._id,
        })
        await comment.save();
        parentEntity.comments.push(comment._id as any);
        await parentEntity.save();
        await parentEntity.populate("comments")
        res.status(200).json(comment)
    }catch(err){
        res.status(400).json(err)
    }
    
}