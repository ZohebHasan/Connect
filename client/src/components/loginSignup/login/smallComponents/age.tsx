import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static"
import Button from "../../../ConnectUI_web/common/buttons/button1"
import OrDivider from './orDivider';
import SocialSignupButtons from './socialButtons';
import DatePicker from './datePicker';


const SignupEmailText: React.FC = () => {
    return (
        <TextContainer>
            <Text size={"3rem"} variant={"normal"} fontWeight={"500"}>
                Confirming your 
            </Text>
            <Text size={"3rem"} variant={"gradient"} fontWeight={"500"}>
                Age.
            </Text>
        </TextContainer>
    );
}



const NoticeText: React.FC = () => {
    return (
        <NoticeContainer>
            <Text size={"1rem"} variant={"transparent"} fontWeight={"300"}>
                Note: Connect requires to verify your age To comply with the Children's 
                Online Privacy Protection Act (COPPA) in the United States.
            </Text>
        </NoticeContainer>
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
                    <Text size={"1.5rem"} variant={"normal"} fontWeight={"300"}>
                        Please select your Birthday.
                    </Text>
                </Temp>  
                <Temp2>
                        <DatePicker />
                </Temp2>
                <Temp3>
                    <Button 
                        variant= {"gradient"} 
                        width= {"40%"}
                        to = {"/userInfoNonEmail"}
                        >
                            Next
                    </Button>
                </Temp3>
                
            
            </SignupContainer>
            <NoticeText/>
  
        </>
    );
  }


  const Temp = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    // background-color: red;
  `
  const Temp2 = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
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
