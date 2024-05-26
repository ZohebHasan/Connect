import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import { useStoriesPage } from '../../../contexts/stories/storiesContext';

const Sidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const {isStoriesPageOpen } = useStoriesPage();

 

  return (

    <StyledStoryBar $isSidebarOpen={isStoriesPageOpen} $isDarkMode={isDarkMode}>
   
      <ElementsContainer $isSidebarOpen={isStoriesPageOpen}>
        {children} 
      </ElementsContainer>
    </StyledStoryBar>
  );
};

export default Sidebar;

const StyledStoryBar = styled.div<{ $isSidebarOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isSidebarOpen, $isDarkMode }) => `
    height: ${$isSidebarOpen ? '100%' : '0'};
    width: 88.3rem;
    // border-bottom-right-radius: ${$isSidebarOpen ? '0%' : '100%'};
    // border-bottom-left-radius: ${$isSidebarOpen ? '0%' : '100%'};
    transform: scaleY(${$isSidebarOpen ? '1' : '0'});
    opacity: ${$isSidebarOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
  `}
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  transition: height 0.7s ease-out, transform 0.7s ease-out, opacity 0.8s ease-in-out, border-radius 0.8s ease-out;
  display: flex;
  flex-direction: column;
  z-index: 5;
  transform-origin: top;
  top: 0;  
  bottom: auto;   
`;



const ElementsContainer = styled.div<{ $isSidebarOpen?: boolean }>`
    opacity: ${({ $isSidebarOpen }) => $isSidebarOpen ? 1 : 0}; 
    transition: opacity 0.3s ease-in-out; 
    
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    // background-color:red;
    position: relative;
   
   
`;
