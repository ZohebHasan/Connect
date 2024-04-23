import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

//Will Change later when the animation is ready.
const ConnaButton: React.FC = () => {
  const {isDarkMode} = useDarkMode();

  return(
        <Conna $isDarkMode = {isDarkMode}> ConnaTemp </Conna>
  );
   
};

export default ConnaButton;



const Conna = styled.button <{$isDarkMode: boolean}>`
  padding: 10px;
  background-color:  ${({ $isDarkMode }) => $isDarkMode ? 'white' : '#212121'};
  border: 1px solid #ccc; // Example styling
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: pink;
  }
`;