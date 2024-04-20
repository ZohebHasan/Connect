import React from 'react';
import styled from 'styled-components';

import Video from './assets/background1DarkMonitor_.mp4';


const BackgroundAnimation: React.FC = () => {
    return (
        <>
            <StyledVideo autoPlay loop muted playsInline controls={false}>
                <source src={Video} type="video/mp4" />
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