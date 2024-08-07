import { Request, Response } from 'express';
import PersonalProfile from '../../../models/profiles/personal';
import User from '../../../models/userModel';
import { AuthenticatedRequest } from '../../../middleware/authMiddleware';

export const getUserPersonal = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const personalProfile = await PersonalProfile.findOne({ user: userId }).lean();

        if (!personalProfile) {
            return res.status(404).json({ message: 'Personal profile not found' });
        }

        const profileData = {
            followers: personalProfile.followers,
            following: personalProfile.following,
            bio: personalProfile.bio,
            profilePhoto: personalProfile.profilePhoto
        };

        return res.status(200).json(profileData);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
