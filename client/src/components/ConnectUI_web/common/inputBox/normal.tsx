import React, { useState } from 'react';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { InputField, Label } from './styles/inputStyle';

import InputContainer from './containers/inputContainer';



interface NormalInputProps {
  id: string;
  label: string;
  width?: string;
  value: string;
  onChange: (value: string) => void;
}

const NormalInput: React.FC<NormalInputProps> = ({ id, label, value, onChange, width }) => {
  const { isDarkMode } = useDarkMode();
  
  const inputId = `input-${id}`;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  // console.log(value);
  return (
    <InputContainer width={width}>
        <InputField
          id={inputId}
          $isDarkMode={isDarkMode}
          placeholder=""
          value={value}
          onChange={handleChange}
        />
        <Label htmlFor={inputId} $isDarkMode={isDarkMode}>
            {label}
        </Label>
    </InputContainer>
  );
};

export default NormalInput;
