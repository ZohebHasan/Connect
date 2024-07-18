import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';

import CloseDark from "../../../../../assets/closeDark.png";
import CloseLight from "../../../../../assets/closeLight.png";

import { useCreateBar } from '../../../../../../contexts/leftBar/createBarContext';

const CloseButton: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const {closeCreateBar} = useCreateBar();


  return (
    <CloseIcon src={isDarkMode ? CloseDark : CloseLight} onClick={closeCreateBar}/>
  );
};

export default CloseButton;

const CloseIcon = styled.img`
  width: 1.4rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  &:active {
    opacity: 0.9;
    transform: scale(0.95);
  }
`;
