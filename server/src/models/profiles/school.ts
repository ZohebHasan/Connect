import { Schema, model, Types, Document } from 'mongoose';
import User from '../userModel';

// Interface for Educational schema
interface Educational extends Document {
    user: Types.ObjectId; // Use Types.ObjectId for referencing User
    school: string;
    degree: string;
    major: string;
    grad: Date;
    schoolEmail: string;
    profilePhoto: string;
}

// Creating the Educational schema
const schema = new Schema<Educational>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    school: { type: String, required: false, default: '' },
    degree: { type: String, required: false, default: '' },
    major: { type: String, required: false, default: '' },
    grad: { type: Date, required: false, default: null },
    schoolEmail: { type: String, required: false, default: '' },
    profilePhoto: { type: String, required: false, default: '' },
});

// Export the educational profile model
export default model<Educational>('Educational', schema);
