// src/authContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkSession } from './authHelpers';

interface AuthContextType {
    user: any;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionUser = await checkSession();
            setUser(sessionUser);
            setLoading(false);
        };

        fetchSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
