import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/loginSignup/login/headerLogin.jsx';
import Body from '../../components/loginSignup/login/bodyLogin.jsx';

const LoginPage = () => {
    const [isDarkMode, setDarkMode] = useState(false);
    const darkLightToggleRef = useRef(null);
    const containerRef = useRef(null); 


    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode); 
    };

    useEffect(() => {
        containerRef.current.classList.add('fade-in');
 
    }, []);

    return (
        <>
             <div ref={containerRef} className="pageContainer">
               
                <Header
                    darkLightToggleRef={darkLightToggleRef}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />
                <Body isDarkMode={isDarkMode} />
            </div>
            <div className="copyRight">Connect Inc. © 2024</div>
        </>
    );
};

export default LoginPage;