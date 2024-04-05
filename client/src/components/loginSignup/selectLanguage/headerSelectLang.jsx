import React, { useEffect } from 'react';

import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/selectLang/selectLangHeader.css'; 


import '../../../stylesheets/elements/darkLightToggle.css';
import '../../../stylesheets/elements/sideBar.css'

import LogoDark from '../../assets/logoDark.png';
import LogoLight from '../../assets/logoLight.png'; 

import DarkLightToggle from '../../elements/darkLightToggle/darkLightToggle.jsx';
import Sidebar from '../smallComponenets/sideBar.jsx'

const Header = ({ 
    toggleSidebar, 
    isSidebarOpen, 
    darkLightToggleRef, 
    isDarkMode, 
    toggleDarkMode, 
    toggleRef,
    sidebarRef
}) => {
    useEffect(() => {
        const logoImg = document.querySelector('.logo img');
        if (logoImg) {
            setTimeout(() => {
                logoImg.style.opacity = 1;
            }, 500);
        }
    }, []);

    return (
        <>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} />
        <div className="selectLangHeader">
            <div className="logo">
                <img src={isDarkMode ? LogoDark : LogoLight} alt="Logo" style={{ opacity: 1 }} />
            </div>
            <div ref={darkLightToggleRef} className="toggleBar">
                <DarkLightToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>
            <div ref={toggleRef} className='optionBar'>
                <div className={`icon ${isSidebarOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>
                    {isSidebarOpen ? '×' : '☰'}
                </div>            
            </div>
        </div>
        </>
        
    );
};

export default Header;
