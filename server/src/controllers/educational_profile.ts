import { Request, Response } from "express";
import educational_profile from "../models/profiles/educational_profile";
import User from "../models/userModel";
export const educationalProfile = async (req: Request, res: Response) => {
    const { school, degree, major, grad, schoolEmail, user_id } = req.body;
    if (!school || !degree || !major || !grad || !schoolEmail) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    if (!parseEmail(schoolEmail)) {
        return res.status(400).json({ message: 'Invalid email' });
    }
    const newProfile = new educational_profile({
        user: user,
        school,
        degree,
        major,
        grad,
        schoolEmail
    });
    await newProfile.save();
    res.status(200).json({ profile: newProfile });
}
const parseEmail = (identifier: string) => {
    if (identifier.includes('@')) {
       return true 
    }
    return false
}