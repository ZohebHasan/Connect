import { Response } from 'express';
import User from '../../../models/userModel';
import { UserType } from '../../../models/userModel';
import personalProfileModel from '../../../models/profiles/personal_profile';
import professionalProfileModel from '../../../models/profiles/professional_profile';
import educationalProfileModel from '../../../models/profiles/educational_profile';
import { AuthenticatedRequest } from '../../../middleware/authMiddleware'; 


export const handleProfileSelections = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id; // Safely access user ID
    const { personalProfile, professionalProfile, educationalProfile } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
        // Find user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create personal profile if requested
        if (personalProfile) {
            const newPersonalProfile = new personalProfileModel({
                user: user._id,
                ...personalProfile
            });
            await newPersonalProfile.save();
        }

        // Create professional profile if requested
        if (professionalProfile) {
            const newProfessionalProfile = new professionalProfileModel({
                user: user._id,
                ...professionalProfile
            });
            await newProfessionalProfile.save();
        }

        // Create educational profile if requested
        if (educationalProfile) {
            const newEducationalProfile = new educationalProfileModel({
                user: user._id,
                ...educationalProfile
            });
            await newEducationalProfile.save();
        }

        res.status(200).json({ message: 'Profiles updated successfully' });
    } catch (error) {
        console.error('Error updating profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
