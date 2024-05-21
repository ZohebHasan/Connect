import { Schema, model } from 'mongoose';

interface PreKey {
    keyId: number;
    publicKey: string; // base64 encoded string
}

interface SignedPreKey {
    keyId: number;
    publicKey: string; // base64 encoded string
    signature: string; // base64 encoded string
}

interface UnverifiedUser {
    fullName: string;
    email?: string;
    password: string;
    username: string;
    dateCreated: Date;
    phoneNumber?: string;
    dataProtection: boolean;
    profileEncryption: boolean;
    contentMonetization: boolean;
    censor: boolean;
    restricted: boolean;
    age: number;
    dob: Date;
    emailVerificationToken: string;
    emailVerificationExpires: Date;
    keys: {
        identityPublicKey: string; // base64 encoded string
        registrationId: number;
        preKeys: Array<PreKey>;
        signedPreKey: SignedPreKey;
    };
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

const unverifiedUserSchema = new Schema<UnverifiedUser>({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now, expires: '10m' }, // TTL index
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

export default model<UnverifiedUser>('UnverifiedUser', unverifiedUserSchema);
