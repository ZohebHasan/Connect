import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useSidebar } from '../../../../contexts/SideBarOpen/SidebarContext';

import CloseLight from "./assets/closeLight.png"
import CloseDark from "./assets/closeDark.png"
import OptionDark from "./assets/optionDark.png"
import OptionLight from "./assets/optionLight.png"


const OptionButton: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { isSidebarOpen, toggleSidebar, addProtectedRef, removeProtectedRef } = useSidebar();
  const optionBtnRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (optionBtnRef.current) {
      addProtectedRef(optionBtnRef);
    }

    return () => {
      if (optionBtnRef.current) {
        removeProtectedRef(optionBtnRef);
      }
    };
  }, [optionBtnRef, addProtectedRef, removeProtectedRef]);

  const iconSrc = isSidebarOpen
    ? (isDarkMode ? CloseDark : CloseLight)
    : (isDarkMode ? OptionDark : OptionLight);

  const altText = isSidebarOpen ? 'Close' : 'Open';

  return (
    <StyledIcon 
      onClick={toggleSidebar}
      src={iconSrc}
      alt={altText}
      ref={optionBtnRef}
    />
  );
};

export default OptionButton;


const StyledIcon = styled.img`
  cursor: pointer;
  width: 1.7rem;
  height: 1.7rem;
  transition: opacity 0.3s ease-in-out;  // Use opacity for smoother visual transitions
  display: flex;  // Ensure the image doesn't have extra space below it


  @media (max-width: 1280) { 
    width: 1.3rem;
    height: 1.3rem;
  }
`;



