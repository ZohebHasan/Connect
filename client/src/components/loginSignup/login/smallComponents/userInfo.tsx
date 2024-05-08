import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static"
import Button from "../../../ConnectUI_web/common/buttons/button1"
import OrDivider from './orDivider';
import SocialSignupButtons from './socialButtons';
import DatePicker from './datePicker';
import NormalInput from '../../../ConnectUI_web/common/inputBox/normal';
const SignupEmailText: React.FC = () => {
    return (
        <TextContainer>
            <Text size={"3rem"} variant={"normal"} fontWeight={"500"}>
                Let's get to know 
            </Text>
            <Text size={"3rem"} variant={"gradient"} fontWeight={"500"}>
                you.
            </Text>
        </TextContainer>
    );
}







export default function Age() {
    const {language} = useLanguage(); 
    const {isDarkMode} = useDarkMode();
    return (
        <>
            <SignupEmailText/>
            <SignupContainer $isDarkMode={isDarkMode}>  
                <Temp>
                    <Text size={"1.4rem"} variant={"normal"} fontWeight={"200"}>
                        Please setup your Connect ID.
                    </Text>
                </Temp>  
                <Temp2>
                    <NormalInput id={""} label={"Full Name"} width= {"80%"}/>
                    <NormalInput id={""} label={"@ ConnectID (e.g: @john.doe)"} width= {"80%"}/>     
                </Temp2>
                <Temp3>
                    <Button 
                        variant= {"gradient"} 
                        width= {"60%"}
                        to = {"/agreement"}
                        >
                            Next
                    </Button>
                </Temp3>
                
            
            </SignupContainer>
     
  
        </>
    );
  }


  const Temp = styled.div`
    flex: 0.8;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 90%;

  `
  const Temp2 = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `
  const Temp3 = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
`




  const TextContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

`

  const NoticeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

`


const SignupContainer = styled.div<{ $isDarkMode: boolean }>`
  z-index: 1;
  flex: 4;
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
