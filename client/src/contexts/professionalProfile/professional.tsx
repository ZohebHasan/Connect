import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

// Define the Media interface
interface Media {
    type: 'image' | 'video';
    url: string;
}

// Define the CommonInfo interface
interface CommonInfo {
    title: string;
    timeType?: string;
    location?: string;
    duration: string;
    description: string;
    media?: Media[];
    department?: string;
}

// Define the Org interface
interface Org {
    company?: string; // This will hold the ObjectId as a string
    name?: string;
    isVerified?: boolean;
    profilePhoto?: string;
}

// Define the OrgWithInfo interface
interface OrgWithInfo {
    organization: Org;
    infoList: CommonInfo[];
}

// Define the RecommendationInfo interface
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

interface UserProfile {
    userId: String;
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

// Define the Professional profile interface
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

// Define the context interface
interface ProfessionalContextType {
    ProfessionalProfile: Professional | null;
    loading: boolean;
    error: string | null;
}

// Create the context
const ProfessionalContext = createContext<ProfessionalContextType | undefined>(undefined);

// Create a provider component
export const ProfessionalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ProfessionalProfile, setProfessionalProfile] = useState<Professional | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfessionalProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/currentUserProfessional`, {
                    withCredentials: true,
                });

                // Transform the response data to fit the Professional interface
                const transformOrg = (org: any): Org => {
                    if (org.company && org.company.user) {
                        return {
                            company: org.company._id,
                            name: org.company.user.fullName,
                            isVerified: org.company.user.isVerified,
                            profilePhoto: org.company.profilePhoto
                        };
                    } else {
                        return {
                            name: org.name
                        };
                    }
                };

                const data: Professional = {
                    followers: response.data.followers,
                    following: response.data.following,
                    bio: response.data.bio,
                    profilePhoto: response.data.profilePhoto,
                    company: transformOrg(response.data.company),
                    school: transformOrg(response.data.school),
                    recommendations: response.data.recommendations,
                    currentStatus: {
                        role: response.data.currentStatus.role,
                        orgName: response.data.currentStatus.orgName,
                    },
                    location: response.data.location,
                    experiences: response.data.experiences,
                    educations: response.data.educations,
                    projects: response.data.projects,
                    research: response.data.research,
                    leadership: response.data.leadership,
                    skills: response.data.skills,
                    certifications: response.data.certifications,
                    awards: response.data.awards,
                };
                // console.log(data);
                setProfessionalProfile(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching Professional profile:', error);
                setError('Failed to fetch Professional profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfessionalProfile();
    }, []);

    return (
        <ProfessionalContext.Provider value={{ ProfessionalProfile, loading, error }}>
            {children}
        </ProfessionalContext.Provider>
    );
};

// Custom hook to use the context
export const useProfessionalContext = (): ProfessionalContextType => {
    const context = useContext(ProfessionalContext);
    if (!context) {
        throw new Error('useProfessionalContext must be used within a ProfessionalProvider');
    }
    return context;
};
