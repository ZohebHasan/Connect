import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    userId: string;
    fullName: string;
    username: string;
    isVerified: boolean;
    pronouns: string;
}

interface ConnectUserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    fetchUserData: () => Promise<void>;
}

const ConnectUserContext = createContext<ConnectUserContextType | undefined>(undefined);

export const ConnectUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async () => {
        try {
            setLoading(true);
    
            const response = await axios.get('http://localhost:8000/user', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            const { fullName, username, isVerified, pronouns , userId} = response.data;
            setUser({ fullName, username, isVerified: isVerified, pronouns: pronouns, userId: userId});
        } catch (err: any) {
            console.error('Error fetching user data:', err);
            setError('Error fetching user data');
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <ConnectUserContext.Provider value={{ user, loading, error, fetchUserData }}>
            {children}
        </ConnectUserContext.Provider>
    );
};

export const useConnectUser = (): ConnectUserContextType => {
    const context = useContext(ConnectUserContext);
    if (!context) {
        throw new Error('useConnectUser must be used within a ConnectUserProvider');
    }
    return context;
};
