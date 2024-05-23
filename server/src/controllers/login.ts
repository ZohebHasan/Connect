import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const JWT_SECRET = 'cc706162797cd87082129948fea3a4b5373a8c614a80af35436cd0bc7bf131afb77fbde0e2bed8f2466197345e3dd2205a812b3f18cb7c5685160416dfef65f8';
const JWT_REFRESH_SECRET = '3577a4135cad0bb08c5e5529282265604c9ccec70ea2392090aeab7371d02068e81084d4839c420fee1a4eb3d02c59b58d95f81c9b4d9bd093b389572217a556'; 

export const login = async (req: Request, res: Response) => {
    const { identifier, password } = req.body;


    if (!identifier || !password) {
        console.log('Missing identifier or password');
        return res.status(400).json({ message: 'Identifier and password are required' });
    }

    const userIdentifier = parseIdentifier(identifier);

    const user = await User.findOne(userIdentifier);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Generate Refresh Token
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '6m' });

    // Send JWT token and Refresh Token as cookies
    res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 1 * 60 * 60 * 1000 }); //1 hour
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 6 * 30 * 24 * 60 * 60 * 1000 }); //6 months

    res.status(200).json({ message: 'Login successful', user });
};

const parseIdentifier = (identifier: string) => {
    if (identifier.includes('@')) {
        return { email: identifier.toLowerCase() };
    }
    if (isNaN(parseInt(identifier))) {
        return { username: identifier.toLowerCase() };
    }
    return { phoneNumber: identifier };
};
