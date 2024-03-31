import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/componentsSelectLanguage/headerSelectLang';
import BackgroundAnimation from '../components/componentsSelectLanguage/assets/background';
import Body from '../components/componentsSelectLanguage/bodySelectLang.jsx';

const SelectLanguagePage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const toggleRef = useRef(null);
    const darkLightToggleRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log('Document clicked');
            if (isSidebarOpen) {
                console.log('Sidebar is open');
    
                const outsideSidebar = sidebarRef.current && !sidebarRef.current.contains(event.target);
                const outsideToggle = toggleRef.current && !toggleRef.current.contains(event.target);
                const outsideDarkLightToggle = !darkLightToggleRef.current || !darkLightToggleRef.current.contains(event.target);
    
                console.log('Outside Sidebar:', outsideSidebar);
                console.log('Outside Toggle:', outsideToggle);
                console.log('Outside Dark Light Toggle:', outsideDarkLightToggle);
    
                if (outsideSidebar && outsideToggle && outsideDarkLightToggle) {
                    console.log('Closing Sidebar');
                    setSidebarOpen(false);
                }
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);
    

    return (
        <div className="selectLanguagePageContainer">
            {/* <BackgroundAnimation /> */}
            <Header
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                toggleRef={toggleRef}
                darkLightToggleRef={darkLightToggleRef}
            />
            <Body isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef} />


        </div>
    );
};

export default SelectLanguagePage;
