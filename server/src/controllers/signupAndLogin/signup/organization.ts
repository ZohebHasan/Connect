import { Request, Response } from "express";
import Organization from "../../../models/organization";
import User from "../../../models/userModel";

export const organization = async (req: Request, res: Response) => {
    const {  user_id } = req.body;
    if ( !user_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    const newOrg =  new Organization({
        user: user
    });
    await newOrg.save();
    res.status(200).json({ profile: newOrg });
}