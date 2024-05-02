import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useSidebar } from '../../../../contexts/SideBarOpen/SidebarContext';

const OptionButton: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { isSidebarOpen, toggleSidebar, addProtectedRef, removeProtectedRef} = useSidebar();  
  const optionBtnRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (optionBtnRef.current) {
      addProtectedRef(optionBtnRef);
    }
    
    return () => {
      if (optionBtnRef.current) {
        removeProtectedRef(optionBtnRef);
      }
    };
  }, [addProtectedRef, removeProtectedRef]);

  return (
    <Icon 
      onClick={toggleSidebar} 
      $isSidebarOpen={isSidebarOpen}
      $isDarkMode={isDarkMode}
      ref = {optionBtnRef}
    />
  );
};

export default OptionButton;





const Icon = styled.div<{ $isSidebarOpen: boolean, $isDarkMode: boolean }>`
  cursor: pointer;
  width: 3.75rem;  
  height: 3.75rem;  
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;  
  transition: color 0.3s, opacity 0.3s ease-in-out;
  color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
  position: relative;
  z-index: 5;

  &:before {
    content: '${({ $isSidebarOpen }) => $isSidebarOpen ? '×' : '☰'}'; 
  }

  @media (max-width: 80rem) { 
    width: 3.5rem;  
    height: 3.5rem;  
    font-size: 1.3rem; 
  }
`;
