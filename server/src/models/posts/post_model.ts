// this is the post model
import mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import User from '../userModel';
import comments from './comment_model';

enum location{
    'educationalProfile' = 1,
    'professionalProfile' = 2,
    'personalProfile' = 3,
}

interface Post {
    dateCreated: Date;
    ownedBy: typeof User; // User
    content: string; // enum of post type
    comments: typeof comments[]; // Comments
    location: location.educationalProfile | location.personalProfile | location.professionalProfile; // enum of profile location
    likes: number;
    dislikes: number;
    views: number;
    shared : number;
    tags: string[];
    censorable: boolean;
    isEighteen: boolean;
}

// this is the post schema
const postSchema = new Schema<Post>({
    dateCreated: { type: Date, required: true },
    ownedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    location: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    views: { type: Number, required: true },
    shared: { type: Number, required: true },
    tags: [{ type: String, required: true }],
    censorable: { type: Boolean, required: true },
    isEighteen: { type: Boolean, required: true }
});

// this is the post model
const PostModel: Model<Post> = mongoose.model('Post', postSchema);
// export the post model
export default PostModel;

