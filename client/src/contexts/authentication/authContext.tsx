import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkSession, refreshAuthToken } from '../../services/authHelpers';

interface AuthContextType {
    user: any;
    token: string | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                let sessionUser = await checkSession();
                if (!sessionUser) {
                    // If session check failed, try to refresh the token
                    await refreshAuthToken();
                    sessionUser = await checkSession();
                }
                setUser(sessionUser);
            } catch (error) {
                console.error('Session check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, setUser, setToken }}>
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
