import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static"
import Button from "../../../ConnectUI_web/common/buttons/button1"
import OrDivider from '../elements/orDivider';
import SocialSignupButtons from '../elements/socialButtonsSignup';




const SignupEmailText: React.FC = () => {
    return (
        <TextContainer>
            <Text size={"50px"} variant={"normal"} fontWeight={"500"}>
                Let's get you
            </Text>
            <Text size={"50px"} variant={"gradient"} fontWeight={"500"}>
                Connected.
            </Text>
        </TextContainer>
    );
}

const TextContainer = styled.div`
    flex: 3;
    display: flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;

`


export default function SignupNonEmailContainer() {
    const {language} = useLanguage(); 
    const {isDarkMode} = useDarkMode();
    return (
        <>
            <SignupEmailText/>
            <SignupContainer $isDarkMode={isDarkMode}>    
                <SocialSignupButtons flex = {1}/>      
                <OrDivider flex={0}/>
                <ButtonContainer>
                    <Button 
                        variant="gradient" 
                        width="80%"
                        to = {"/signup/userCredentials"}>
                        sign up with email OR phone
                    </Button>
                </ButtonContainer>           
            </SignupContainer>
        </>
    );
  }

const SignupContainer = styled.div<{ $isDarkMode: boolean }>`
  z-index: 1;
  flex: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(156, 156, 156, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(253, 211, 255, 0.201);
`;




const ButtonContainer = styled.div`
    flex:1;
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
`
