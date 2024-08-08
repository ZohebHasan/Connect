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
exports.getUserRecommendations = void 0;
const professional_1 = __importDefault(require("../../../../models/profiles/professional/professional"));
const userModel_1 = __importDefault(require("../../../../models/userModel"));
const isPopulatedUser = (user) => {
    return user && typeof user.fullName === 'string' && typeof user.userName === 'string' && typeof user.isVerified === 'boolean';
};
const isPopulatedProfessionalProfile = (profile) => {
    return profile && profile.user && typeof profile.profilePhoto === 'string' && profile.currentStatus && typeof profile.currentStatus.role === 'string';
};
const transformUserProfile = (profile) => {
    const user = profile.user;
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
const transformRecommendation = (recommendation, profile) => ({
    recommender: transformUserProfile(profile),
    text: recommendation.text,
    media: recommendation.media,
    recTime: recommendation.recTime,
    recType: recommendation.recType,
    description: recommendation.description,
    relation: recommendation.relation,
    relationStatus: recommendation.relationStatus,
});
const getUserRecommendations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        const recommendations = (yield Promise.all(professionalProfile.recommendations.map((rec) => __awaiter(void 0, void 0, void 0, function* () {
            const recommenderProfile = yield professional_1.default.findById(rec.recommender)
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
        })))).filter((rec) => rec !== null);
        return res.status(200).json(recommendations);
    }
    catch (error) {
        console.error('Error fetching recommendations:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserRecommendations = getUserRecommendations;
