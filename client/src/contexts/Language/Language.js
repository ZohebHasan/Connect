import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en-US'); 

    const changeLanguage = (langCode) => {
        // console.log("Updating language to:", langCode);
        setLanguage(langCode);
    };

    useEffect(() => {
        // console.log("Current language state:", language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};


export const useLanguage = () => useContext(LanguageContext);
