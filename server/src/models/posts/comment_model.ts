// this is the comment model

import mongoose from 'mongoose';
import { Model, Schema, Document } from 'mongoose';
import User from '../userModel';
import PostModel from './post_model';
import { Comment } from '../../controllers/posts/commentController';

interface Comment{
    dateCommented: Date;
    ownedBy: typeof User; // User
    parent: typeof PostModel | typeof CommentModel;
    body: string;
    comments: typeof CommentModel[];

}
// this is the comment schema
const commentSchema = new Schema<Comment>({
    dateCommented: { type: Date, required: true, default: Date.now() },
    ownedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    parent: {type: Schema.Types.ObjectId, required: false},
    body: { type: String, required: true },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment" }]
});

// this is the comment model
const CommentModel: Model<Comment> = mongoose.model('Comment', commentSchema);
// export the comment model
export default CommentModel;