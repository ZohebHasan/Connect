import React from 'react';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { InputField, Label } from './styles/inputStyle';

import InputContainer from './containers/inputContainer';



interface NormalInputProps {
  id: string;
  label: string;
  width?: string;

}

const NormalInput: React.FC<NormalInputProps> = ({ id, label, width }) => {
  const {isDarkMode} = useDarkMode();
  const inputId = `input-${id}`;

  return (

    <InputContainer width = {width}>
        <InputField id={inputId} $isDarkMode = {isDarkMode} placeholder = {""}/>
        <Label htmlFor={inputId} $isDarkMode = {isDarkMode}>
            {label}
        </Label>
    </InputContainer>
 
  );
};

export default NormalInput;

