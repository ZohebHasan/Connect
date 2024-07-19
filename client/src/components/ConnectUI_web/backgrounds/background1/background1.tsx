import React from 'react';
import styled from 'styled-components';




import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

import VideoTransperant from "./assets/background1.webm"

const BackgroundAnimation: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    return (
        <>
            {/* <StyledVideo autoPlay loop muted playsInline controls={false} opacity={isDarkMode ? 0 : 1}>
                <source src={VideoLight} type="video/mp4" />
            </StyledVideo>
            <StyledVideo autoPlay loop muted playsInline controls={false} opacity={isDarkMode ? 1 : 0}>
                <source src={VideoDark} type="video/mp4" />
            </StyledVideo> */}

            <StyledVideo autoPlay loop muted playsInline controls={false}>
                <source src={VideoTransperant} type="video/mp4" />
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
    position: absolute;
`;