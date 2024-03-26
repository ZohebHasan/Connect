import React, { useEffect, forwardRef } from 'react';
import '../../stylesheets/App.css'; 
import '../../stylesheets/selectLanguagePage/selectLanguageHeader.css'; 
import logoDark from './assets/logoDark.png';
import DarkLightToggle from '../animations/darkLightToggle/darkLightToggle.jsx';

const Header = ({ toggleSidebar, isSidebarOpen, toggleRef, darkLightToggleRef }) => {
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
                <img src={logoDark} alt="Logo" style={{ opacity: 0 }} />
            </div>
            <div ref={darkLightToggleRef} className="toggleBar">
                <DarkLightToggle />
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
