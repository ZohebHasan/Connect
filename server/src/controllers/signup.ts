import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const JWT_SECRET = 'cc706162797cd87082129948fea3a4b5373a8c614a80af35436cd0bc7bf131afb77fbde0e2bed8f2466197345e3dd2205a812b3f18cb7c5685160416dfef65f8';
const JWT_REFRESH_SECRET = '3577a4135cad0bb08c5e5529282265604c9ccec70ea2392090aeab7371d02068e81084d4839c420fee1a4eb3d02c59b58d95f81c9b4d9bd093b389572217a556'; 

const generateUsername = async (fullName: string) => {
    const baseUsername = fullName.replace(/\s+/g, '').toLowerCase();
    let suffix = 0;
    let uniqueUsername = baseUsername;

    const exists = await User.findOne({ username: uniqueUsername });
    if (!exists) {
        return uniqueUsername; 
    }

    while (await User.findOne({ username: uniqueUsername })) {
        suffix++;
        uniqueUsername = `${baseUsername}${suffix}`;
    }

    return uniqueUsername;
};

interface UserData {
    fullName: string;
    password: string;
    username: string;
    dataProtection: boolean; 
    profileEncryption: boolean;
    contentMonetization: boolean;
    censor: boolean;
    restricted: boolean;
    age: number;
    dob: Date;
    email?: string; 
    phoneNumber?: string;
    keys: {
        identityPublicKey: string;
        registrationId: number;
        preKeys: Array<{
            keyId: number;
            publicKey: string;
        }>;
        signedPreKey: {
            keyId: number;
            publicKey: string;
            signature: string;
        };
    };
}

export const signup = async (req: Request, res: Response) => {
  
    const { 
        fullName,
        email,
        phoneNumber,
        password,
        dataProtection,
        profileEncryption,
        contentMonetization,
        censor,
        restricted,
        age,
        dateOfBirth,
        keys
    } = req.body;
   
    // Ensure that either email or phone number is provided
    if (!email && !phoneNumber) {
        return res.status(400).json({ message: 'Please provide either an email or a phone number.' });
    }

    // Use parseIdentifier to determine uniqueness based on provided email or phoneNumber
    const userIdentifier = parseIdentifier(email, phoneNumber);
    const userExists = await User.findOne(userIdentifier);

    if (userExists) {
        return res.status(400).json({ message: 'User with the provided email or phone number already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const username = await generateUsername(fullName);

    // Validate and convert keys
    const userData: UserData = {
        fullName,
        password: hashedPassword,
        username,
        dataProtection,
        profileEncryption,
        contentMonetization,
        censor,
        restricted,
        age,
        dob: dateOfBirth,
        keys: {
            identityPublicKey: convertToBase64(keys.identityPublicKey),
            registrationId: keys.registrationId,
            preKeys: keys.preKeys.map((pk: { keyId: number; publicKey: ArrayBuffer | string; }) => ({
                keyId: pk.keyId,
                publicKey: convertToBase64(pk.publicKey)
            })),
            signedPreKey: {
                keyId: keys.signedPreKey.keyId,
                publicKey: convertToBase64(keys.signedPreKey.publicKey),
                signature: convertToBase64(keys.signedPreKey.signature)
            }
        }
    };
    if (email && email.trim() !== "") {
        userData.email = email.toLowerCase();
    }
    if (phoneNumber && phoneNumber.trim() !== "") {
        userData.phoneNumber = phoneNumber;
    }

    const user = new User(userData);
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Generate Refresh Token
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Send JWT token and Refresh Token as cookies
    res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 1 * 60 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(201).json({ message: 'User registered successfully', user });
};

const parseIdentifier = (email?: string, phoneNumber?: string) => {
    if (email && email.trim() !== "") {
        return { email: email.toLowerCase() };
    } else if (phoneNumber && phoneNumber.trim() !== "") {
        return { phoneNumber };
    }
    return {};
}

const convertToBase64 = (data: ArrayBuffer | string): string => {
    if (typeof data === 'string') {
        return Buffer.from(data).toString('base64');
    } else if (data instanceof ArrayBuffer) {
        return Buffer.from(new Uint8Array(data)).toString('base64');
    } else {
        throw new TypeError(`Invalid data type for conversion to base64: ${typeof data}`);
    }
}
