import Connect from './main/connect.js';
import {LanguageProvider} from './contexts/Language.js'

export default function App() {
  return (
      <LanguageProvider>
        <Connect/>  
      </LanguageProvider>  
    
  );
}


