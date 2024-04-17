import React, {useEffect, useRef } from 'react';

import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

import Header from '../../../components/loginSignup/login/headerLogin.jsx';
import Body from '../../../components/loginSignup/login/bodySignUp.jsx';

const LoginPage = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const darkLightToggleRef = useRef(null);
    const containerRef = useRef(null); 


    useEffect(() => {
        containerRef.current.classList.add('fade-in');
 
    }, []);

    return (
        <>
             <div ref={containerRef} className="pageContainer">
                <Header
                    darkLightToggleRef={darkLightToggleRef}
                    isDarkMode={isDarkMode}
                />
                <Body isDarkMode={isDarkMode} />
            </div>
            <div className="copyRight">Connect Inc. © 2024</div>
        </>
    );
};

export default LoginPage;