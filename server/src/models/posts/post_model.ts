// this is the post model
import mongoose from 'mongoose';
import { Model, Schema } from 'mongoose';
import User from '../userModel';


import ClipModel from './media/clip_model';
import PixelsModel from './media/pixel_model';
import SnipModel from './media/snip_model';
import ChirpModel from './media/chirp_model';

import CommentModel from './comment_model';

enum location{
    'educationalProfile' = 1,
    'professionalProfile' = 2,
    'personalProfile' = 3,
}



interface Post {
    dateCreated: Date;
    ownedBy: typeof User; // User
    content: typeof ClipModel | typeof PixelsModel | typeof SnipModel | typeof ChirpModel; // Media


    comments: typeof CommentModel[]; // Comments
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

    dateCreated: { type: Date, required: false, default: Date.now },
    ownedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: false },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    location: { type: Number, required: false },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0},
    views: { type: Number, required: false, default: 0},
    shared: { type: Number, required: false, default: 0},
    tags: [{ type: String, required: false }],
    censorable: { type: Boolean, required: false, default: false},
    isEighteen: { type: Boolean, required: false, default: true}

});

// this is the post model
const PostModel: Model<Post> = mongoose.model('Post', postSchema);
// export the post model
export default PostModel;
