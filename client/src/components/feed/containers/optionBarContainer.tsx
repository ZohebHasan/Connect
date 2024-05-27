import React, { useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSidebar } from '../../../contexts/SideBarOpen/SidebarContext';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

const Sidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isSidebarOpen, addProtectedRef, removeProtectedRef } = useSidebar();
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
      <LinksContainer $isSidebarOpen={isSidebarOpen}>
        {children}
      </LinksContainer>
    </StyledSidebar>
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

const StyledSidebar = styled.div<{ $isSidebarOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isSidebarOpen, $isDarkMode }) => css`
    opacity: ${$isSidebarOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
    transform: ${$isSidebarOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: opacity 0.5s ease-in-out;
    animation: ${!$isSidebarOpen && css`${fadeOutAndMove} 0.8s forwards`};
  `}
  height: 100%;
  /* width: 20.3rem; */
  /* border-top-right-radius: ${({ $isSidebarOpen }) => $isSidebarOpen ? '0%' : '50%'};
  border-top-left-radius: ${({ $isSidebarOpen }) => $isSidebarOpen ? '20px' : '50%'}; */
  /* border-bottom-left-radius: 20px; */
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  z-index: 5;
  transform-origin: bottom;
  top: auto;
  bottom: 0;
`;

const LinksContainer = styled.div<{ $isSidebarOpen?: boolean }>`
  opacity: ${({ $isSidebarOpen }) => $isSidebarOpen ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
