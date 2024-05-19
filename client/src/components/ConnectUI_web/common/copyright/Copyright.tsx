import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../../../../contexts/DarkMode/DarkMode";


const Copyright: React.FC= () => {
  const {isDarkMode} = useDarkMode();
  return (
    <CopyRightText $isDarkMode={isDarkMode}>
       Connect Inc. © 2024
    </CopyRightText>
  );
};

export default Copyright;
const CopyRightText = styled.div<{ $isDarkMode: boolean }>`
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 30px;
  padding-bottom: 5px;
  font-size: 12px;
  color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')}; 
`;
