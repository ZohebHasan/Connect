import React from 'react';
import styled from 'styled-components';


interface CustomCheckboxProps {
  children: React.ReactNode;
  onClick?: () => void;
  checked?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ children, onClick, checked }) => {
  return (
    <CheckboxContainer onClick={onClick}> 
      <StyledCheckbox type="checkbox" id="customCheckbox"  checked={checked} readOnly />
      <Label>{children}</Label>
    </CheckboxContainer>
  );
};

export default CustomCheckbox;


const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 1.5;
  user-select: none;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  background-color: #fff;
  margin-right: 1em; // Space between the checkbox and the label text
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  display: grid;
  place-content: center;
  cursor: pointer;
  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color, black);
    background-color: CanvasText;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }
`;

const Label = styled.span`
  user-select: none; // Prevent text selection on click
`;