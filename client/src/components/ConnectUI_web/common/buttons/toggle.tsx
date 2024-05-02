import React, { useState } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';


interface ToggleProps{
    isOn: boolean;
    toggleOn: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isOn, toggleOn }) => {
  const { isDarkMode} = useDarkMode();


  return (
    <ToggleContainer $darkMode={isDarkMode} $isOn={isOn} onClick={toggleOn}>
      <ToggleCircle $darkMode={isDarkMode} $isOn={isOn}></ToggleCircle>
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleCircle = styled.div<{ $darkMode?: boolean, $isOn: boolean }>`
  position: absolute;
  left: ${({ $isOn }) => $isOn ? 'auto' : '5px'};
  right: ${({ $isOn }) => $isOn ? '5px' : 'auto'};
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 1rem;
  background-color: white; 
  transition:left 0.2s ease-in-out, width 0.2s ease-in-out;

  &:hover{
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  }
  
  @media (max-width: 1280px) { 
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const ToggleContainer = styled.div<{ $darkMode?: boolean, $isOn: boolean }>`
  width: 4.2rem;
  height: 2.2rem;
  border-radius: 1.2rem;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $darkMode, $isOn }) => 
        $isOn ? ($darkMode ? 'rgb(47, 192, 47)' : 'rgb(23, 185, 23)') : ($darkMode ? 'rgb(134, 134, 134)' : 'rgb(199, 195, 195)')};
  transition: background-color 0.3s ease-in-out;
  z-index: 5;

  &:hover ${ToggleCircle} {
    width: 2.1rem;
  }
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);


  @media (max-width: 1280px) { 
    width: 3rem;
    height: 1.5rem;
    &:hover ${ToggleCircle} {
      width: 1.4rem;
    }
  }
`;


