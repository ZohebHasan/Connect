import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import styled from 'styled-components';

import Intro from "./assets/dark/introV2.mp4";
import { useDarkMode } from '../../contexts/DarkMode/DarkMode';

const BackgroundAnimation: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/selectLanguage');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <StyledVideo autoPlay loop muted playsInline controls={false}>
                <source src={Intro} type="video/mp4" />
            </StyledVideo>
        </>
    );
}

export default BackgroundAnimation;

const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    z-index: 0;
    object-fit: cover;
`;
