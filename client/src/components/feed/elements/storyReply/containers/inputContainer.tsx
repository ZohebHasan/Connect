 import React from 'react';
import styled from 'styled-components';

interface InputContainerProps {
  children: React.ReactNode;
  width?: string;
}


const InputContainer: React.FC<InputContainerProps> = ({ children, width }) => {
  return (
    <Container $width = {width}>
        {children}
    </Container>);
};

export default InputContainer;




const Container = styled.div<{$width?: string}>`
  width: ${({ $width }) => $width || '70%'};

  // @media (max-width: 1920px) {  
  //   width: ${({ $width }) => $width ? `calc(${ $width } * 0.7)` : '70%'}; 
  // }
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;
