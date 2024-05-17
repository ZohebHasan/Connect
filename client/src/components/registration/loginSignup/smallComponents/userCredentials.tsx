import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static"
import Button from "../../../ConnectUI_web/common/buttons/button1"

import DatePicker from '../elements/datePicker';
import NormalInput from '../../../ConnectUI_web/common/inputBox/normal';
import HiddenInput from '../../../ConnectUI_web/common/inputBox/hidden';

import { useSignup } from '../../../../contexts/signup/signupContext';

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

const DisplayUserIdError = () => {
    const {
        errors,
        userIdEmptyError, 
    } = useSignup();

    let errorMessage = null;

    if (userIdEmptyError ) {
        errorMessage = <ErrorMessage>Please enter your email address or phone number.</ErrorMessage>;
    }
    else if ((errors.emailError && errors.phoneError)) {
        errorMessage = <ErrorMessage>Please enter a valid Email or phone number.</ErrorMessage>;
    }
    return (
        <>
            {errorMessage}
        </>
    );
}

const DisplayPasswordError = () => {
    const {
        errors,
        passwordEmptyError,
        confirmPasswordEmptyError
    } = useSignup();

    let errorMessage = null;

    if (passwordEmptyError) {
        errorMessage = <ErrorMessage>Please enter a password.</ErrorMessage>;
    }
    else if(confirmPasswordEmptyError){
        errorMessage = <ErrorMessage>Please Confirm your password.</ErrorMessage>;
    }
    else if (errors.passwordNotMatchError){
        errorMessage = <ErrorMessage>Passwords do not match.</ErrorMessage>;
    }
    else if (errors.passwordError) {
        errorMessage = <ErrorMessage>Password is too weak, please enter a stronger password.</ErrorMessage>;
    }

    return (
        <>
            {errorMessage}
        </>
    );
}



export default function Credentials() {
    const { language } = useLanguage();
    const { isDarkMode } = useDarkMode();
    const [age, setAge] = useState('');


    const {
        userId,
        password,
        confirmPassword,

        handleUserIdChange,
        handlePasswordChange,
        handleConfirmPasswordChange,

      
        handleCredentialSubmit
    } = useSignup();

    const handleAge = (input: string) => {
        setAge(input);
    }
    return (
        <>
            <CredentialText />
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
                            width={"75%"}
                            value={userId}
                            onChange={handleUserIdChange}
                        />
                    </InputContainer>
                    <DisplayUserIdError/>
               
                </Credential>

                <Password>
                    <DateText>
                        <Text size={"1.5rem"} variant={"normal"} fontWeight={"200"}>
                            Account password
                        </Text>
                    </DateText>
                    <PasswordContainer>
                        <HiddenInput
                            id={"passwordSignup"}
                            label={"Password"}
                            width={"75%"}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <HiddenInput
                            id={"passwordSignup"}
                            label={"Confirm Password"}
                            width={"75%"}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </PasswordContainer>
                    <DisplayPasswordError/>
                    <ButtonContainer>
                        <Button
                            variant={"gradient"}
                            width={"60%"}
                            onClick={handleCredentialSubmit}
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

const PasswordContainer = styled.div`
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








const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  60% { transform: translateX(10px); }
  70% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  90% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;


const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    animation: ${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both; 
`
