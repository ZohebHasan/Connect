import { Schema, model, Types, Document } from 'mongoose';

// Define the School interface
interface School {
    school: Types.ObjectId;
    name: string;
    domain: string;
}

// Define the Course interface
interface Course extends Document {
    courseId: string;
    courseName: string;
    courseCode: string;
    school: School;
    createdBy: Types.ObjectId;
    instructor: Types.ObjectId[];
    TAs: Types.ObjectId[];
    students: Types.ObjectId[];
    posts: Types.ObjectId[];
    isPrivate: boolean;
    pendingRequests?: Types.ObjectId[];
    isStudentLed: boolean;
    createdAt: Date;
}

// Creating the Course schema
const courseSchema = new Schema<Course>({
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    courseCode: { type: String, required: true },
    school: {
        school: { type: Schema.Types.ObjectId, ref: 'School' },
        name: { type: String, required: true },
        domain: { type: String, required: true },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Educational', required: true },
    instructor: [{ type: Schema.Types.ObjectId, ref: 'Educational' }],
    TAs: [{ type: Schema.Types.ObjectId, ref: 'Educational' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'Educational' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // References to Post documents
    isPrivate: { type: Boolean, required: true },
    pendingRequests: [{ type: Schema.Types.ObjectId, ref: 'Educational' }],
    isStudentLed: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }, // Default creation date
});

// Export the course model
export default model<Course>('Course', courseSchema);