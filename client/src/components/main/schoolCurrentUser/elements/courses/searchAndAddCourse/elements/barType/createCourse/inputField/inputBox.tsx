import React, { useState } from 'react';
import styled from 'styled-components';

import { InputField, Label } from './styles/inputStyle';
import InputContainer from './containers/inputContainer';
import { useDarkMode } from '../../../../../../../../../../contexts/DarkMode/DarkMode';

import SearchIconDark from "../../../../../../../../../assets/searchDark.png";
import SearchIconLight from "../../../../../../../../../assets/searchLight.png";

interface InputFieldProps {
  id: string;
  label: string;
  width?: string;
  value: string;
  onChange: (value: string) => void;
  isSearchBox: boolean;
}

const InputFieldComponent: React.FC<InputFieldProps> = ({ id, label, value, onChange, width, isSearchBox }) => {
  const { isDarkMode } = useDarkMode();
  const [hasText, setHasText] = useState(value.length > 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setHasText(newValue.length > 0);
    onChange(newValue);
  };

  return (
    <InputContainer width={width}>
      <InputField
        type="text"
        id={id}
        $isDarkMode={isDarkMode}
        placeholder=""
        value={value}
        onChange={handleChange}
      />
      <Label htmlFor={id} $isDarkMode={isDarkMode}>
        {label}
      </Label>
      {isSearchBox && hasText && (
        <SearchButton>
          <SearchIconImg src={isDarkMode ? SearchIconDark : SearchIconLight} alt="Search" />
        </SearchButton>
      )}

    </InputContainer>
  );
};

export default InputFieldComponent;

export const SearchButton = styled.button`
  position: absolute;
  right: 5%;
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

export const SearchIconImg = styled.img`
  width: 1.8rem;

`;
