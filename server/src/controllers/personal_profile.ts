
import { Request, Response } from "express";
import personal_profile from "../models/profiles/personal_profile";
import User from "../models/userModel";
export const personalProfile = async (req: Request, res: Response) => {
    const {  user_id } = req.body;
    if (  !user_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    const newProfile =  new personal_profile({
        user: user
    });
    await newProfile.save();
    res.status(200).json({ profile: newProfile });
}