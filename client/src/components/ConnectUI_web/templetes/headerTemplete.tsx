import React from 'react';
import styled, { css } from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

interface HeaderContainerProps {
    children: React.ReactNode;  
    variant: "visible" | "hidden"; 
}

const Header: React.FC<HeaderContainerProps> = ({children, variant }) => {
    const {isDarkMode} = useDarkMode();

    return (
        <HeaderContainer $isDarkMode = {isDarkMode} $variant={variant}>
            {children}
        </HeaderContainer>
    );
  }
  
  export default Header;
  

const HeaderContainer = styled.div<{ $isDarkMode: boolean; $variant: "visible" | "hidden" }>`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: background-color 0.1s ease-in-out;
  margin-top: 15px;
  position: relative;
  z-index: 3;

  // Use both isDarkMode and variant to conditionally apply styles
  background-color: ${({ $isDarkMode, $variant }) => {
     if($variant === "visible"){
        return $isDarkMode? "rgba(52, 52, 52, 0.4)" : "rgba(255, 255, 255, 0.5)";
     }
  }};
  `;
