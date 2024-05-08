import styled  from 'styled-components';

export const InputField = styled.input<{ $isDarkMode: boolean }>`
  padding: 18px 15px;
  width: 100%;
  border-radius: 10px;
  border: ${({ $isDarkMode }) => $isDarkMode ? '2px solid rgb(252, 105, 186)' : '2px solid rgb(254, 178, 224)'};
  outline: none;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border 0.3s ease;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(255, 251, 254)'};

  &:focus {
    border-color: #ED1E79;
  }
`;

export const Label = styled.label<{ $isDarkMode: boolean }>`
  position: absolute;
  left: 15px;
  top: 20px;
  transition: top 0.3s, font-size 0.3s;
  pointer-events: none;
  color: ${({ $isDarkMode }) => $isDarkMode ? '#373737' : '#686868'};
  font-size: 14px;

  ${InputField}:focus + &,
  ${InputField}:not(:placeholder-shown) + & {  // Ensuring the label stays up if the input is not empty
    top: 3px;
    font-size: 12px;
    color: #ED1E79;
  }
`;
