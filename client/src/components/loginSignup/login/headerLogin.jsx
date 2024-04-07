import React, { useEffect } from 'react';
import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/login/loginHeader.css'; 

import '../../../stylesheets/elements/darkLightToggle.css';

import DarkLightToggle from '../../elements/darkLightToggle/darkLightToggle.jsx';

const Header = ({ darkLightToggleRef, isDarkMode, toggleDarkMode}) => {
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
        <div className="loginHeader">
            <div ref={darkLightToggleRef} className="toggleBar">
                <DarkLightToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>
        </div>
        </>
        
    );
};

export default Header;
