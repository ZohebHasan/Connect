import React, {useState} from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static"
import Button from "../../../ConnectUI_web/common/buttons/button1"

import DatePicker from '../elements/datePicker';
import NormalInput from '../../../ConnectUI_web/common/inputBox/normal';
import HiddenInput from '../../../ConnectUI_web/common/inputBox/hidden';
const CredentialText: React.FC = () => {
    return (
        <TextContainer>
            <Text size={"3rem"} variant={"normal"} fontWeight={"500"}>
                Let's setup your 
            </Text>
            <Text size={"3rem"} variant={"gradient"} fontWeight={"500"}>
                Account.
            </Text>
        </TextContainer>
    );
}







export default function Age() {
    const {language} = useLanguage(); 
    const {isDarkMode} = useDarkMode();
    const[age,setAge] = useState('');
    const[password, setPassword] = useState('');

    const handlePassword = (input: string) =>{
        setPassword(input);
    }

    const handleAge = (input:string) => {
        setAge(input);
    }
    return (
        <>
            <CredentialText/>
            <Container $isDarkMode={isDarkMode}>  

                <Credential>
                    <CredentialTextContainer>
                        <Text size={"1.5rem"} variant={"normal"} fontWeight={"200"}>
                            Account credential
                        </Text>
                    </CredentialTextContainer>  
                    <InputContainer>
                        <NormalInput 
                            id={""}
                            label={"Phone number or email address"} 
                            width= {"75%"}
                            value = {age}
                            onChange={handleAge}
                        />
                    </InputContainer>
                </Credential>


                <Password>
                    <DateText>
                        <Text size={"1.5rem"} variant={"normal"} fontWeight={"200"}>
                            Account password
                        </Text> 
                    </DateText> 
                    <DatePickerContainer>
                        <HiddenInput 
                            id={""} 
                            label={"Password"} 
                            width= {"75%"}
                            value= {password}
                            onChange={handlePassword}
                        />
                        <HiddenInput 
                            id={""} 
                            label={"Confirm Password"}
                            width= {"75%"}
                            value= {password}
                            onChange={handlePassword}
                        />
                    </DatePickerContainer>

                    <ButtonContainer>
                        <Button 
                            variant= {"gradient"} 
                            width= {"60%"}
                            to = {"/verifySignup"}
                            >
                                Next
                        </Button> 
                    </ButtonContainer>

                </Password>
                          
            </Container>
     
  
        </>
    );
  }

  const Container = styled.div<{ $isDarkMode: boolean }>`
    z-index: 1;
    flex: 2;
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
    //   gap: 1rem;
`;

   
  const TextContainer = styled.div`
    flex: 0.7;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    // gap: 0.8rem;
`
  const Credential = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    // background-color:green;
  `

  const CredentialTextContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction:column;
    width: 75%;
   
  `

  const InputContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `

  const Password = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    // background-color:blue;
`

const DateText = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction:column;
    width: 75%;
    // gap: 0.5rem;
    // background-color: blue;
`

  const DatePickerContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    // background-color: pink;
`

 
  const ButtonContainer = styled.div`
    flex: 0.9;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    // background-color:red;
`








