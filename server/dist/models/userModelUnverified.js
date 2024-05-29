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
const unverifiedUserSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now, expires: '10m' },
    phoneNumber: { type: String, unique: true, sparse: true },
    dataProtection: { type: Boolean, default: true },
    profileEncryption: { type: Boolean, default: true },
    contentMonetization: { type: Boolean, default: true },
    censor: { type: Boolean, default: false },
    restricted: { type: Boolean, default: false },
    age: { type: Number, required: true },
    dob: { type: Date, required: true },
    emailVerificationToken: { type: String, required: true },
    emailVerificationExpires: { type: Date, required: true },
    keys: {
        identityPublicKey: { type: String, required: true },
        registrationId: { type: Number, required: true },
        preKeys: [preKeySchema],
        signedPreKey: signedPreKeySchema
    }
});
exports.default = (0, mongoose_1.model)('UnverifiedUser', unverifiedUserSchema);
