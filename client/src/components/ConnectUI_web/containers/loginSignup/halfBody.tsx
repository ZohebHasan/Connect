import React from 'react';
import styled from 'styled-components';


interface LoginSignupContainerProps {
  children: React.ReactNode;
}
const LoginContainer: React.FC<LoginSignupContainerProps> = ({ children }) => {
  return(
        <Container>
            {children}
        </Container>
)};

export default LoginContainer;


const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: auto;
  justify-content: center;
  align-items: center;
`;