import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/componentsSelectLanguage/headerSelectLang';
import BackgroundAnimation from '../components/componentsSelectLanguage/assets/background';
import Body from '../components/componentsSelectLanguage/bodySelectLang.jsx';

const SelectLanguagePage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkMode, setDarkMode] = useState(false);
    const sidebarRef = useRef(null);
    const toggleRef = useRef(null);
    const darkLightToggleRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode); // Ensure we toggle based on the previous state
    };

    useEffect(() => {
        // Event handler to close the sidebar when clicking outside of it
        const handleClickOutside = (event) => {
            if (isSidebarOpen) {
                const outsideSidebar = sidebarRef.current && !sidebarRef.current.contains(event.target);
                const outsideToggle = toggleRef.current && !toggleRef.current.contains(event.target);
                const outsideDarkLightToggle = darkLightToggleRef.current && !darkLightToggleRef.current.contains(event.target);
    
                if (outsideSidebar && outsideToggle && outsideDarkLightToggle) {
                    setSidebarOpen(false);
                }
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);

    return (
        <>
            <div className="selectLanguagePageContainer">
                <BackgroundAnimation />
                <Header
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                    darkLightToggleRef={darkLightToggleRef}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    toggleRef={toggleRef} 
                />
                <Body isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef} />
            </div>
            <div className="copyRight">Connect Inc. © 2024</div>
        </>
    );
};

export default SelectLanguagePage;
