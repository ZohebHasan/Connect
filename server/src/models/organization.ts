import { Schema, model, Types, Document } from 'mongoose';
import User from './userModel';


// Interface for Organization
export interface Organization extends Document {
    user: Types.ObjectId; // Reference to the user who owns the organization profile
    followers: Types.ObjectId[]; // References to followers of the organization
    following: Types.ObjectId[]; // References to organizations the user is following
    location: string;
    bio: string;
    profilePhoto: string; // Media --> picture
    domain: string;
}

// Creating the Organization schema
const schema = new Schema<Organization>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
    location: { type: String, required: false, default: '' },
    bio: { type: String, required: false, default: '' },
    profilePhoto: { type: String, required: false, default: '' },
    domain: { type: String, required: false, default: '' },
});

// Export the Organization profile model
export default model<Organization>('Organization', schema);
