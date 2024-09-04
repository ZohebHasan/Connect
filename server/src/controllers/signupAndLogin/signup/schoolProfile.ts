import { Request, Response } from "express";
import educational_profile from "../../../models/profiles/school/school";
import User from "../../../models/userModel";
export const educationalProfile = async (req: Request, res: Response) => {
    const {user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ message: 'user_id required'});
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const newProfile = new educational_profile({
        user: user
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