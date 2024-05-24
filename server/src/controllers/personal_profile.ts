/*


Profiles:

Personal:
full_name: string
hobbies [] : string
interest [] : string
bio: string
profile_pic: media --> picture 
age: int


Educational:
school: string
degree: string
major: string
grad: date
schoolEmail: domain(@stonybrook.edu): string



professional:
education: string
jobTitle: string
yearsOfExperience: int
skils[]: strings
company(s)[]: string



*? */

import { Request, Response } from "express";
import personal_profile from "../models/profiles/personal_profile";
import User from "../models/userModel";
export const personalProfile = async (req: Request, res: Response) => {
    const { full_name, hobbies, interests, bio, profile_pic, age, user_id } = req.body;
    if (!full_name || !hobbies || !interests || !bio || !profile_pic || !age) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const newProfile = new personal_profile({
        user: user._id,
        full_name: user.fullName,
        hobbies,
        interests,
        bio,
        profile_pic,
        age: user.age
    });
    await newProfile.save();
    res.status(200).json({ profile: newProfile });
}