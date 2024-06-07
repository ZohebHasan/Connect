import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveButtonContextType {
    activeButtons: Record<string, boolean>;
    toggleActive: (buttonKey: string) => void;
}

const ActiveButtonContext = createContext<ActiveButtonContextType | undefined>(undefined);

export const ActiveButtonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeButtons, setActiveButtons] = useState({
        home: false,
        search: false,
        notifications: false,
        inbox: false,
        clips: false,
        trending: false,
        create: false
    });

    const toggleActive = (buttonKey: string) => {
        setActiveButtons({
            home: false,
            search: false,
            notifications: false,
            inbox: false,
            clips: false,
            trending: false,
            create: false,
            [buttonKey]: true
        });
    };

    return (
        <ActiveButtonContext.Provider value={{ activeButtons, toggleActive }}>
            {children}
        </ActiveButtonContext.Provider>
    );
};

export const useActiveButton = (): ActiveButtonContextType => {
    const context = useContext(ActiveButtonContext);
    if (!context) {
        throw new Error('useActiveButton must be used within an ActiveButtonProvider');
    }
    return context;
};
