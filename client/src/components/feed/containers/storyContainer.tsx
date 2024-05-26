import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import { useStories } from '../../../contexts/stories/storiesContext';

const Sidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const { isStoriesPageOpen } = useStories();

  return (
    <StyledStoryBar $isSidebarOpen={isStoriesPageOpen} $isDarkMode={isDarkMode}>
      <ElementsContainer $isSidebarOpen={isStoriesPageOpen}>
        {children}
      </ElementsContainer>
    </StyledStoryBar>
  );
};

export default Sidebar;

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

const StyledStoryBar = styled.div<{ $isSidebarOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isSidebarOpen, $isDarkMode }) => css`
    opacity: ${$isSidebarOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
    transform: ${$isSidebarOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: opacity 0.5s ease-in-out;
    animation: ${!$isSidebarOpen && css`${fadeOutAndMove} 0.8s forwards`};
  `}
  height: 100%;
  width: 88.3rem;
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  z-index: 5;
  top: 0;
  bottom: auto;
`;

const ElementsContainer = styled.div<{ $isSidebarOpen?: boolean }>`
  opacity: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;
