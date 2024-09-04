import { Request, Response } from 'express';
import PersonalProfile from '../../models/profiles/personal';
import ProfessionalProfile from '../../models/profiles/professional/professional';
import SchoolProfile from '../../models/profiles/school/school';
import User from '../../models/userModel';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';

export const getUserProfiles = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
        const user = await User.findById(userId);
        // console.log('User:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const personalProfile = await PersonalProfile.findOne({ user: userId }).lean();
        const professionalProfile = await ProfessionalProfile.findOne({ user: userId }).lean();
        const schoolProfile = await SchoolProfile.findOne({ user: userId }).lean();

        // console.log('Personal Profile:', personalProfile);
        // console.log('Professional Profile:', professionalProfile);
        // console.log('Educational Profile:', educationalProfile);

        const profiles = [];

        if (personalProfile) {
            profiles.push({
                type: 'personal',
                photoUrl: personalProfile.profilePhoto ,
            });
        }
        
        if (professionalProfile) {
            profiles.push({
                type: 'professional',
                photoUrl: professionalProfile.profilePhoto,
            });
        }
        
        if (schoolProfile) {
            profiles.push({
                type: 'school',
                photoUrl: schoolProfile.profilePhoto,
            });
        }

        // console.log('Profiles to return:', profiles);
        return res.status(200).json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
