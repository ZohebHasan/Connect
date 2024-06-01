// this is the comment model

import mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import User from '../userModel';

interface Comment {
    dateCommented: Date;
    ownedBy: typeof User; // User
    body: string;

}
// this is the comment schema
const commentSchema = new Schema<Comment>({
    dateCommented: { type: Date, required: false },
    ownedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    body: { type: String, required: false}
});

// this is the comment model
const CommentModel: Model<Comment> = mongoose.model('Comment', commentSchema);
// export the comment model
export default CommentModel;