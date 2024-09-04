import React from 'react';
import styled from 'styled-components';



import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import LoadingVideo from "./loadingAnimation.webm"

const LoadingComponent: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    return (

            <StyledVideo autoPlay loop muted playsInline controls={false}>
                <source src={LoadingVideo} type="video/mp4" />
            </StyledVideo> 
    );
}
export default LoadingComponent;




const StyledVideo = styled.video`
    width: 20%;
    height: 20%;
    z-index: 20;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;