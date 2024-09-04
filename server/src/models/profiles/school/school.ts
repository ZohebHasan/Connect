import { Schema, model, Types, Document } from 'mongoose';

// Define the various interfaces for different user types
interface Student {
    degree?: string;
    major?: string;
    year?: string;
}

interface Faculty {
    position?: string;
    discipline?: string;
    office?: string;
}

interface Alumni {
    major?: string;
    graduationYear?: string;
}

interface Staff {
    department?: string;
    position?: string;
    office?: string;
}

interface Campus {
    school: Types.ObjectId;
    name: string;
    domain: string;
}

// Main School interface
interface School extends Document {
    user: Types.ObjectId;
    campus: Campus;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    schoolEmail: string;
    profilePhoto: string;
    courses: Types.ObjectId[]; // Array of course references
    clubs: Types.ObjectId[]; // Array of club references
    userType: 'Student' | 'Faculty' | 'Alumni' | 'Staff';
    studentData?: Student;
    facultyData?: Faculty;
    alumniData?: Alumni;
    staffData?: Staff
    bio: string;
    verifiedSchoolEmail: boolean;
    verificationToken?: string;
    verificationTokenExpires?: Date;
}

// Creating the School schema
const schoolSchema = new Schema<School>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    campus: {
        school: { type: Schema.Types.ObjectId, default: null, ref: 'Organization' },
        name: { type: String, default: "" },
        domain: { type: String, default: "" },
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'School', default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: 'School', default: [] }],
    schoolEmail: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course', default: [] }], // Reference to courses
    clubs: [{ type: Schema.Types.ObjectId, ref: 'ClubsAndOrgs', default: [] }], // Reference to clubs and organizations
    userType: { type: String, enum: ['Student', 'Instructor', 'Alumni', 'Staff'], required: false },
    studentData: { type: Schema.Types.Mixed, default: null },
    facultyData: { type: Schema.Types.Mixed, default: null },
    alumniData: { type: Schema.Types.Mixed, default: null },
    staffData: { type: Schema.Types.Mixed, default: null },
    bio: { type: String, default: '' },
    verifiedSchoolEmail: {type: Boolean, default: false},
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date }
});

// Export the School model
export default model<School>('School', schoolSchema);
