import React, { useState } from "react";
import styled from "styled-components";

interface LangCodeDropDownProps {
  onSelect: (code: string) => void;
}

const LangCodeDropDown: React.FC<LangCodeDropDownProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");

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
        {selectedCode || "Select"}
      </DropdownToggle>
      {isOpen && (
        <DropdownList>
          <DropdownItem onClick={() => handleSelect("+1")}>+1</DropdownItem>
          <DropdownItem onClick={() => handleSelect("+880")}>+880</DropdownItem>
          {/* Add more language codes as needed */}
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
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
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

  &:hover {
    background-color: #f0f0f0;
  }
`;
