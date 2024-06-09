import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface PersonalProfileNavigationContextProps {
    activeState: string;
    setActiveState: (state: string) => void;
}

interface PersonalProfileNavigationProviderProps {
    children: ReactNode;
}

const PersonalProfileNavigationContext = createContext<PersonalProfileNavigationContextProps | undefined>(undefined);

export const PersonalProfileNavigationProvider: React.FC<PersonalProfileNavigationProviderProps> = ({ children }) => {
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
        <PersonalProfileNavigationContext.Provider value={{ activeState, setActiveState: handleSetActiveState }}>
            {children}
        </PersonalProfileNavigationContext.Provider>
    );
};

export const usePersonalProfileNavigationContext = (): PersonalProfileNavigationContextProps => {
    const context = useContext(PersonalProfileNavigationContext);
    if (!context) {
        throw new Error('usePersonalProfileNavigationContext must be used within a PersonalProfileNavigationProvider');
    }
    return context;
};
