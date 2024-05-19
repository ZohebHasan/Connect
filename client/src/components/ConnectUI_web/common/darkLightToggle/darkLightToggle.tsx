import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useSidebar } from '../../../../contexts/SideBarOpen/SidebarContext';

import Sun from "./assets/sun.png"
import Moon from "./assets/moon.png"

const DarkLightToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { addProtectedRef, removeProtectedRef } = useSidebar();
  const darkLightToggleRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (darkLightToggleRef.current) {
      addProtectedRef(darkLightToggleRef);
    }
    
    return () => {
      if (darkLightToggleRef.current) {
        removeProtectedRef(darkLightToggleRef);
      }
    };
  }, [addProtectedRef, removeProtectedRef]);


  return (
    <ToggleContainer onClick={toggleDarkMode} $darkMode={isDarkMode} ref={darkLightToggleRef}>
      <SunIcon src = {Sun} $darkMode={isDarkMode}/>
      <ToggleCircle $darkMode={isDarkMode}></ToggleCircle>
      <MoonIcon src = {Moon} $darkMode={isDarkMode}/>
    </ToggleContainer>
  );
};

export default DarkLightToggle;


const ToggleCircle = styled.div<{ $darkMode?: boolean }>`
  position: absolute;
  left: ${({ $darkMode }) => $darkMode ? 'auto' : '0.3125rem'}; 
  right: ${({ $darkMode }) => $darkMode ? '0.3125rem' : 'auto'}; 
  width: 1.3125rem; 
  height: 1.3125rem; 
  border-radius: 200px; 
  background-color: ${({ $darkMode }) => $darkMode ? 'rgb(109, 109, 109)' : '#FDB813'};
  z-index: 6;
  transition: background-color 0.4s ease-in-out, left 0.2s ease-in-out, width 0.2s ease-in-out;

  &:hover {
    background-color: ${({ $darkMode }) => $darkMode ? '#FDB813' : 'darkgrey'};
  }
  &:active {
    background-color: darkgrey;
  }

  @media (max-width: 1280px) { 
    width: 1rem; 
    height: 1rem; 
  }
`;



const ToggleContainer = styled.div<{ $darkMode?: boolean }>`
  width: 4rem;  
  height: 1.6875rem;  
  border-radius: 1.25rem;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $darkMode }) => $darkMode ? 'white' : 'black'};
  transition: background-color 0.3s ease-in-out;
  z-index: 5;

  &:hover ${ToggleCircle} {
    width: ${({ $darkMode }) => $darkMode ? '1.9375rem' : '1.8125rem'}; 
  }

  @media (max-width: 1280px) { 
    width: 3rem; 
    height: 1.25rem;  

    &:hover ${ToggleCircle} {
      width: ${({ $darkMode }) => $darkMode ? '1.3rem' : '1.3rem'};
    }
  }
`;


const SunIcon = styled.img<{ $darkMode?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  background-size: cover;
  position: absolute;
  right: : auto;
  left: 0.3125rem;
  // top: 0.3rem;
  transition: opacity 0.3s ease-in-out;

  @media (max-width: 1280px) {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

const MoonIcon = styled.img<{ $darkMode?: boolean }>`
  width: 1.03rem;
  height: 1.03rem;
  background-size: cover;
  position: absolute;
  right: 0.4375rem;
  left: auto;
  // top: 0.3rem;
  transition: opacity 0.3s ease-in-out;

  @media (max-width: 1280px) {
    width: 1.1rem;
    height: 1.1rem;
  }
`;