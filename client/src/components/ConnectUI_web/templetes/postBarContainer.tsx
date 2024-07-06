import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';


const ContentBarFullScreen: React.FC<{ children?: React.ReactNode; isOpen: boolean }> = ({ children , isOpen}) => {
  const { isDarkMode } = useDarkMode();


  return (
    <StyledContentBar $isContentBarFullScreenOpen={isOpen} $isDarkMode={isDarkMode}>
      <ElementsContainer $isContentBarFullScreenOpen={isOpen}>
        {children}
      </ElementsContainer>
    </StyledContentBar>
  );
};

export default ContentBarFullScreen;

const fadeOutAndMove = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const StyledContentBar = styled.div<{ $isContentBarFullScreenOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isContentBarFullScreenOpen, $isDarkMode }) => css`
    opacity: ${$isContentBarFullScreenOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
    transform: ${$isContentBarFullScreenOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: opacity 0.3s ease-in-out;
    animation: ${!$isContentBarFullScreenOpen && css`${fadeOutAndMove} 0.5s forwards`};
  `}
  height: 100%;
  width: 88.3rem;
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  z-index: 6;
  top: 0;
  bottom: auto;
`;

const ElementsContainer = styled.div<{ $isContentBarFullScreenOpen?: boolean }>`
  opacity: ${({ $isContentBarFullScreenOpen }) => ($isContentBarFullScreenOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;
