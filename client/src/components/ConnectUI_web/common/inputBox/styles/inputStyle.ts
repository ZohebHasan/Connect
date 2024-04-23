import styled  from 'styled-components';

export const InputField = styled.input<{ $isDarkMode: boolean }>`
  padding: 20px 15px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(253, 211, 255, 0.879);
  outline: none;
  font-size: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border 0.3s ease;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(251, 243, 250, 0.681)' : 'rgba(255, 255, 255, 0.646)'};

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
  color: ${({ $isDarkMode }) => $isDarkMode ? '#505050' : '#8d8d8d'};

  ${InputField}:focus + &,
  ${InputField}:not(:placeholder-shown) + & {  // Ensuring the label stays up if the input is not empty
    top: 3px;
    font-size: 12px;
    color: #ED1E79;
  }
`;
