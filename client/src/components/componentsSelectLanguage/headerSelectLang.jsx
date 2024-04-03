import React, { useEffect } from 'react';
import '../../stylesheets/App.css'; 
import '../../stylesheets/selectLanguagePage/selectLanguageHeader.css'; 
import LogoDark from './assets/logoDark.png';
import LogoLight from './assets/logoLight.png'; 
import DarkLightToggle from '../animations/darkLightToggle/darkLightToggle.jsx';

const Header = ({ 
    toggleSidebar, 
    isSidebarOpen, 
    darkLightToggleRef, 
    isDarkMode, 
    toggleDarkMode, 
    toggleRef 
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
        <div className="selectLanguageHeaderContainer">
            <div className="logo">
                <img src={isDarkMode ? LogoDark : LogoLight} alt="Logo" style={{ opacity: 1 }} />
            </div>
            <div ref={darkLightToggleRef} className="toggleBar">
                <DarkLightToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>
            <div ref={toggleRef} className='optionBar'>
                <div className={`toggle-icon ${isSidebarOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>
                    {isSidebarOpen ? '×' : '☰'}
                </div>            
            </div>
        </div>
    );
};

export default Header;
