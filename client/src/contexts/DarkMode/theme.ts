export interface Theme {
    bodyBackgroundColor: string;
    textColor: string;
    otherColor: string;  
  }
  
  export const lightTheme: Theme = {
    bodyBackgroundColor: "rgb(230, 230, 230)",
    textColor: "black",
    otherColor: "#333",
  };
  
  export const darkTheme: Theme = {
    bodyBackgroundColor: "rgb(26, 16, 26)",
    textColor: "white",
    otherColor: "#ddd",
  };
  