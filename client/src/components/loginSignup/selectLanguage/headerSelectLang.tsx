import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import LogoDark from '../../assets/logoDark.png';
import LogoLight from '../../assets/logoLight.png'; 

import DarkLightToggle from '../../elements/darkLightToggle/darkLightToggle';
import Sidebar from '../smallComponents/sideBar';


interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  darkLightToggleRef: React.RefObject<HTMLDivElement>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleRef: React.RefObject<HTMLDivElement>;
  sidebarRef: React.RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar, 
  isSidebarOpen, 
  darkLightToggleRef, 
  isDarkMode, 
  toggleDarkMode, 
  toggleRef,
  sidebarRef
}) => {

    return (
        <>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} />
          <SelectLangHeader>
              <Logo>
                  <img src={isDarkMode ? LogoDark : LogoLight} alt="Logo" />
              </Logo>
              <ToggleBar ref={darkLightToggleRef}>
                  <DarkLightToggle darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              </ToggleBar>
              <OptionBar ref={toggleRef} onClick={toggleSidebar}>
                  <div className={`icon ${isSidebarOpen ? 'open' : 'closed'}`}>
                      {isSidebarOpen ? '×' : '☰'}
                  </div>            
              </OptionBar>
          </SelectLangHeader>
        </>
    );
};

export default Header;

const SelectLangHeader = styled.div<{ isDarkMode?: boolean }>
`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color 0.1s ease-in-out; 
  margin-top: 15px;
  position: relative;
  z-index: 3;
  ${({ isDarkMode }) => isDarkMode ? css`
    background-color: rgba(52, 52, 52, 0.4);
  ` : css`
    background-color: rgba(255, 255, 255, 0.5);
  `}
`;

const Logo = styled.div
`
  flex: 8;
  align-items: center;
  position: relative;
  background-color: transparent;
  padding-left: 20px;
  z-index: 3;

  img {
    width: 40px;
    height: auto;
    opacity: 1;
    transition: transform 0.5s, opacity 0.5s;
    mix-blend-mode: multiply;
    background-color: transparent;
  }
`;

const ToggleBar = styled.div
`
  flex: 3;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
`;

const OptionBar = styled.div
`
  flex: 1;
  padding: 0px 20px 0px 5px;
`;
