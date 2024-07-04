import React, { useState } from 'react';
import styled from 'styled-components';

import { InputField, Label } from './styles/inputStyle'; 
import InputContainer from './containers/inputContainer';
import { useDarkMode } from '../../../../../../../../contexts/DarkMode/DarkMode';

import SearchIconDark from "../../../../../../../assets/searchDark.png";
import SearchIconLight from "../../../../../../../assets/searchLight.png";

interface ReplyInputProps {
  id: string;
  label: string;
  width?: string;
  value: string;
  onChange: (value: string) => void;
}

const ReplyInput: React.FC<ReplyInputProps> = ({ id, label, value, onChange, width }) => {
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
      {hasText && (
        <SearchButton>
          <SearchIconImg src={isDarkMode ? SearchIconDark : SearchIconLight} alt="Search" />
        </SearchButton>
      )}
    </InputContainer>
  );
};

export default ReplyInput;

export const SearchButton = styled.button`
  position: absolute;
  right: 5%;
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

export const SearchIconImg = styled.img`
  width: 25px;
  height: 25px;
`;
