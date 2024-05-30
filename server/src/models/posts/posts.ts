import { Schema, model} from 'mongoose';

import personal_profile from '../profiles/personal_profile';
import professional_profile from '../profiles/professional_profile';
import educational_profile from '../profiles/educational_profile';

import Comments from "./comments"
import Tags from './tags';

import Chirp from './chirp';
import Clip from './clip';
import Pixel from './pixel';
import Snip from './snip';

interface Post {
    dateCreated : Date;
    likeNum: number;
    dislikeNum: number;
    share: string;
    comments: typeof Comments; // need to make a schema for this
    location: typeof educational_profile | typeof personal_profile | typeof professional_profile;
    postdetail?: string
    media: typeof Chirp | typeof Clip | typeof Pixel | typeof Snip
    censorable: boolean;
    isEighteenPlus: boolean
    tags: typeof Tags
}

const postSchema = new Schema<Post>({
    dateCreated: { type: Date, required: true, default: Date.now},
    likeNum: { type: Number, required: true },
    dislikeNum: { type: Number, required: true },
    share: { type: String, required: true },
    comments: [{type: Schema.Types.ObjectId, ref: "Comments", required: true}],
    location: {type: Schema.Types.ObjectId, enum: ["Educational", "Personal", "Professional"], required: true},
    postdetail: { type: String },
    media: [{type: Schema.Types.ObjectId, enum: ["Chirp", "Clip", "Pixel", "Snip"], required: false}],
    censorable: {type: Boolean, required: true},
    isEighteenPlus: {type: Boolean, required: true},
    tags: [{type: Schema.Types.ObjectId, required: true, ref: "Tag"}]
});

const Post = model<Post>("Post", postSchema);

export default Post;