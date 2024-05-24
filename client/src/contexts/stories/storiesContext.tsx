
import React, { createContext, useState, useContext } from 'react';

interface StoriesPageContextProps {
    isStoriesPageOpen: boolean;
    toggleStoriesPage: () => void;
}

const StoriesPageContext = createContext<StoriesPageContextProps | undefined>(undefined);

export const StoriesPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isStoriesPageOpen, setIsStoriesPageOpen] = useState(false);

    const toggleStoriesPage = () => {
        setIsStoriesPageOpen((prev) => !prev);
    };

    return (
        <StoriesPageContext.Provider value={{ isStoriesPageOpen, toggleStoriesPage }}>
            {children}
        </StoriesPageContext.Provider>
    );
};

export const useStoriesPage = (): StoriesPageContextProps => {
    const context = useContext(StoriesPageContext);
    if (!context) {
        throw new Error('useStoriesPage must be used within a StoriesPageProvider');
    }
    return context;
};
