import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bodyBackgroundColor: string;
    textColor: string;
    otherColor: string;  // Ensure all properties used are declared.
  }
}