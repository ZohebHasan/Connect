import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSidebar } from '../../../contexts/SideBarOpen/SidebarContext';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

const Sidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isSidebarOpen, addProtectedRef ,removeProtectedRef  } = useSidebar();
  const { isDarkMode } = useDarkMode();
  const sideBarRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (sideBarRef.current) {
      addProtectedRef(sideBarRef);
    }
    
    return () => {
      if (sideBarRef.current) {
        removeProtectedRef(sideBarRef);
      }
    };
  }, [addProtectedRef, removeProtectedRef]);
 

  return (
    <StyledSidebar ref={sideBarRef} $isSidebarOpen={isSidebarOpen} $isDarkMode={isDarkMode}>
      <EmptySpace />
      <LinksContainer $isSidebarOpen={isSidebarOpen}>
        {children}
      </LinksContainer>
    </StyledSidebar>
  );
};

export default Sidebar;



const StyledSidebar = styled.div<{ $isSidebarOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isSidebarOpen, $isDarkMode }) => `
    height: ${$isSidebarOpen ? 'calc(100% - 15px)' : '0'};
    width: 300px;
    border-bottom-right-radius: ${$isSidebarOpen ? '0%' : '50%'};
    border-bottom-left-radius: ${$isSidebarOpen ? '0%' : '50%'};
    transform: scaleY(${$isSidebarOpen ? '1' : '0'});
    opacity: ${$isSidebarOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.5)' : 'rgba(177, 177, 177, 0.5)'};
  `}
  position: absolute;
  top: 15px;
  right: 0;
  backdrop-filter: blur(10px);
  overflow-x: hidden;
  transition: height 0.5s ease-out, transform 0.5s ease-out, opacity 0.5s ease-in-out, border-radius 0.5s ease-out;
  display: flex;
  flex-direction: column;
  z-index: 2;
  transform-origin: top;
  margin-right: 15px;
  @media (max-width: 650px) {
    width: ${({ $isSidebarOpen }) => $isSidebarOpen ? '200px' : '300px'};
  }
`;


const EmptySpace = styled.div`
    height: 70px;
`;

const LinksContainer = styled.div<{ $isSidebarOpen?: boolean }>`
    opacity: ${({ $isSidebarOpen }) => $isSidebarOpen ? 1 : 0}; 
    transition: opacity 0.3s ease-in-out; 
`;
