// this is the post model
import mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import User from '../userModel';
import comments from './comment_model';
import ClipModel from './media/clip_model';
import PixelsModel from './media/pixels_model';
import SnipModel from './media/snip_model';
import ChirpModel from './media/chirp_model';
enum location{
    'educationalProfile' = 1,
    'professionalProfile' = 2,
    'personalProfile' = 3,
}



interface Post {
    dateCreated: Date;
    ownedBy: typeof User; // User
    content: typeof ClipModel | typeof PixelsModel | typeof SnipModel | typeof ChirpModel; // Media
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
    dateCreated: { type: Date, required: false },
    ownedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: false },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    location: { type: Number, required: false },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    views: { type: Number, required: false },
    shared: { type: Number, required: false },
    tags: [{ type: String, required: false }],
    censorable: { type: Boolean, required: false },
    isEighteen: { type: Boolean, required: false }
});

// this is the post model
const PostModel: Model<Post> = mongoose.model('Post', postSchema);
// export the post model
export default PostModel;

