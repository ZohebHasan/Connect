import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useConnectUser } from '../ConnectUser/connectUserProvider';

export type ProfileType = 'personal' | 'professional' | 'school';

interface Profile {
    type: ProfileType;
    photoUrl: string | null;
}

interface ProfileContextType {
    activeProfile: ProfileType | null;
    handleProfileChange: (profile: ProfileType) => void;
    isActivePersonal: boolean;
    isActiveProfessional: boolean;
    isActiveSchool: boolean;
    isProfilesbarOpen: boolean;
    toggleProfilesbar: () => void;
    addProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    removeProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    profiles: Profile[];
    loading: boolean;
    error: string | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeProfile, setActiveProfile] = useState<ProfileType | null>(null);
    const [isProfilesbarOpen, setIsProfilesbarOpen] = useState<boolean>(false);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const protectedRefs = useRef<React.RefObject<HTMLElement>[]>([]);
    const navigate = useNavigate();
    const { user, loading: userLoading } = useConnectUser();

    const isActivePersonal = activeProfile === 'personal';
    const isActiveProfessional = activeProfile === 'professional';
    const isActiveSchool = activeProfile === 'school';

    useEffect(() => {
        if (!userLoading && user) {
            const fetchProfiles = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get('http://localhost:8000/profiles', { withCredentials: true });
                    const fetchedProfiles: Profile[] = response.data;
                    // console.log('Fetched profiles:', fetchedProfiles); // Add this line to debug
                    setProfiles(fetchedProfiles);

                    if (fetchedProfiles.length > 0) {
                        const initialProfile = fetchedProfiles[0].type;
                        setActiveProfile(initialProfile);
                    }
                } catch (error) {
                    console.error('Error fetching profiles:', error);
                    setError('Failed to fetch profiles');
                } finally {
                    setLoading(false);
                }
            };

            fetchProfiles();
        }
    }, [userLoading, user]);

    const handleProfileChange = (profile: ProfileType) => {
        setActiveProfile(profile);
        setIsProfilesbarOpen(false);
        if (user) {
            navigate(`/${profile}/${user.username}`);
        }
    };

    const toggleProfilesbar = () => {
        setIsProfilesbarOpen(prev => !prev);
    };

    const addProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        if (!protectedRefs.current.includes(ref)) {
            protectedRefs.current.push(ref);
        }
    };

    const removeProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        protectedRefs.current = protectedRefs.current.filter(r => r !== ref);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isProfilesbarOpen) {
                const isClickOutsideProtectedRefs = !protectedRefs.current.some(ref => ref.current?.contains(event.target as Node));
                if (isClickOutsideProtectedRefs) {
                    toggleProfilesbar();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfilesbarOpen]);

    return (
        <ProfileContext.Provider value={{
            activeProfile,
            handleProfileChange,
            isActivePersonal,
            isActiveProfessional,
            isActiveSchool,
            isProfilesbarOpen,
            toggleProfilesbar,
            addProtectedRef,
            removeProtectedRef,
            profiles,
            loading,
            error,
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextType => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
