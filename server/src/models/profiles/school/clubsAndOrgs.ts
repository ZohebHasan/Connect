import { Schema, model, Types, Document } from 'mongoose';

// Define the School interface
interface School {
    school: Types.ObjectId;
    name: string;
    domain: string;
}

// Define the Eboard interface
interface Eboard {
    position: string;
    user: Types.ObjectId; // Reference to the user holding the position
}

// Define the ClubAndOrg interface
interface ClubAndOrg extends Document {
    photoUrl: string;
    orgName: string;
    orgCode: string;
    school?: School; // Optional School object
    advisor?: Types.ObjectId; // Reference to the advisor (if any)
    eBoard: Eboard[]; // References to executive board members
    posts: Types.ObjectId[]; // References to posts related to the club/org
}

// Creating the ClubsAndOrgs schema
const ClubsAndOrgsSchema = new Schema<ClubAndOrg>({
    photoUrl: { type: String, required: true },
    orgName: { type: String, required: true },
    orgCode: { type: String, required: true },
    school: {
        school: { type: Schema.Types.ObjectId, ref: 'School', required: false },
        name: { type: String, required: false },
        domain: { type: String, required: false },
    },
    advisor: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    eBoard: [
        {
            position: { type: String, required: true },
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        },
    ],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

// Export the ClubsAndOrgs model
export default model<ClubAndOrg>('ClubsAndOrgs', ClubsAndOrgsSchema);
