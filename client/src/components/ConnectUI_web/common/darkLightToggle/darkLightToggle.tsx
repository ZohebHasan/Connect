import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useSidebar } from '../../../../contexts/SideBarOpen/SidebarContext';

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
      <Icon type="sun" $darkMode={isDarkMode}>&#9728;</Icon>
      <ToggleCircle $darkMode={isDarkMode}></ToggleCircle>
      <Icon type="moon" $darkMode={isDarkMode}>&#9789;</Icon>
    </ToggleContainer>
  );
};

export default DarkLightToggle;

const ToggleCircle = styled.div<{ $darkMode?: boolean }>`
  position: absolute;
  left: ${({ $darkMode }) => $darkMode ? 'auto' : '5px'};
  right: ${({ $darkMode }) => $darkMode ? '5px' : 'auto'};
  width: 21px;
  height: 21px;
  border-radius: 200px;
  background-color: ${({ $darkMode }) => $darkMode ? 'rgb(109, 109, 109)' : '#FDB813'};
  z-index: 6;
  transition: background-color 0.4s ease-in-out, left 0.2s ease-in-out, width 0.2s ease-in-out;

  &:hover{
    background-color: ${({ $darkMode }) => $darkMode ? '#FDB813' : 'darkgrey'};
  }
  &:active {
    background-color: darkgrey;
  }
`;

const ToggleContainer = styled.div<{ $darkMode?: boolean }>`
  width: 65px;
  height: 27px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $darkMode }) => $darkMode ? 'white' : 'black'};
  transition: background-color 0.3s ease-in-out;
  z-index: 5;

  &:hover ${ToggleCircle} {
    width: ${({ $darkMode }) => $darkMode ? '31px' : '29px'};
  }
`;

const Icon = styled.span<{ type: 'sun' | 'moon'; $darkMode?: boolean }>`
  font-size: 22px;
  z-index: 1;
  position: absolute;
  color: ${({ type, $darkMode }) => type === 'sun' ? ($darkMode ? 'black' : 'transparent') : 'white'};
  opacity: ${({ type, $darkMode }) => type === 'moon' && $darkMode ? '0' : '1'};
  right: ${({ type }) => type === 'moon' ? '7px' : 'auto'};
  left: ${({ type }) => type === 'sun' ? '5px' : 'auto'};
  transition: opacity 0.3s ease-in-out, color 0.3s ease-in-out;
`;

