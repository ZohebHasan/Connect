import styled from 'styled-components';

export const InputField = styled.input<{ $isDarkMode: boolean }>`
  padding: 1.125rem 0.9375rem; 
  width: 100%;
  border-radius: 0.625rem; /* 10px */
  border: ${({ $isDarkMode }) => $isDarkMode ? '0.05rem solid rgb(252, 105, 186)' : '0.09375rem solid rgb(254, 178, 224)'}; /* 0.8px and 1.5px */
  outline: none;
  font-size: 1.125rem; /* 18px */
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1); /* 4px 8px */
  transition: box-shadow 0.3s ease, border 0.3s ease;
  color: ${({ $isDarkMode }) => $isDarkMode ? '#FFF' : '#000'};  // Default text color based on theme

  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(72, 72, 72, 0.4)' : 'rgba(255, 255, 255, 0.4)'};

  &:focus {
    border-color: #ED1E79;
  }
`;

export const Label = styled.label<{ $isDarkMode: boolean }>`
  position: absolute;
  left: 0.9375rem; 
  top: 1.25rem; 
  transition: top 0.3s, font-size 0.3s;
  pointer-events: none;
  color: ${({ $isDarkMode }) => $isDarkMode ? '#c6c6c6' : '#686868'};
  font-size: 0.875rem; /* 14px */

  ${InputField}:focus + &,
  ${InputField}:not(:placeholder-shown) + & {  // Ensuring the label stays up if the input is not empty
    top: 0.1875rem; /* 3px */
    font-size: 0.75rem; /* 12px */
    color: #ED1E79;
  }
`;
