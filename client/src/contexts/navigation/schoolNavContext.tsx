import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface SchoolNavContextProps {
    activeState: string;
    setActiveState: (state: string) => void;
}

interface SchoolNavProviderProps {
    children: ReactNode;
}

const SchoolNavContext = createContext<SchoolNavContextProps | undefined>(undefined);


export const SchoolNavProvider: React.FC<SchoolNavProviderProps> = ({ children }) => {
    const [activeState, setActiveState] = useState('courses');
    const navigate = useNavigate();
    const { username } = useParams<{ username: string }>();

    const handleSetActiveState = (state: string) => {
        setActiveState(state);
        switch (state) {
            case 'campus':
                navigate(`/school/${username}/campus`);
                break;
            case 'clubsAndOrgs':
                navigate(`/school/${username}/clubsAndOrgs`);
                break;
            default:
                navigate(`/school/${username}/courses`);
                break;
        }
    };

    return (
        <SchoolNavContext.Provider value={{ activeState, setActiveState: handleSetActiveState }}>
            {children}
        </SchoolNavContext.Provider>
    );
};

export const useSchoolNavContext = (): SchoolNavContextProps => {
    const context = useContext(SchoolNavContext);
    if (!context) {
        throw new Error('useSchoolNavContext must be used within a SchoolNavProvider');
    }
    return context;
};
