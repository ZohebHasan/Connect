import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';


export interface Theme {
  bodyBackgroundColor: string;
  textColor: string;
  otherColor: string;  
}

const lightTheme: Theme = {
  bodyBackgroundColor: "rgb(245, 245, 245)",
  textColor: "black",
  otherColor: "#333",
};

const darkTheme: Theme = {
  // bodyBackgroundColor: "rgb(26, 16, 26)",
  bodyBackgroundColor: "rgb(0,0,0)",
  textColor: "white",
  otherColor: "#ddd",
};

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
    children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const theme: DefaultTheme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
          <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
          </DarkModeContext.Provider>
        </ThemeProvider>
    );
};

export const useDarkMode = (): DarkModeContextType => {
    const context = useContext(DarkModeContext);
    if (!context) throw new Error('useDarkMode must be used within a DarkModeProvider');
    return context;
};
