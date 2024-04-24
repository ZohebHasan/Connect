import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static"
import Button from "../../../ConnectUI_web/common/buttons/button1"
import NormalInput from "../../../ConnectUI_web/common/inputBox/normal"
import NumCodeDropdown from "./langCodeDropdown"

const SignupEmailText: React.FC = () => {
    return (
        <TextContainer>
            <Text size={"50px"} variant={"normal"} fontWeight={"500"}>
                A bit more for your <span> </span>
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


    const handleLangCodeSelect = (code: string) => {
        console.log("Selected language code:", code);
        // You can handle the selected code here
    };

    return (
        <>
            <SignupEmailText/>
            <SignupContainer $isDarkMode={isDarkMode}>    
                <TitleContainer>
                    <Text variant= {"normal"} size = {"1.5em"} fontWeight= {"100"}>
                        Add your phone number
                    </Text>
                </TitleContainer>
                <Temp>
                    <NumCodeDropdownContainer>
                        <NumCodeDropdown onSelect={handleLangCodeSelect}/>
                    </NumCodeDropdownContainer>
                    
                    <InputContainer>
                        <NormalInput id={""} label={"Phone number"} />
                    </InputContainer>
                </Temp>
  
                <ButtonContainer>
                    <Button variant="gradient" width="50%">
                        My email is enough
                    </Button>
                    <Button variant="gradient" width="50%">
                        Confirm
                    </Button>
                </ButtonContainer>           
            </SignupContainer>
        </>
    );
  }
const NumCodeDropdownContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`


const Temp = styled.div`
  flex:1;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`


const InputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`



const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5%;
`


const SignupContainer = styled.div<{ $isDarkMode: boolean }>`
  z-index: 1;
  flex: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(181, 181, 181, 0.5)' : 'rgba(136, 136, 136, 0.442)'};
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(253, 211, 255, 0.201);
`;




const ButtonContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5%;
    width: 90%;
`
