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
    full_name: typeof User.schema.obj.fullName;
    school: string;
    degree: string;
    major: string;
    grad: Date;
    schoolEmail: string;
    age: typeof User.schema.obj.age;
}
const schema = new Schema<Educational>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    school: { type: String, required: true },
    degree: { type: String, required: true },
    major: { type: String, required: true },
    grad: { type: Date, required: true },
    schoolEmail: { type: String, required: true },
    full_name: User.schema.obj.fullName,
    age: User.schema.obj.age
});
// export the educational profile model
export default model('Educational', schema);
