import React, {useState} from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static"
import Button from "../../../ConnectUI_web/common/buttons/button1"

import DatePicker from '../elements/datePicker';
import NormalInput from '../../../ConnectUI_web/common/inputBox/normal';

const UserInfoText: React.FC = () => {
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

const NoticeText: React.FC = () => {
    return (
        <NoticeContainer>
            <Text size={"0.9rem"} variant={"transparent"} fontWeight={"300"}>
                Connect must verify your age to comply with the U.S. Children's 
                Online Privacy Protection Act (COPPA) and to provide tailored 
                contents.

            </Text>
        </NoticeContainer>
    );
}





export default function Age() {
    const {language} = useLanguage(); 
    const {isDarkMode} = useDarkMode();
    const[userName, setUsername] = useState('');
    const[fullName, setFullName] = useState('');

    const handleFullNameChange = (input: string) => {
        setUsername(input);
    }
    const handleUsernameChange = (input: string) => {
        setFullName(input);
    }
    return (
        <>
            <UserInfoText/>
            <Container $isDarkMode={isDarkMode}>  

                <UserInfo>
                    <InfoText>
                        <Text size={"1.5rem"} variant={"normal"} fontWeight={"200"}>
                            User Information
                        </Text>
                    </InfoText>  
                    <InputContainer>
                        <NormalInput 
                            id={""} 
                            label={"Full Name"}
                            width= {"75%"}
                            value= {fullName}
                            onChange={handleFullNameChange}
                            />
                        <NormalInput
                            id={""}
                            label={"username "} 
                            width= {"75%"}
                            value= {userName}
                            onChange={handleUsernameChange}
                        />     
                    </InputContainer>
                </UserInfo>


                <DateOfBirth>
                    <DateText>
                        <Temp>
                            <Text size={"1.5rem"} variant={"normal"} fontWeight={"200"}>
                                Date of Birth
                            </Text>
                        </Temp>
                        <NoticeText/>
                    </DateText> 
                    <DatePickerContainer>
                        <DatePicker/>
                    </DatePickerContainer>

                    <ButtonContainer>
                        <Button 
                            variant= {"gradient"} 
                            width= {"60%"}
                            to = {"/agreement"}
                            >
                                Next
                        </Button>
                    </ButtonContainer>

                </DateOfBirth>
                          
            </Container>
     
  
        </>
    );
  }


  const Temp = styled.div`
    display:flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
  `
  const Container = styled.div<{ $isDarkMode: boolean }>`
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
    //   gap: 1rem;
`;

   
  const TextContainer = styled.div`
    flex: 0.8;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 0.8rem;
`
  const UserInfo = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  `

  const InfoText = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction:column;
    width: 75%;
  `

  const InputContainer = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `

  const DateOfBirth = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    // background-color:green;
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

const NoticeContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`

  const DatePickerContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 75%;
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








