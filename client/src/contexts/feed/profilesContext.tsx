import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type ProfileType = 'personal' | 'professional' | 'school';

interface ProfileContextType {
    activeProfile: ProfileType;
    handleProfileChange: (profile: ProfileType) => void;
    isActivePersonal: boolean;
    isActiveProfessional: boolean;
    isActiveSchool: boolean;
    isProfilesbarOpen: boolean;
    toggleProfilesbar: () => void;
    addProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    removeProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeProfile, setActiveProfile] = useState<ProfileType>('professional');
    const [isProfilesbarOpen, setIsProfilesbarOpen] = useState<boolean>(false);
    const protectedRefs = useRef<React.RefObject<HTMLElement>[]>([]);
    const navigate = useNavigate();

    const isActivePersonal = activeProfile === 'personal';
    const isActiveProfessional = activeProfile === 'professional';
    const isActiveSchool = activeProfile === 'school';

    const handleProfileChange = (profile: ProfileType) => {
        setActiveProfile(profile);
        setIsProfilesbarOpen(false); // Close the sidebar after handling the profile change
        switch (profile) {
            case 'personal':
                navigate('#');
                break;
            case 'professional':
                navigate('#');
                break;
            case 'school':
                navigate('#');
                break;
            default:
                navigate('/');
                break;
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
            removeProtectedRef
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
