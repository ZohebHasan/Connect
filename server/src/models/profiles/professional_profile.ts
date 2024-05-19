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
    full_name: typeof User.schema.obj.fullName;
    age: typeof User.schema.obj.age;
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
    // user's full name
    full_name: User.schema.obj.fullName,
    // user's age
    age: User.schema.obj.age,
    education: { type: String, required: true },
    jobTitle: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    skills: { type: [String], required: false },
    companies: { type: [String], required: false }
});
// export the professional profile model
export default model('Professional', schema);
