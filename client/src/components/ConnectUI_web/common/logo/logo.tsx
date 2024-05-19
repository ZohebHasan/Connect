import React from "react";
import styled from "styled-components";
import LogoNew from '../../../assets/logo.png';
import { useDarkMode } from "../../../../contexts/DarkMode/DarkMode";
import Text from "../texts/static";

const Logo: React.FC<{size?: number}> = ({ size = 1.5 }) => {  // Set default size
    const { isDarkMode } = useDarkMode();
    return (
        <LogoContainer>
            <StyledLogo src={LogoNew} alt="Logo" size={size} />
            <Text size={`${size * 1.0}rem`} fontWeight={"300"}>Connect</Text>  
        </LogoContainer>
    );
}

export default Logo;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
`;

const StyledLogo = styled.img<{ size: number }>`
    width: ${({ size }) => `${(size * 2.0) + 0.2}rem`};  
    // transition: transform 0.5s, opacity 0.5s;
    // mix-blend-mode: multiply;
    // background-color: transparent;

    @media (max-width: 1280px) {
        width: ${({ size }) => `${size * 1.0}rem`};  // Smaller size on narrow screens
    }
`;
