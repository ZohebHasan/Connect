import Connect from './main/connect.js';
import {LanguageProvider} from './contexts/Language.js'
import { DarkModeProvider } from './contexts/DarkMode.js';

export default function App() {
  return (
      <LanguageProvider>
        <DarkModeProvider>
            <Connect/>  
        </DarkModeProvider>
      </LanguageProvider>  
    
  );
}


