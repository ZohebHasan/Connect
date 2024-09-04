import { Response } from 'express';
import User from '../../../models/userModel';
import personalProfileModel from '../../../models/profiles/personal';
import professionalProfileModel from '../../../models/profiles/professional/professional';
import schoolProfileModel from '../../../models/profiles/school/school';
import { AuthenticatedRequest } from '../../../middleware/authMiddleware'; 

export const handleProfileSelections = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id; 
    const { personal, professional, school } = req.body;

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
        if (personal) {
            const newPersonalProfile = new personalProfileModel({
                user: user._id
            });
            await newPersonalProfile.save();
        }

        // Create professional profile if requested
        if (professional) {
            const newProfessionalProfile = new professionalProfileModel({
                user: user._id
            });
            await newProfessionalProfile.save();
        }

        // Create educational profile if requested
        if (school) {
            const newEducationalProfile = new schoolProfileModel({
                user: user._id
            });
            await newEducationalProfile.save();
        }

        res.status(200).json({ message: 'Profiles created successfully' });
    } catch (error) {
        console.error('Error creating profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
