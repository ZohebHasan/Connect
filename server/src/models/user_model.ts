// creating a user schema using mongoose 

// user requirements : first and last name, email, password, username, dateCreated, lastLogin, phoneNumber

import { Schema, model } from 'mongoose';
// creating the user interface 
interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    dateCreated: Date;
    lastLogin: Date;
    phoneNumber: string;    
}

// creating the user schema

const schema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    dateCreated: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    phoneNumber: { type: String, required: false },
});

// export the user model
export default model('User', schema);

