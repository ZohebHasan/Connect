import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';

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
        dateOfBirth
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

    let userData: Partial<UserData> = {
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
    };

    // Conditionally add email and phoneNumber only if they are provided and not empty
    if (email && email.trim() !== "") {
        userData.email = email.toLowerCase();
    }
    if (phoneNumber && phoneNumber.trim() !== "") {
        userData.phoneNumber = phoneNumber;
    }

    const user = new User(userData);
    await user.save();
    res.status(201).json({ user });
};

const parseIdentifier = (email?: string, phoneNumber?: string) => {
    if (email && email.trim() !== "") {
        return { email: email.toLowerCase() };
    } else if (phoneNumber && phoneNumber.trim() !== "") {
        return { phoneNumber };
    }
    return {};
}
