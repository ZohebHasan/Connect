// creating a professional profile schema using mongoose

// professional:
// education: string
// jobTitle: string
// yearsOfExperience: int
// skils[]: strings
// company(s)[]: string
import { Schema, model } from 'mongoose';
import User from '../userModel';
// creating the user interface
interface Professional {
    user: typeof User;
    education: string;
    jobTitle: string;
    yearsOfExperience: number;
    skills: string[];
    companies: string[];
}
// creating the user schema
const schema = new Schema<Professional>({
    // reference to the user
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    education: { type: String, required: false, default: ''},
    jobTitle: { type: String, required: false ,  default: ''},
    yearsOfExperience: { type: Number, required: false ,  default: null},
    skills: { type: [String], required: false,  default: [] },
    companies: { type: [String], required: false, default: []}
});
// export the professional profile model
export default model('Professional', schema);
