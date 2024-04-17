import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

interface ToggleProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void; 
}

const DarkLightToggle = forwardRef<HTMLDivElement, ToggleProps>((props, ref) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ToggleContainer onClick={toggleDarkMode} ref={ref} darkMode={isDarkMode}>
      <Icon className="sun-icon" darkMode={isDarkMode}>&#9728;</Icon>
      <ToggleCircle darkMode={isDarkMode}></ToggleCircle>
      <Icon className="moon-icon" darkMode={isDarkMode}>&#9789;</Icon>
    </ToggleContainer>
  );
});

export default DarkLightToggle;

// Styled Components
const ToggleContainer = styled.div<ToggleProps>`
  width: 65px;
  height: 27px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease-in-out;
  z-index: 5;
  background-color: ${({ darkMode }) => darkMode ? 'white' : 'black'};

  &:hover .toggle-circle {
    width: 29px;
  }

  &:active .toggle-circle {
    background-color: rgb(109, 109, 109);
  }
`;

const ToggleCircle = styled.div<ToggleProps>`
  position: absolute;
  left: ${({ darkMode }) => darkMode ? 'auto' : '5px'};
  right: ${({ darkMode }) => darkMode ? '5px' : 'auto'};
  width: 21px;
  height: 21px;
  border-radius: 200px;
  background-color: #FDB813;
  z-index: 6;
  transition: background-color 0.2s ease-in-out, left 0.2s ease-in-out, width 0.2s ease-in-out;

  &:hover {
    background-color: darkgrey;
    width: 29px;
  }

  &:active {
    background-color: darkgrey;
  }
`;

const Icon = styled.span<{ className: string; darkMode?: boolean }>`
  font-size: 22px;
  z-index: 1;
  transition: opacity 0.3s ease-in-out, color 0.3s ease-in-out;
  position: absolute;
  color: ${({ className, darkMode }) => className === 'sun-icon' ? (darkMode ? 'black' : 'transparent') : 'white'};
  opacity: ${({ className, darkMode }) => className === 'moon-icon' && darkMode ? '0' : '1'};
  right: ${({ className }) => className === 'moon-icon' ? '7px' : 'auto'};
  left: ${({ className }) => className === 'sun-icon' ? '5px' : 'auto'};
`;
