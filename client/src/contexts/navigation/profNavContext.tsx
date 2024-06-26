import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfNavContextProps {
    activeState: string;
    setActiveState: (state: string) => void;
}

interface ProfNavProviderProps {
    children: ReactNode;
}

const ProfNavContext = createContext<ProfNavContextProps | undefined>(undefined);

export const ProfNavProvider: React.FC<ProfNavProviderProps> = ({ children }) => {
    const [activeState, setActiveState] = useState('about');
    const navigate = useNavigate();

    const handleSetActiveState = (state: string) => {
        setActiveState(state);
        switch (state) {
            case 'posts':
                navigate('/currentUser/professional/posts');
                break;
            case 'recommendations':
                navigate('/currentUser/professional/recommendations');
                break;
            default:
                navigate('/currentUser/professional');
                break;
        }
    };

    return (
        <ProfNavContext.Provider value={{ activeState, setActiveState: handleSetActiveState }}>
            {children}
        </ProfNavContext.Provider>
    );
};

export const useProfNavContext = (): ProfNavContextProps => {
    const context = useContext(ProfNavContext);
    if (!context) {
        throw new Error('useProfNavContext must be used within a ProfNavProvider');
    }
    return context;
};
