"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const preKeySchema = new mongoose_1.Schema({
    keyId: { type: Number, required: true },
    publicKey: { type: String, required: true }
});
const signedPreKeySchema = new mongoose_1.Schema({
    keyId: { type: Number, required: true },
    publicKey: { type: String, required: true },
    signature: { type: String, required: true }
});
const userSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    dateCreated: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    phoneNumber: { type: String, unique: true, sparse: true },
    dataProtection: { type: Boolean, default: true },
    profileEncryption: { type: Boolean, default: true },
    contentMonetization: { type: Boolean, default: true },
    censor: { type: Boolean, default: false },
    restricted: { type: Boolean, default: false },
    age: { type: Number, required: false },
    dob: { type: Date, required: false },
    keys: {
        identityPublicKey: { type: String, required: true },
        registrationId: { type: Number, required: true },
        preKeys: [preKeySchema],
        signedPreKey: signedPreKeySchema
    },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date }
});
exports.default = (0, mongoose_1.model)('User', userSchema);
