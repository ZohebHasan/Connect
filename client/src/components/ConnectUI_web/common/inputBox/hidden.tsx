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
}

const HiddenInput: React.FC<HiddenInputProps> = ({ id, label, width }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode } = useDarkMode();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const inputType = showPassword ? "text" : "password";

  return (
    <InputContainer width = {width}>
      <InputField type={inputType} id={id} $isDarkMode={isDarkMode} placeholder = {""}/>
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