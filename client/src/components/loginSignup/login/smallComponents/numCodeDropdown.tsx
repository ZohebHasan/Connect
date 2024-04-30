import React, { useState } from "react";
import styled from "styled-components";
import { Numbers } from "./numData";  // Ensure the import path is correct

interface LangCodeDropDownProps {
  onSelect: (code: string) => void;
}

const LangCodeDropDown: React.FC<LangCodeDropDownProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(Numbers[0].code);  // Default to the first item

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (code: string) => {
    setSelectedCode(code);
    setIsOpen(false);
    onSelect(code);
  };

  return (
    <DropdownContainer>
      <DropdownToggle onClick={toggleDropdown}>
        {Numbers.find(num => num.code === selectedCode)?.flag} {selectedCode}
      </DropdownToggle>
      {isOpen && (
        <DropdownList>
          {Numbers.map(num => (
            <DropdownItem key={num.code} onClick={() => handleSelect(num.code)}>
              <span>{num.flag}</span> {num.code}
            </DropdownItem>
          ))}
        </DropdownList>

      )}
    </DropdownContainer>
  );
};

export default LangCodeDropDown;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownToggle = styled.button`
  padding: 15px 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  padding: 4px 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }

  span {
    margin-right: 8px;  // Adds right margin to the flag
  }
`;

