import React from "react";
import styled from "styled-components";

import LogoDark from '../../../assets/logoDark.png';
import LogoLight from '../../../assets/logoLight.png'; 
import LogoNew from '../../../assets/logo.png'

import { useDarkMode } from "../../../../contexts/DarkMode/DarkMode";
import Text from "../texts/static"

const Logo: React.FC = () => {
    const {isDarkMode} = useDarkMode();
    return(
        // <StyledLogo src={isDarkMode ? LogoDark : LogoLight} alt="Logo"/>
        <LogoContainer>
            <StyledLogo src={LogoNew} alt="Logo"/>
            <Text size = {"1.5rem"} fontWeight = {"300"}> Connect </Text>
        </LogoContainer>
         
        
     
    );
}

export default Logo;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:center;
    gap: 0.7rem;
`
const StyledLogo = styled.img`
    width: 3.2rem;
    opacity: 1;
    transition: transform 0.5s, opacity 0.5s;
    mix-blend-mode: multiply;
    background-color: transparent;

    @media (max-width: 1280px)  {
        width: 1.6rem; 
    }
`;
