import styled from 'styled-components';

export const InputField = styled.input<{ $isDarkMode: boolean }>`
  padding: 0.8rem 0.9375rem; 
  width: 100%;
  border-radius: 2rem;
  border: ${({ $isDarkMode }) => $isDarkMode ? '0.05rem solid rgb(252, 105, 186)' : '0.09375rem solid rgb(254, 178, 224)'}; /* 0.8px and 1.5px */
  outline: none;
  font-size: 1.125rem; /* 18px */
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1); /* 4px 8px */
  transition: box-shadow 0.3s ease, border 0.3s ease;
  color: white;  // Default text color based on theme

  background-color: transparent;

  &:focus {
    border-color: #ED1E79;
  }
`;

export const Label = styled.label<{ $isDarkMode: boolean }>`
  position: absolute;
  left: 0.9375rem; 
  top: 1rem; 
  transition: top 0.3s, font-size 0.3s;
  pointer-events: none;
  color: #e9e9e9;
  font-size: 0.8rem; 
  font-weight: 300;

  ${InputField}:focus + &,
  ${InputField}:not(:placeholder-shown) + & {  // Ensuring the label stays up if the input is not empty
    top: 0.1875rem; /* 3px */
    font-size: 0.75rem; /* 12px */
    color: #ED1E79;
  }
`;
