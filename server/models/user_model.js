"use strict";
// creating a user schema using mongoose 
Object.defineProperty(exports, "__esModule", { value: true });
// user requirements : first and last name, email, password, username, dateCreated, lastLogin, phoneNumber
const mongoose_1 = require("mongoose");
// creating the user schema
const schema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    dateCreated: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    phoneNumber: { type: String, required: true }
});
// exporting the user schema
exports.default = schema;
