import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface LeftBarNavButtons {
    home: boolean;
    search: boolean;
    notifications: boolean;
    inbox: boolean;
    clips: boolean;
    trending: boolean;
    create: boolean;
}

interface LeftBarNavButtonContextType {
    leftBarNavButtons: LeftBarNavButtons;
    toggleActive: (buttonKey: keyof LeftBarNavButtons) => void;
    setLeftBarNavButtons: React.Dispatch<React.SetStateAction<LeftBarNavButtons>>;
}

const LeftBarNavButtonContext = createContext<LeftBarNavButtonContextType | undefined>(undefined);

export const LeftBarNavButtonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [leftBarNavButtons, setLeftBarNavButtons] = useState<LeftBarNavButtons>({
        home: true,
        search: false,
        notifications: false,
        inbox: false,
        clips: false,
        trending: false,
        create: false
    });

    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        if (
            currentPath.startsWith('/currentUser/personal') ||
            currentPath.startsWith('/currentUser/professional') ||
            currentPath.startsWith('/currentUser/school')
        ) {
            setLeftBarNavButtons({
                home: false,
                search: false,
                notifications: false,
                inbox: false,
                clips: false,
                trending: false,
                create: false
            });
        }
    }, [location]);

    const toggleActive = (buttonKey: keyof LeftBarNavButtons) => {
        setLeftBarNavButtons(prevState => ({
            ...prevState,
            home: false,
            search: false,
            notifications: false,
            inbox: false,
            clips: false,
            trending: false,
            create: false,
            [buttonKey]: true
        }));
    };

    return (
        <LeftBarNavButtonContext.Provider value={{ leftBarNavButtons, toggleActive, setLeftBarNavButtons }}>
            {children}
        </LeftBarNavButtonContext.Provider>
    );
};

export const useLeftBarNavButton = (): LeftBarNavButtonContextType => {
    const context = useContext(LeftBarNavButtonContext);
    if (!context) {
        throw new Error('useLeftBarNavButton must be used within a LeftBarNavButtonProvider');
    }
    return context;
};
