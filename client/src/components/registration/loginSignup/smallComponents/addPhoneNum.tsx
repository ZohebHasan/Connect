import React, { useState } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static"
import Button from "../../../ConnectUI_web/common/buttons/button1"
import NormalInput from "../../../ConnectUI_web/common/inputBox/normal"
import NumCodeDropdown from "../elements/numCodeDropdown"
import usFlag from "../assets/USA.png"
const AddPhoneText: React.FC = () => {
    return (
        <TextContainer>
            <Text size={"50px"} variant={"normal"} fontWeight={"500"}>
                A bit more for your
            </Text>
            <Text size={"50px"} variant={"gradient"} fontWeight={"500"}>
                Security.
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
    const [phoneNum, setPhoneNum] = useState('');

    const handlePhoneNum = (input: string) => {
        setPhoneNum(input);
    }

    return (
        <>
            <AddPhoneText/>
            <AddPhoneNumContainer $isDarkMode={isDarkMode}>    
                <TitleContainer>
                    <Text variant= {"normal"} size = {"1.5em"} fontWeight= {"100"}>
                        Please add your phone number
                    </Text>
                </TitleContainer>

                <NumberAndPhoneInputContainer>

                    <NumCodeContaienr>
                        <NumCode $isDarkMode = {isDarkMode}> 
                            <StyledImg src = {usFlag}/>
                            <Text variant = {"normal"} size = {"1.2em"} fontWeight = {"200"}>
                                +1
                            </Text>
                        </NumCode>
                        {/* <NumCodeDropdown onSelect={handleNumCodeSelect}/> */}
                    </NumCodeContaienr>
                    
                    <InputContainer>
                        <NormalInput 
                            id={""} 
                            label={"Phone number"} 
                            width = {"90%"}
                            value = {phoneNum}
                            onChange={handlePhoneNum}
                        />
                    </InputContainer>

                </NumberAndPhoneInputContainer>
  
                <ButtonContainer>
                    <Button variant="gradient" width="50%" to = {"/agreement"}>
                        My email is enough
                    </Button>
                    <Button variant="gradient" width="50%" to = {"/verifyPhoneNum"}>
                        Confirm
                    </Button>
                </ButtonContainer>           
            </AddPhoneNumContainer>
        </>
    );
}

const AddPhoneNumContainer = styled.div<{ $isDarkMode: boolean }>`
  z-index: 1;
  flex: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(181, 181, 181, 0.3)' : 'rgba(136, 136, 136, 0.3)'};
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(253, 211, 255, 0.201);
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5%;
`;



const NumberAndPhoneInputContainer = styled.div`
  flex:1;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NumCodeContaienr = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

`;

const NumCode = styled.div<{$isDarkMode: boolean}>`
    padding: 15px 25px;
    background-color: ${$isDarkMode  => $isDarkMode ? 'rgba(128, 128, 128, 0.203)' : 'rgba(255, 252, 252, 0.203)'}; 
    border-radius: 7px;
    width: 40%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(253, 211, 255, 0.201);


`;

const StyledImg = styled.img`
    width: 20px;
    height: auto;

`



const InputContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;









const ButtonContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5%;
    width: 90%;
`;
