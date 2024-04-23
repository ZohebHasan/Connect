import React from 'react';
import styled from 'styled-components';

import VideoDark from './assets/background1DarkMonitor.mp4';
import VideoLight from './assets/background1LightMonitor.mp4'

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

const BackgroundAnimation: React.FC = () => {
    const {isDarkMode} = useDarkMode();
    return (
        <>
            <StyledVideo autoPlay loop muted playsInline controls={false} opacity={isDarkMode ? 0 : 1}>
                <source src={VideoLight} type="video/mp4" />
            </StyledVideo>
            <StyledVideo autoPlay loop muted playsInline controls={false} opacity={isDarkMode ? 1 : 0}>
                <source src={VideoDark} type="video/mp4" />
            </StyledVideo>
        </>
    );
}
export default BackgroundAnimation;


interface VideoProps {
    opacity: number;
}

const StyledVideo = styled.video<VideoProps>`
    width: 100%;
    height: 100%;
    z-index: 0;
    object-fit: cover;
    position: absolute;
    opacity: ${props => props.opacity};
    transition: opacity 0.5s ease;  // Smooth transition for opacity change
`;