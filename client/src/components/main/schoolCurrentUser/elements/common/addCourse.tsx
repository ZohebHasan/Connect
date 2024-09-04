import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

import CreateDark from "../../../../assets/createDarkActive.png";
import CreateLight from "../../../../assets/createLightActive.png";

interface HeaderProps {
  type: 'org' | 'course';
  onClick?: () => void; // Add the onClick prop
  position: 'end' | 'center';
}

const Header: React.FC<HeaderProps> = ({ type, onClick, position }) => {
  const { isDarkMode } = useDarkMode();

  const getButtonText = () => {
    switch (type) {
      case 'org':
        return 'Join or create a club/organization';
      case 'course':
      default:
        return 'Join or create a course';
    }
  };

  return (
    <ButtonsContainer $position = {position}>
      <CreateButton $isDarkMode={isDarkMode} onClick={onClick}>
        <CreateIcon src={isDarkMode ? CreateDark : CreateLight} />
        <Text variant="normal" size="1rem" fontWeight="200">
          {getButtonText()}
        </Text>
      </CreateButton>
    </ButtonsContainer>
  );
};

export default Header;

const CreateButton = styled.div<{ $isDarkMode: boolean }>`
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff73' : 'black')}; 
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.04);
  }
  &:active {
    transform: scale(0.99);
  }
  background-color: #ffffff2b;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const ButtonsContainer = styled.div<{$position: 'end' | 'center'}>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: ${({ $position }) => ($position === 'end' ? 'flex-end' : 'center')};
  margin-top: 1rem;
  gap: 1rem;
  /* background-color: red; */
`;

const CreateIcon = styled.img`
  width: 1.2rem;
`;