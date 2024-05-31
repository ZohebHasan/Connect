import { Schema, model} from 'mongoose';
import User from '../userModel';
import Post from '../../models/posts/posts'

interface Comments {
    ownedBy: typeof User;
    body: string;
    commentDate: Date;
}

const commentSchema = new Schema<Comments>({
    ownedBy: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    body: {type: String, required: true},
    commentDate: {type: Date, required: true, default: Date.now},
})

const Comments = model<Comments>("Comments", commentSchema);

export default Comments;