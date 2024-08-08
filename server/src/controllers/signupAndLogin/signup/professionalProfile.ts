import { Request, Response } from "express";
import professional_profile from "../../../models/profiles/professional/professional";
import User from "../../../models/userModel";

export const professionalProfile = async (req: Request, res: Response) => {
    const {user_id } = req.body;
    if ( !user_id) {
        return res.status(400).json({ message: 'user_is is required' });
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const newProfile = new professional_profile({
        user: user
    });
    await newProfile.save();
    res.status(200).json({ profile: newProfile });
}