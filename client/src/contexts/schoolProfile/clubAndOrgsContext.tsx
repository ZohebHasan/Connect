import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface UserProfile {
    userId: string;
    name?: string;
    isVerified?: boolean;
    userName: string;
    profilePhoto?: string;
}

export interface Eboard {
    position: string;
    user: UserProfile; // Reference to the user holding the position
}

export interface ClubAndOrg {
    clubAndOrgId: string;
    photoUrl: string;
    orgName: string;
    orgCode: string;
    advisor?: UserProfile;
    eBoard: Eboard[];
}

export interface OrgsContextType {
    clubsAndOrgs: ClubAndOrg[];
    activeOrg: ClubAndOrg | null;
    setActiveOrg: (orgCode: string) => void;
    toggleOrgBar: () => void;
    isOrgBarOpen: boolean;
    addProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    removeProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
}

const OrgsContext = createContext<OrgsContextType | undefined>(undefined);

export const OrgsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [clubsAndOrgs, setClubsAndOrgs] = useState<ClubAndOrg[]>([]);
    const [activeOrg, setActiveOrgState] = useState<ClubAndOrg | null>(null);
    const [isOrgBarOpen, setIsOrgBarOpen] = useState<boolean>(false);
    const protectedRefs = useRef<React.RefObject<HTMLElement>[]>([]);

    useEffect(() => {
        // Fetching clubs and organizations data from the API
        const fetchClubsAndOrgs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/clubsAndOrgs', {
                    withCredentials: true, 
                });
                setClubsAndOrgs(response.data.clubsAndOrgs);
                // console.log(response.data.clubsAndOrgs);
            } catch (error) {
                console.error('Failed to fetch clubs and organizations data', error);
            }
        };

        fetchClubsAndOrgs();
    }, []);

    const addProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        if (!protectedRefs.current.includes(ref)) {
            protectedRefs.current.push(ref);
        }
    };

    const removeProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        protectedRefs.current = protectedRefs.current.filter(r => r !== ref);
    };

    const toggleOrgBar = () => {
        setIsOrgBarOpen(!isOrgBarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOrgBarOpen) {
                const isClickOutsideProtectedRefs = !protectedRefs.current.some(ref => ref.current?.contains(event.target as Node));
                if (isClickOutsideProtectedRefs) {
                    toggleOrgBar();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOrgBarOpen]);

    const setActiveOrg = (orgCode: string) => {
        const selectedOrg = clubsAndOrgs.find(org => org.orgCode === orgCode) || null;
        setActiveOrgState(selectedOrg);
    };

    return (
        <OrgsContext.Provider value={{
            clubsAndOrgs,
            activeOrg,
            setActiveOrg,
            toggleOrgBar,
            isOrgBarOpen,
            addProtectedRef,
            removeProtectedRef,
        }}>
            {children}
        </OrgsContext.Provider>
    );
};

export const useOrgs = (): OrgsContextType => {
    const context = useContext(OrgsContext);
    if (context === undefined) {
        throw new Error('useOrgs must be used within an OrgsProvider');
    }
    return context;
};
