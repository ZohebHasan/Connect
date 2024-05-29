import { Schema, model} from 'mongoose';
import personal_profile from '../profiles/personal_profile';
import professional_profile from '../profiles/professional_profile';
import educational_profile from '../profiles/educational_profile';
import Comments from "./comments"
interface Post {
    dateCreated : Date;
    likeNum: number;
    dislikeNum: number;
    share: string;
    comments: typeof Comments; // need to make a schema for this
    location: typeof educational_profile | typeof personal_profile | typeof professional_profile;
    censorable: boolean;
    isEighteenPlus: boolean
    tags: String
}

const postSchema = new Schema<Post>({
    dateCreated: { type: Date, required: true, default: Date.now},
    likeNum: { type: Number, required: true },
    dislikeNum: { type: Number, required: true },
    share: { type: String, required: true },
    comments: [{type: Schema.Types.ObjectId, ref: "Comments", required: true}],
    location: {type: Schema.Types.ObjectId, enum: ["Educational", "Personal", "Professional"], required: true},
    censorable: {type: Boolean, required: true},
    isEighteenPlus: {type: Boolean, required: true},
    tags: [{type: String, required: true}]
});

const Post = model<Post>("Post", postSchema);

export default Post;