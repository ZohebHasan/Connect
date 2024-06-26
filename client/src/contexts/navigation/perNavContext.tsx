import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface PerNavContextProps {
    activeState: string;
    setActiveState: (state: string) => void;
}

interface PerNavProviderProps {
    children: ReactNode;
}

const PerNavContext = createContext<PerNavContextProps | undefined>(undefined);

export const PerNavProvider: React.FC<PerNavProviderProps> = ({ children }) => {
    const [activeState, setActiveState] = useState('pixels');
    const navigate = useNavigate();

    const handleSetActiveState = (state: string) => {
        setActiveState(state);
        switch (state) {
            case 'clips':
                navigate('/currentUser/personal/clips');
                break;
            case 'chirps':
                navigate('/currentUser/personal/chirps');
                break;
            default:
                navigate('/currentUser/personal');
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
