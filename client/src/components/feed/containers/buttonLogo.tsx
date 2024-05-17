import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../../../contexts/DarkMode/DarkMode";
import Text from "../../ConnectUI_web/common/texts/static";

interface LogoProps {
    darkModeLogo: string;
    lightModeLogo: string;
    activeLightLogo: string;
    activeDarkLogo: string;
    size?: number;
    isActive: boolean;
}

const Logo: React.FC<LogoProps> = ({
    darkModeLogo,
    lightModeLogo,
    activeLightLogo,
    activeDarkLogo,
    isActive,
    size

}) => {
    const { isDarkMode } = useDarkMode();

    return (
        <LogoContainer>
            <MainLogoContainer $size = {size}>
                <MainLogo style={{ opacity: isActive ? 0 : 1 }}>
                    <StyledLogo src={isDarkMode ? darkModeLogo : lightModeLogo} alt="Logo" /> 
                </MainLogo>
                <MainLogo style={{ opacity: isActive ? 1 : 0 }}>
                    <StyledLogo src={isDarkMode ? activeDarkLogo : activeLightLogo} alt="Logo" /> 
                </MainLogo>
            </MainLogoContainer>
        </LogoContainer>
    );
};

export default Logo;


const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const MainLogoContainer = styled.div<{ $size?: number }>`
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: ${({ $size }) => $size ? `${$size}rem` : '2rem'}; 
    height: ${({ $size }) => $size ? `${$size}rem` : '2rem'}; 
    z-index: 1;

    @media (max-width: 1280px) {
        width: ${({ $size }) => $size ? `${$size * 0.8}rem` : '1.6rem'};  
        height: ${({ $size }) => $size ? `${$size * 0.8}rem` : '1.6rem'};
    }
`;


const MainLogo = styled.div`
    position: absolute;
    transition: opacity 0.25s ease-in-out;
    top: 0;
    left: 0;
    width: 100%; 
    height: 100%;  
`;

const StyledLogo = styled.img`
    width: 100%; 
    height: auto;
    transition: all 0.5s ease-in-out;
    mix-blend-mode: multiply;
    background-color: transparent;
`;
