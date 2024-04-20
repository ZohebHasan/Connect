import Connect from '../main/connect';
import { createGlobalStyle } from 'styled-components';
import { LanguageProvider } from '../contexts/Language/Language'
import { DarkModeProvider } from '../contexts/DarkMode/DarkMode';
import { SidebarProvider } from '../contexts/SideBarOpen/SidebarContext';


const App: React.FC = () => {
  return (
    <>
      <LanguageProvider>
        <DarkModeProvider>
          <SidebarProvider>
            <GlobalStyle/>
            <Connect/>
          </SidebarProvider>
        </DarkModeProvider>
      </LanguageProvider>
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