import { Response } from 'express';
import User from '../models/userModel';
import { UserType } from '../models/userModel';
import { AuthenticatedRequest } from '../middleware/authMiddleware'; // Adjust the path as necessary

export const handleFeaturesChange = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id; // Safely access user ID
    const { dataProtection, profileEncryption, contentMonetization, censor, restricted } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
        // Find user by ID and update features
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.dataProtection = dataProtection;
        user.profileEncryption = profileEncryption;
        user.contentMonetization = contentMonetization;
        user.censor = censor;
        user.restricted = restricted;

        await user.save();

        res.status(200).json({ message: 'Features updated successfully', user });
    } catch (error) {
        console.error('Error updating features:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
