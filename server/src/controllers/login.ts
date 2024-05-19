import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";


export const login = async (req: Request, res: Response) => {

    const { identifier, password } = req.body;

    if (!identifier || !password) {
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
    res.status(200).json({ user: user });
}

const parseIdentifier = (identifier: string) => {
    if (identifier.includes('@')) {
        return { email: identifier.toLowerCase() };
    }
    if (isNaN(parseInt(identifier))) {
        return { username: identifier.toLowerCase() };
    }
    return { phoneNumber: identifier };
}