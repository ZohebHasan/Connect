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
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    school: { type: String, required: false, default: ''},
    degree: { type: String, required: false, default: ''},
    major: { type: String, required: false, default: ''},
    grad: { type: Date, required: false,    default: null},
    schoolEmail: { type: String, required: false, default: ''}
});
// export the educational profile model
export default model('Educational', schema);
