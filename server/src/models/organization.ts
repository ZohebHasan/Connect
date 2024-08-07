import { Schema, model, Types, Document } from 'mongoose';
import User from './userModel';

// creating the user interface
interface Organization extends Document {
    user: Types.ObjectId; // Use Types.ObjectId for referencing User
    followers: Types.ObjectId[]; // Use Types.ObjectId for referencing Organization profiles
    following: Types.ObjectId[]; // Use Types.ObjectId for referencing Organization profiles
    location: String;
    bio: string;
    profilePhoto: string; // media --> picture
}

// creating the user schema
const schema = new Schema<Organization>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
    location: { type: String, required: false, default: '' },
    bio: { type: String, required: false, default: '' },
    profilePhoto: { type: String, required: false, default: '' },
});

// export the Organization profile model
export default model<Organization>('Organization', schema);
