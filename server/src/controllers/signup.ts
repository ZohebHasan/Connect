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
    dataProtection: boolean; // Consider specifying more precise types instead of 'any'
    profileEncryption: any;
    contentMonitization: any;
    censor: any;
    restricted: any;
    age: any;
    dob: any;
    email?: string; // Optional property
    phoneNumber?: string; // Optional property
}

// Signup controller
export const signup = async (req: Request, res: Response) => {
    const { 
        fullName,
        email,
        phoneNumber,
        password,
        dataProtection,
        profileEncryption,
        contentMonitization,
        censor,
        restricted,
        age,
        dateOfBirth
    } = req.body;

    const userExists = await isUnique(email, phoneNumber);
    if (!userExists) {
        return res.status(400).json({ message: 'Please sign up with a different email or phone number.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const username = await generateUsername(fullName);

    let userData: UserData = {
        fullName,
        password: hashedPassword,
        username,
        dataProtection,
        profileEncryption,
        contentMonitization,
        censor,
        restricted,
        age,
        dob: dateOfBirth,
    };

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

const isUnique = async (email: string, phoneNumber: string) =>  {
    const userIdentifier = parseIdentifier(email, phoneNumber);
    const user = await User.findOne(userIdentifier);

    if (!user) {
        return true;
    }
    return false;
};

const parseIdentifier = (email: string, phoneNumber: string) => {
    if (email.includes('@')) {
        return { email: email.toLowerCase() };
    }
    
    return { phoneNumber: phoneNumber};
}