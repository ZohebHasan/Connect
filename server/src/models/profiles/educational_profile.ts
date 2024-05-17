// creating an educational profile schema using mongoose
import { Schema, model } from 'mongoose';
import User from '../userModel';
// Educational:
// school: string
// degree: string
// major: string
// grad: date
// schoolEmail: domain(@stonybrook.edu): string



// professional:
// education: string
// jobTitle: string
// yearsOfExperience: int
// skils[]: strings
// company(s)[]: string
interface Educational {
    user: typeof User;
    school: string;
    degree: string;
    major: string;
    grad: Date;
    schoolEmail: string;
}
const schema = new Schema<Educational>({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    major: { type: String, required: true },
    grad: { type: Date, required: true },
    schoolEmail: { type: String, required: true }
});
// export the educational profile model
export default model('Educational', schema);
