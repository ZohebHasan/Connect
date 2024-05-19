// creating a person profile schema using mongoose
// full_name: string
// hobbies [] : string
// interest [] : string
// bio: string
// profile_pic: media --> picture 
// age: int

import { Schema, model } from 'mongoose';
import User from '../userModel';

// creating the user interface
interface Personal {
    user: typeof User;
    full_name: typeof User.schema.obj.fullName;
    hobbies: string[];
    interest: string[];
    bio: string;
    profile_pic: string; // media --> picture // need to be introduced later 
    age: typeof User.schema.obj.age;
}
// creating the user schema
const schema = new Schema<Personal>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    full_name: User.schema.obj.fullName,
    hobbies: { type: [String], required: false },
    interest: { type: [String], required: false },
    bio: { type: String, required: false },
    profile_pic: { type: String, required: false },
    age: User.schema.obj.age
});
// export the personal profile model
export default model('Personal', schema);

