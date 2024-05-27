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
    user_id: typeof User;
    hobbies: string[];
    interest: string[];
    bio: string;
    profile_pic: string; // media --> picture // need to be introduced later 
   
}
// creating the user schema
const schema = new Schema<Personal>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    hobbies: { type: [String], required: false, default: []},
    interest: { type: [String], required: false, default: []},
    bio: { type: String, required: false , default: ''},
    profile_pic: { type: String, required: false, default: ''},

});
// export the personal profile model
export default model('Personal', schema);

