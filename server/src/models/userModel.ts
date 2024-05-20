import { Schema, model } from 'mongoose';

// creating the user interface 
interface User {
    fullName: string;
    email?: string;
    password: string;
    username: string;
    dateCreated: Date;
    lastLogin: Date;
    phoneNumber?: string;    
    dataProtection: boolean;
    profileEncryption: boolean;
    contentMonitization: boolean;
    censor: boolean;
    restricted: boolean;
    age: number;
    dob: Date;
}

// creating the user schema
const schema = new Schema<User>({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true }, 
    dateCreated: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    phoneNumber: { type: String, unique: true, sparse: true },
    dataProtection: { type: Boolean, default: true },
    profileEncryption: { type: Boolean, default: true },
    contentMonitization: { type: Boolean, default: true },
    censor: { type: Boolean, default: false },
    restricted: { type: Boolean, default: false },
    age: { type: Number, required: false },
    dob: { type: Date, required: false }
});

export default model<User>('User', schema);