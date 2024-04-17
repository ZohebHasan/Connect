import React, { useState, useEffect, useRef } from 'react';

import Header from '../../../components/loginSignup/agreement/headerAgreement.jsx';
import Background1 from '../../../components/loginSignup/agreement/background/backgroudAgreement.jsx'
import Body from '../../../components/loginSignup/agreement/bodyAgreement.jsx'
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode'

const AgreementPage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const toggleRef = useRef(null);
    const darkLightToggleRef = useRef(null);
    const containerRef = useRef(null);
    const { isDarkMode, toggleDarkMode } = useDarkMode(); 

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
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
        containerRef.current.classList.add('fade-in');
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);

    return (
        <>
             <div ref={containerRef} className="pageContainer">
                <Background1 />
                <Header
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                    darkLightToggleRef={darkLightToggleRef}
                    sidebarRef={sidebarRef}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    toggleRef={toggleRef} 
                />
                <Body isSidebarOpen={isSidebarOpen}/>
            </div>
            <div className="copyRight">Connect Inc. © 2024</div>  
        </>
    );
};

export default AgreementPage;
