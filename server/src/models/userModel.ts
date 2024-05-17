// creating a user schema using mongoose 

// user requirements : first and last name, email, password, username, dateCreated, lastLogin, phoneNumber

import { Schema, model } from 'mongoose';
// creating the user interface 
interface User {
    fullName: string;
    email: string;
    password: string;
    username: string;
    dateCreated: Date;
    lastLogin: Date;
    phoneNumber: string;    
}

// creating the user schema

const schema = new Schema<User>({
    fullName: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    dateCreated: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    phoneNumber: { type: String, required: false, unique: true },
});

// export the user model
export default model('User', schema);
