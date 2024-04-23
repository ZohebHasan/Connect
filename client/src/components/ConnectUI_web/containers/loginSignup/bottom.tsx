import React from 'react';
import styled from 'styled-components';


interface BottomContainerProps {
  flex: number; 
  children?: React.ReactNode;
}




const BottomComponent: React.FC<BottomContainerProps> = ({ flex, children }) => {
  return (
        <BottomContainer $flex={flex}>
             {children}
        </BottomContainer>
    );
};

export default BottomComponent;


const BottomContainer = styled.div< {$flex: number}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 1;
  flex: ${({ $flex }) => $flex}; // Use flex from props
`;