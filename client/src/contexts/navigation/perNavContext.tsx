import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface PerNavContextProps {
    activeState: string;
    setActiveState: (state: string, username: string) => void;
}

interface PerNavProviderProps {
    children: ReactNode;
}

const PerNavContext = createContext<PerNavContextProps | undefined>(undefined);

export const PerNavProvider: React.FC<PerNavProviderProps> = ({ children }) => {
    const [activeState, setActiveState] = useState('personal');
    const navigate = useNavigate();

    const handleSetActiveState = (state: string, username: string) => {
        setActiveState(state);
        switch (state) {
            case 'clips':
                navigate(`/personal/${username}/clips`);
                break;
            case 'chirps':
                navigate(`/personal/${username}/chirps`);
                break;
            default:
                navigate(`/personal/${username}`);
                break;
        }
    };

    return (
        <PerNavContext.Provider value={{ activeState, setActiveState: handleSetActiveState }}>
            {children}
        </PerNavContext.Provider>
    );
};

export const usePerNavContext = (): PerNavContextProps => {
    const context = useContext(PerNavContext);
    if (!context) {
        throw new Error('usePerNavContext must be used within a PerNavProvider');
    }
    return context;
};
