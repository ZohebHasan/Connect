import { Schema, model, Document, Types } from 'mongoose';

interface PreKey {
    keyId: number;
    publicKey: string;
}

interface SignedPreKey {
    keyId: number;
    publicKey: string;
    signature: string;
}

export interface UserType extends Document {
    fullName: string;
    email?: string;
    password: string;
    username: string;
    dateCreated: Date;
    lastLogin: Date;
    phoneNumber?: string;
    dataProtection: boolean;
    profileEncryption: boolean;
    contentMonetization: boolean;
    censor: boolean;
    restricted: boolean;
    age: number;
    dob: Date;
    keys: {
        identityPublicKey: string;
        registrationId: number;
        preKeys: Types.DocumentArray<PreKey>;
        signedPreKey: SignedPreKey;
    };
    verificationToken?: string;
    verificationTokenExpires?: Date;
}

const preKeySchema = new Schema<PreKey>({
    keyId: { type: Number, required: true },
    publicKey: { type: String, required: true }
});

const signedPreKeySchema = new Schema<SignedPreKey>({
    keyId: { type: Number, required: true },
    publicKey: { type: String, required: true },
    signature: { type: String, required: true }
});

const userSchema = new Schema<UserType>({
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

const User = model<UserType>('User', userSchema);

export default User;
