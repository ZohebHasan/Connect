import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSidebar } from '../../../contexts/SideBarOpen/SidebarContext';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

const Sidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isDarkMode } = useDarkMode();

 

  return (

    <StyledStoryBar $isSidebarOpen={true} $isDarkMode={isDarkMode}>
   
      <ElementsContainer $isSidebarOpen={true}>
        {children} 
      </ElementsContainer>
    </StyledStoryBar>
  );
};

export default Sidebar;

const StyledStoryBar = styled.div<{ $isSidebarOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isSidebarOpen, $isDarkMode }) => `
    height: ${$isSidebarOpen ? '100%' : '0'};
    width: 88.5rem;
    border-top-right-radius: ${$isSidebarOpen ? '0%' : '50%'};
    border-top-left-radius: ${$isSidebarOpen ? '20px' : '50%'};
    transform: scaleY(${$isSidebarOpen ? '1' : '0'});
    opacity: ${$isSidebarOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
  `}
  border-bottom-left-radius: 20px ;
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  transition: height 0.7s ease-out, transform 0.7s ease-out, opacity 0.8s ease-in-out, border-radius 0.8s ease-out;
  display: flex;
  flex-direction: column;
  z-index: 5;
  transform-origin: bottom;
  top: auto;  
  bottom: 0;   
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
   
   
`;
