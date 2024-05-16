import React, { useState } from 'react';
import styled from 'styled-components';

import { InputField, Label } from './styles/inputStyle'; 
import InputContainer from './containers/inputContainer';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

import ShowSign from './assets/show.png'
import HideSign from './assets/hide.png'; 

interface HiddenInputProps {
  id: string;
  label: string;
  width?: string;
  value: string;
  onChange: (value: string) => void;
}

const HiddenInput: React.FC<HiddenInputProps> = ({ id, label, value, onChange, width }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode } = useDarkMode();
  const inputType = showPassword ? "text" : "password";

  const inputId = `input-${id}`;
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputContainer width = {width}>
      <InputField 
          type={inputType} 
          id={id} 
          $isDarkMode={isDarkMode} 
          placeholder = {""}
          value={value}
          onChange={handleChange}
  
      />
      <Label htmlFor={id} $isDarkMode={isDarkMode}>
        {label}
      </Label>
      <TogglePasswordButton onClick={togglePasswordVisibility}>
        <TogglePasswordIcon src={showPassword ? ShowSign : HideSign} alt={showPassword ? "Hide" : "Show"} />
      </TogglePasswordButton>
    </InputContainer>
  );
};

export default HiddenInput;


export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 5%;
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

export const TogglePasswordIcon = styled.img`
  width: 25px;
  height: 25px;
`;