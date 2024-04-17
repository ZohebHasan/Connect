import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Header from '../../../components/loginSignup/selectLanguage/headerSelectLang';
import Background1 from '../../../components/loginSignup/selectLanguage/background/backgroundSelectLang';
import Body from '../../../components/loginSignup/selectLanguage/bodySelectLang';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import Copyright from '../../../components/elements/copyright/Copyright';


const PageContainer = styled.div<{ fadeIn: boolean }>`
  margin: 15px;
  width: calc(100vw - 30px);
  height: calc(100vh - 40px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: auto;
  opacity: 0;
  transition: opacity 0.5s ease;
  ${({ fadeIn }) => fadeIn && css`
    opacity: 1;
  `}
`;

const SelectLanguagePage: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);
    const darkLightToggleRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isSidebarOpen && event.target instanceof Node) {
                const outsideSidebar = sidebarRef.current && !sidebarRef.current.contains(event.target);
                const outsideToggle = toggleRef.current && !toggleRef.current.contains(event.target);
                const outsideDarkLightToggle = darkLightToggleRef.current && !darkLightToggleRef.current.contains(event.target);

                if (outsideSidebar && outsideToggle && outsideDarkLightToggle) {
                    setSidebarOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);

    return (
        <>
            <PageContainer ref={containerRef} fadeIn={true}>
                <Background1 />
                <Header
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                    darkLightToggleRef={darkLightToggleRef}
                    sidebarRef={sidebarRef}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    toggleRef={toggleRef} 
                />
                <Body/> {/*isSidebarOpen={isSidebarOpen}*/}
            </PageContainer>
            <Copyright isDarkMode={isDarkMode} />
        </>
    );
};

export default SelectLanguagePage;
