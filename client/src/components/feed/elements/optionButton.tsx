import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import Text from '../../ConnectUI_web/common/texts/static';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import { useSidebar } from '../../../contexts/SideBarOpen/SidebarContext';

import CloseLight from "../assets/closeLight.png"
import CloseDark from "../assets/closeDark.png"
import OptionDark from "../assets/optionDark.png"
import OptionLight from "../assets/optionLight.png"

const Option: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const {addProtectedRef, toggleSidebar, removeProtectedRef, isSidebarOpen } = useSidebar();
    const optionBtnRef = useRef<HTMLImageElement>(null);
  
    const openSideBar  = () =>{
          toggleSidebar();
    }
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
        <OptionButtonContainer $isDarkMode={isDarkMode}  onClick={toggleSidebar} ref={optionBtnRef}>
            <ButtonWrapper>
                <StyledIcon 
                    src={iconSrc}
                    alt={altText}
                />
                <Text size={"1.2rem"} fontWeight={"300"}>
                  {isSidebarOpen ?"Close" : "Options"}
                 </Text> 
            </ButtonWrapper>   
        </OptionButtonContainer>
    );
};

export default Option;

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



const ButtonWrapper = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
`;

const OptionButtonContainer = styled.div<{$isDarkMode: boolean}>`
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 90%;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    margin: 0.5rem 0rem;
    cursor: pointer; 
    transition: transform 0.2s ease-in-out, color 0.3s, opacity 0.3s ease-in-out;
    position: relative;
    z-index: 6;
    &:hover {
      background-color: ${({ $isDarkMode }) => $isDarkMode ? '#565454' : '#a0a0a0'};
      opacity: 0.7;
      transform: scale(1.05);
    }
  
    &:active {
      background-color: ${({ $isDarkMode }) => $isDarkMode ? '#919191' : '#595858'};
      transform: scale(1.00);
    }
`;
