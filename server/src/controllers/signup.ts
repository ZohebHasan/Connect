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
        return res.status(400).json({ message: 'Please sign up with a different username, email, or phone number' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const username = await generateUsername(fullName);
    const user = new User({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        username,
        dataProtection,
        profileEncryption,
        contentMonitization,
        censor,
        restricted,
        age,
        dob: dateOfBirth,
    });

    await user.save();
    res.status(201).json({ user });
};

const isUnique = async (email: string, phoneNumber: string) =>  {
    const exists = await User.findOne({
        $or:[
            { email }, 
            { phoneNumber }
        ]
    });
    return !exists;
};
