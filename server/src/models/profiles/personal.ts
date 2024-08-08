import { Schema, model, Types, Document } from 'mongoose';
import User from '../userModel';

// creating the user interface
interface Personal extends Document {
    user: Types.ObjectId; // Use Types.ObjectId for referencing User
    followers: Types.ObjectId[]; // Use Types.ObjectId for referencing Personal profiles
    following: Types.ObjectId[]; // Use Types.ObjectId for referencing Personal profiles
    hobbies: string[];
    interest: string[];
    bio: string;
    profilePhoto: string; // media --> picture
}

// creating the user schema
const schema = new Schema<Personal>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Personal' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Personal' }],
    hobbies: { type: [String], required: false, default: [] },
    interest: { type: [String], required: false, default: [] },
    bio: { type: String, required: false, default: '' },
    profilePhoto: { type: String, required: false, default: '' },
});

// export the personal profile model
export default model<Personal>('Personal', schema);
