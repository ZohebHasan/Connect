import React from "react";
import styled from "styled-components";

interface CopyrightProps {
  isDarkMode: boolean;
}

const CopyRightText = styled.div<{ isDarkMode: boolean }>`
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 30px;
  padding-bottom: 5px;
  font-size: 12px;
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')}; // Conditional color based on dark mode
`;


const Copyright: React.FC<CopyrightProps> = ({ isDarkMode }) => {
  return (
    <CopyRightText isDarkMode={isDarkMode}>
      Connect Inc. © 2024
    </CopyRightText>
  );
};

export default Copyright;
