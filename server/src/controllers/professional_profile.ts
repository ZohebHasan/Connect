import { Request, Response } from "express";
import professional_profile from "../models/profiles/professional_profile";
import User from "../models/userModel";

export const professionalProfile = async (req: Request, res: Response) => {
    const { education, jobTitle, yearsOfExperience, skills, companies, user_id } = req.body;
    if (!education || !jobTitle || !yearsOfExperience || !skills || !companies) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const newProfile = new professional_profile({
        user: user,
        education,
        jobTitle,
        yearsOfExperience,
        skills,
        companies
    });
    await newProfile.save();
    res.status(200).json({ profile: newProfile });
}