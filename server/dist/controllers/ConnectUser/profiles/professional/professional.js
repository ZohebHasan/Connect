"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfessional = void 0;
const professional_1 = __importDefault(require("../../../../models/profiles/professional/professional"));
const userModel_1 = __importDefault(require("../../../../models/userModel"));
const isPopulatedOrganization = (org) => {
    return org && org.user && typeof org.user.fullName === 'string' && typeof org.user.isVerified === 'boolean';
};
const isPopulatedUser = (user) => {
    return user && typeof user.fullName === 'string' && typeof user.isVerified === 'boolean';
};
const transformOrg = (org) => {
    if (isPopulatedOrganization(org)) {
        return {
            company: org._id.toString(),
            name: org.user.fullName,
            isVerified: org.user.isVerified,
            profilePhoto: org.profilePhoto
        };
    }
    else {
        return {
            name: org === null || org === void 0 ? void 0 : org.name
        };
    }
};
const transformUserProfile = (user) => {
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
const transformOrgWithInfo = (orgWithInfo) => ({
    organization: transformOrg(orgWithInfo.organization),
    infoList: orgWithInfo.infoList
});
const transformRecommendation = (recommendation) => ({
    recommender: transformUserProfile(recommendation.recommender),
    text: recommendation.text,
    media: recommendation.media,
    recTime: recommendation.recTime,
    recType: recommendation.recType,
    description: recommendation.description,
    relation: recommendation.relation,
    relationStatus: recommendation.relationStatus,
});
const transformProject = (project) => (Object.assign(Object.assign({}, project), { collaborators: project.collaborators.map(transformUserProfile), association: project.association ? transformOrg(project.association) : undefined }));
const transformSkill = (skill) => (Object.assign(Object.assign({}, skill), { endorsedBy: skill.endorsedBy.map(transformUserProfile) }));
const getUserProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }
    try {
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const professionalProfile = yield professional_1.default.findOne({ user: userId })
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
        const companyProfile = (_b = professionalProfile.company) === null || _b === void 0 ? void 0 : _b.company;
        const schoolProfile = (_c = professionalProfile.school) === null || _c === void 0 ? void 0 : _c.company;
        const profileData = {
            followers: professionalProfile.followers.map((follower) => follower.toString()),
            following: professionalProfile.following.map((following) => following.toString()),
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
    }
    catch (error) {
        console.error('Error fetching professional profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserProfessional = getUserProfessional;
