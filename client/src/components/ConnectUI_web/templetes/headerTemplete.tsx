import React from 'react';
import styled from 'styled-components';
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
    height: 3.125rem; 
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: background-color 0.1s ease-in-out;
    position: relative;
    z-index: 3;
    background-color: ${({ $isDarkMode, $variant }) => getBackgroundColor($isDarkMode, $variant)};
    margin-top: ${({ $variant }) => ($variant === "visible" ? "0.9375rem" : "0")};
  

    @media (max-width: 1280px) {
      height: 2.2rem; 
      margin-top: ${({ $variant }) => ($variant === "visible" ? "1rem" : "0")}; 
    }
  `;
  

  const getBackgroundColor = ($isDarkMode: boolean, $variant: "visible" | "hidden"): string => {
    if ($variant === "hidden") {
      return "transparent";
    }
    return $isDarkMode ? "rgba(52, 52, 52, 0.4)" : "rgba(212, 197, 216, 0.5)";
  };
  