import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); 


    useEffect(() => {
        console.log("Current language state:", language);
    }, [language]);
    
    const changeLanguage = (langCode) => {
        console.log("Updating language to:", langCode);
        setLanguage(langCode);
        console.log("Current language state:", language);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};


export const useLanguage = () => useContext(LanguageContext);
