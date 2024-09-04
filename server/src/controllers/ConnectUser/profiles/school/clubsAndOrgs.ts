import { Request, Response } from 'express';
import { Types } from 'mongoose';
import SchoolProfile from '../../../../models/profiles/school/school';
import ClubsAndOrgs from '../../../../models/profiles/school/clubsAndOrgs';
import User from '../../../../models/userModel';
import Organization from '../../../../models/organization';
import { AuthenticatedRequest } from '../../../../middleware/authMiddleware';

interface UserProfile {
    userId: string;
    name?: string;
    isVerified?: boolean;
    userName: string;
    profilePhoto?: string;
}

interface Eboard {
    position: string;
    user: UserProfile; // Reference to the user holding the position
}

interface ClubAndOrg {
    clubAndOrgId: string;
    photoUrl: string;
    orgName: string;
    orgCode: string; 
    advisor?: UserProfile;
    eBoard: Eboard[];
}

interface ClubAndOrgsData {
    clubsAndOrgs: ClubAndOrg[];
}

export const getUserClubAndOrg = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const schoolProfile = await SchoolProfile.findOne({ user: userId });

        if (!schoolProfile) {
            return res.status(404).json({ message: 'School profile not found' });
        }



 

        let clubsAndOrgs: ClubAndOrg[] = [];

        for (const clubAndOrgId of schoolProfile.clubs) {
            const clubDoc = await ClubsAndOrgs.findById(clubAndOrgId).lean();

            if (clubDoc) {
                let advisorProfile: UserProfile | undefined;
                if (clubDoc.advisor) {
                    const advisorProfileDoc = await SchoolProfile.findById(clubDoc.advisor);
                    if (advisorProfileDoc) {
                        const advisorUserDoc = await User.findById(advisorProfileDoc.user);
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

                const eBoardMembers: Eboard[] = [];
                for (const eBoardMember of clubDoc.eBoard) {
                    const memberProfileDoc = await SchoolProfile.findById(eBoardMember.user);
                    if (memberProfileDoc) {
                        const memberUserDoc = await User.findById(memberProfileDoc.user);
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


        const clubAndOrgData: ClubAndOrgsData = {
            clubsAndOrgs: clubsAndOrgs

        };

        return res.status(200).json(clubAndOrgData);
    } catch (error) {
        console.error('Error fetching professional profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
