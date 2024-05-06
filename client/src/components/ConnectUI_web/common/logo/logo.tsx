import React from "react";
import styled from "styled-components";

import LogoDark from '../../../assets/logoDark.png';
import LogoLight from '../../../assets/logoLight.png'; 
import LogoNew from '../../../assets/logo.png'

import { useDarkMode } from "../../../../contexts/DarkMode/DarkMode";

const Logo: React.FC = () => {
    const {isDarkMode} = useDarkMode();
    return(
        // <StyledLogo src={isDarkMode ? LogoDark : LogoLight} alt="Logo"/>
        <StyledLogo src={LogoNew} alt="Logo"/>
    );
}

export default Logo;

const StyledLogo = styled.img`
    width: 3.5rem;
    opacity: 1;
    transition: transform 0.5s, opacity 0.5s;
    mix-blend-mode: multiply;
    background-color: transparent;

    @media (max-width: 1280px)  {
        width: 1.6rem; 
    }
`;
