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
exports.getUserClubAndOrg = void 0;
const school_1 = __importDefault(require("../../../../models/profiles/school/school"));
const clubsAndOrgs_1 = __importDefault(require("../../../../models/profiles/school/clubsAndOrgs"));
const userModel_1 = __importDefault(require("../../../../models/userModel"));
const getUserClubAndOrg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const schoolProfile = yield school_1.default.findOne({ user: userId });
        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }
        let clubsAndOrgs = [];
        for (const clubAndOrgId of schoolProfile.clubs) {
            const clubDoc = yield clubsAndOrgs_1.default.findById(clubAndOrgId).lean();
            if (clubDoc) {
                let advisorProfile;
                if (clubDoc.advisor) {
                    const advisorProfileDoc = yield school_1.default.findById(clubDoc.advisor);
                    if (advisorProfileDoc) {
                        const advisorUserDoc = yield userModel_1.default.findById(advisorProfileDoc.user);
                        if (advisorUserDoc) {
                            if (advisorUserDoc._id) {
                                advisorProfile = {
                                    userId: advisorUserDoc._id.toString(),
                                    name: advisorUserDoc.fullName,
                                    isVerified: advisorUserDoc.isVerified,
                                    profilePhoto: advisorProfileDoc.profilePhoto,
                                    userName: advisorUserDoc.username
                                };
                            }
                        }
                    }
                }
                const eBoardMembers = [];
                for (const eBoardMember of clubDoc.eBoard) {
                    const memberProfileDoc = yield school_1.default.findById(eBoardMember.user);
                    if (memberProfileDoc) {
                        const memberUserDoc = yield userModel_1.default.findById(memberProfileDoc.user);
                        if (memberUserDoc) {
                            if (memberUserDoc._id) {
                                eBoardMembers.push({
                                    position: eBoardMember.position,
                                    user: {
                                        userId: memberUserDoc._id.toString(),
                                        name: memberUserDoc.fullName,
                                        isVerified: memberUserDoc.isVerified,
                                        profilePhoto: memberProfileDoc.profilePhoto,
                                        userName: memberUserDoc.username,
                                    },
                                });
                            }
                        }
                    }
                }
                clubsAndOrgs.push({
                    clubAndOrgId: clubDoc._id.toString(),
                    photoUrl: clubDoc.photoUrl,
                    orgName: clubDoc.orgName,
                    orgCode: clubDoc.orgCode,
                    advisor: advisorProfile,
                    eBoard: eBoardMembers,
                });
            }
        }
        const clubAndOrgData = {
            clubsAndOrgs: clubsAndOrgs
        };
        return res.status(200).json(clubAndOrgData);
    }
    catch (error) {
        console.error('Error fetching professional profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getUserClubAndOrg = getUserClubAndOrg;
