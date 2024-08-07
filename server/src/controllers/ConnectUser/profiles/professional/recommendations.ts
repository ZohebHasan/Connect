import { Request, Response } from 'express';
import { Types } from 'mongoose';
import ProfessionalProfile from '../../../../models/profiles/professional/professional';
import User from '../../../../models/userModel';
import { AuthenticatedRequest } from '../../../../middleware/authMiddleware';

interface UserProfile {
    userId: string;
    userName: string;
    name?: string;
    isVerified?: boolean;
    profilePhoto?: string;
    currentStatus: {
        role: string;
        orgName?: string;
    };
}

interface Media {
    type: 'image' | 'video';
    url: string;
}

interface RecommendationInfo {
    recommender: UserProfile;
    text?: string;
    media?: Media[];
    recTime: string;
    recType?: 'strongly' | 'formally';
    description: string;
    relation: string;
    relationStatus: 'current' | 'former';
}

interface PopulatedUser {
    _id: Types.ObjectId;
    fullName: string;
    userName: string;
    isVerified: boolean;
}

interface PopulatedProfessionalProfile {
    user: Types.ObjectId | PopulatedUser;
    profilePhoto: string;
    currentStatus: {
        role: string;
        orgName?: string;
    };
}

const isPopulatedUser = (user: any): user is PopulatedUser => {
    return user && typeof user.fullName === 'string' && typeof user.userName === 'string' && typeof user.isVerified === 'boolean';
};

const isPopulatedProfessionalProfile = (profile: any): profile is PopulatedProfessionalProfile => {
    return profile && profile.user && typeof profile.profilePhoto === 'string' && profile.currentStatus && typeof profile.currentStatus.role === 'string';
};

const transformUserProfile = (profile: PopulatedProfessionalProfile): UserProfile => {
    const user = profile.user as PopulatedUser;
    return {
        userId: user._id.toString(),
        userName: user.userName,
        name: user.fullName,
        isVerified: user.isVerified,
        profilePhoto: profile.profilePhoto,
        currentStatus: {
            role: profile.currentStatus.role,
            orgName: profile.currentStatus.orgName
        }
    };
};

const transformRecommendation = (recommendation: any, profile: PopulatedProfessionalProfile): RecommendationInfo => ({
    recommender: transformUserProfile(profile),
    text: recommendation.text,
    media: recommendation.media,
    recTime: recommendation.recTime,
    recType: recommendation.recType,
    description: recommendation.description,
    relation: recommendation.relation,
    relationStatus: recommendation.relationStatus,
});

export const getUserRecommendations = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const professionalProfile = await ProfessionalProfile.findOne({ user: userId })
            .populate({
                path: 'recommendations.recommender',
                model: 'Professional',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName userName isVerified'
                }
            })
            .lean();

        if (!professionalProfile) {
            return res.status(404).json({ message: 'Professional profile not found' });
        }

        const recommendations = (await Promise.all(
            professionalProfile.recommendations.map(async (rec) => {
                const recommenderProfile = await ProfessionalProfile.findById(rec.recommender)
                    .populate({
                        path: 'user',
                        model: 'User',
                        select: 'fullName userName isVerified'
                    })
                    .lean();
                if (recommenderProfile && isPopulatedProfessionalProfile(recommenderProfile)) {
                    return transformRecommendation(rec, recommenderProfile);
                }
                return null;
            })
        )).filter((rec): rec is RecommendationInfo => rec !== null);

        return res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
