// creating a person profile schema using mongoose
// full_name: string
// hobbies [] : string
// interest [] : string
// bio: string
// profile_pic: media --> picture 
// age: int

import { Schema, model } from 'mongoose';
import User from '../user_model';
// creating the user interface
interface Personal {
    user: typeof User;
    full_name: string;
    hobbies: string[];
    interest: string[];
    bio: string;
    // profile_pic: string; // media --> picture // need to be introduced later 
    age: number;
}
// creating the user schema
const schema = new Schema<Personal>({
    // reference to the user
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    full_name: { type: String, required: true },
    hobbies: { type: [String], required: false },
    interest: { type: [String], required: false },
    bio: { type: String, required: false },
    // profile_pic: { type: String, required: false },
    age: { type: Number, required: false }
});
// export the personal profile model
export default model('Personal', schema);

