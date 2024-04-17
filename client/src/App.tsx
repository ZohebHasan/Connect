import Connect from './main/connect';
import { createGlobalStyle } from 'styled-components';
import { LanguageProvider } from './contexts/Language/Language.js'
import { DarkModeProvider } from './contexts/DarkMode/DarkMode';

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

const App: React.FC = () => {
  return (
    <>
      <LanguageProvider>
        <DarkModeProvider>
          <GlobalStyle/>
          <Connect/>
        </DarkModeProvider>
      </LanguageProvider>
    </>
  );
};

export default App;
