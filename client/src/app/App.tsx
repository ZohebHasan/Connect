import React, { useEffect } from 'react';
import Connect from '../main/connect';
import { createGlobalStyle } from 'styled-components';
import { LanguageProvider } from '../contexts/Language/Language'
import { DarkModeProvider } from '../contexts/DarkMode/DarkMode';
import { SidebarProvider } from '../contexts/SideBarOpen/SidebarContext';
import { AuthProvider } from '../contexts/authentication/authContext';
import { scheduleTokenRefresh } from '../services/authHelpers';


const App: React.FC = () => {
  useEffect(() => {
    scheduleTokenRefresh();
  }, []);

  return (
    <>
      <AuthProvider>
        <LanguageProvider>
          <DarkModeProvider>
              <SidebarProvider>
                <GlobalStyle />
                <Connect />
              </SidebarProvider>
          </DarkModeProvider>
        </LanguageProvider>
      </AuthProvider>
    </>
  );
};

export default App;


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bodyBackgroundColor};
    color: ${(props) => props.theme.textColor};
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    transition: background-color 0.3s;
  }
  p, a {
    margin: 0;
    padding: 0;
  }
`;