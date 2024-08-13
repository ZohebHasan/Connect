import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

// Define the Personal profile interface
interface Personal {
    followers: string[];
    following: string[];
    bio: string;
    profilePhoto: string; 
}

// Define the context interface
interface PersonalContextType {
    personalProfile: Personal | null;
    loading: boolean;
    error: string | null;
}

// Create the context
const PersonalContext = createContext<PersonalContextType | undefined>(undefined);

// Create a provider component
export const PersonalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [personalProfile, setPersonalProfile] = useState<Personal | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPersonalProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/currentUserPersonal`, {
                    withCredentials: true,
                });
                setPersonalProfile(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching personal profile:', error);
                setError('Failed to fetch personal profile');
            } finally {
                setLoading(false);
            }
        };

        fetchPersonalProfile();
    }, []);

    return (
        <PersonalContext.Provider value={{ personalProfile, loading, error }}>
            {children}
        </PersonalContext.Provider>
    );
};

// Custom hook to use the context
export const usePersonalContext = (): PersonalContextType => {
    const context = useContext(PersonalContext);
    if (!context) {
        throw new Error('usePersonalContext must be used within a PersonalProvider');
    }
    return context;
};
