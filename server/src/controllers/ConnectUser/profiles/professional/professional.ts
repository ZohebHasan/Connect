import { Request, Response } from 'express';
import { Types } from 'mongoose';
import ProfessionalProfile from '../../../../models/profiles/professional/professional';
import User from '../../../../models/userModel';
import { AuthenticatedRequest } from '../../../../middleware/authMiddleware';

interface UserProfile {
    userId: string;
    name?: string;
    isVerified?: boolean;
    profilePhoto?: string;
}

interface Media {
    type: 'image' | 'video';
    url: string;
}

interface CommonInfo {
    title: string;
    timeType?: string;
    location?: string;
    duration: string;
    description: string;
    media?: Media[];
    department?: string;
}

interface Org {
    company?: string; // This will hold the ObjectId as a string
    name?: string;
    isVerified?: boolean;
    profilePhoto?: string;
}

interface ProjectInfo extends CommonInfo {
    role?: string;
    association?: Org;
    projectLink?: string;
    collaborators?: UserProfile[];
    skills?: string[];
}

interface ResearchAndPubInfo extends CommonInfo {
    role?: string;
    association?: Org;
    researchLink?: string;
    collaborators?: UserProfile[];
    skills?: string[];
}

interface SkillInfo extends CommonInfo {
    proficiency?: string;
    endorsedBy?: UserProfile[];
}

interface OrgWithInfo {
    organization: Org;
    infoList: CommonInfo[];
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

interface Professional {
    followers: string[];
    following: string[];
    bio: string;
    profilePhoto: string;
    company: Org;
    school: Org;
    recommendations: RecommendationInfo[];
    currentStatus: {
        role: string;
        orgName?: string;
    };
    location: string;
    experiences: OrgWithInfo[];
    educations: OrgWithInfo[];
    projects: ProjectInfo[];
    research: ResearchAndPubInfo[];
    leadership: OrgWithInfo[];
    skills: SkillInfo[];
    certifications: OrgWithInfo[];
    awards: OrgWithInfo[];
}

interface PopulatedOrganization {
    _id: Types.ObjectId;
    user: {
        fullName: string;
        isVerified: boolean;
    };
    profilePhoto: string;
}

interface PopulatedUser {
    _id: Types.ObjectId;
    fullName: string;
    isVerified: boolean;
    profilePhoto: string;
}

const isPopulatedOrganization = (org: any): org is PopulatedOrganization => {
    return org && org.user && typeof org.user.fullName === 'string' && typeof org.user.isVerified === 'boolean';
};

const isPopulatedUser = (user: any): user is PopulatedUser => {
    return user && typeof user.fullName === 'string' && typeof user.isVerified === 'boolean';
};

const transformOrg = (org: any): Org => {
    if (isPopulatedOrganization(org)) {
        return {
            company: org._id.toString(),
            name: org.user.fullName,
            isVerified: org.user.isVerified,
            profilePhoto: org.profilePhoto
        };
    } else {
        return {
            name: org?.name
        };
    }
};

const transformUserProfile = (user: any): UserProfile => {
    if (isPopulatedUser(user)) {
        return {
            userId: user._id.toString(),
            name: user.fullName,
            isVerified: user.isVerified,
            profilePhoto: user.profilePhoto
        };
    }
    return {
        userId: user._id.toString()
    };
};

const transformOrgWithInfo = (orgWithInfo: any): OrgWithInfo => ({
    organization: transformOrg(orgWithInfo.organization),
    infoList: orgWithInfo.infoList
});

const transformRecommendation = (recommendation: any): RecommendationInfo => ({
    recommender: transformUserProfile(recommendation.recommender),
    text: recommendation.text,
    media: recommendation.media,
    recTime: recommendation.recTime,
    recType: recommendation.recType,
    description: recommendation.description,
    relation: recommendation.relation,
    relationStatus: recommendation.relationStatus,
});

const transformProject = (project: any): ProjectInfo => ({
    ...project,
    collaborators: project.collaborators.map(transformUserProfile),
    association: project.association ? transformOrg(project.association) : undefined,
});

const transformSkill = (skill: any): SkillInfo => ({
    ...skill,
    endorsedBy: skill.endorsedBy.map(transformUserProfile)
});

export const getUserProfessional = async (req: AuthenticatedRequest, res: Response) => {
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
                path: 'company.company',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName isVerified'
                }
            })
            .populate({
                path: 'school.company',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName isVerified'
                }
            })
            .populate({
                path: 'experiences.organization',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName isVerified'
                }
            })
            .populate({
                path: 'educations.organization',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName isVerified'
                }
            })
            .populate({
                path: 'leadership.organization',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName isVerified'
                }
            })
            .populate({
                path: 'certifications.organization',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName isVerified'
                }
            })
            .populate({
                path: 'awards.organization',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'fullName isVerified'
                }
            })
            .populate({
                path: 'recommendations.recommender',
                model: 'User',
                select: 'fullName isVerified profilePhoto'
            })
            .populate({
                path: 'projects.collaborators',
                model: 'User',
                select: 'fullName isVerified profilePhoto'
            })
            .populate({
                path: 'research.collaborators',
                model: 'User',
                select: 'fullName isVerified profilePhoto'
            })
            .populate({
                path: 'skills.endorsedBy',
                model: 'User',
                select: 'fullName isVerified profilePhoto'
            })
            .lean();

        if (!professionalProfile) {
            return res.status(404).json({ message: 'Professional profile not found' });
        }

        const companyProfile = professionalProfile.company?.company;
        const schoolProfile = professionalProfile.school?.company;

        const profileData: Professional = {
            followers: professionalProfile.followers.map((follower: Types.ObjectId) => follower.toString()),
            following: professionalProfile.following.map((following: Types.ObjectId) => following.toString()),
            bio: professionalProfile.bio,
            profilePhoto: professionalProfile.profilePhoto,
            company: transformOrg(companyProfile),
            school: transformOrg(schoolProfile),
            recommendations: professionalProfile.recommendations.map(transformRecommendation),
            currentStatus: {
                role: professionalProfile.currentStatus.role,
                orgName: professionalProfile.currentStatus.orgName,
            },
            location: professionalProfile.location,
            experiences: professionalProfile.experiences.map(transformOrgWithInfo),
            educations: professionalProfile.educations.map(transformOrgWithInfo),
            projects: professionalProfile.projects.map(transformProject),
            research: professionalProfile.research.map(transformProject),
            leadership: professionalProfile.leadership.map(transformOrgWithInfo),
            skills: professionalProfile.skills.map(transformSkill),
            certifications: professionalProfile.certifications.map(transformOrgWithInfo),
            awards: professionalProfile.awards.map(transformOrgWithInfo),
        };

        return res.status(200).json(profileData);
    } catch (error) {
        console.error('Error fetching professional profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
