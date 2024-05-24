import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static"
import Button from "../../../ConnectUI_web/common/buttons/button1"

import DatePicker from '../elements/datePicker';
import NormalInput from '../../../ConnectUI_web/common/inputBox/normal';
import HiddenInput from '../../../ConnectUI_web/common/inputBox/hidden';

import { useSignup } from '../../../../contexts/registration/signup/signupContext';

const CredentialText: React.FC = () => {
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



const DisplayFullNameError = () => {
    const {
        errors,
        fullNameEmptyError,

    } = useSignup();

    let errorMessage = null;

    if (fullNameEmptyError) {
        errorMessage = <ErrorMessage>Please enter your name.</ErrorMessage>;
    }
    else if (errors.fullNameError) {
        errorMessage = <ErrorMessage>Please enter a valid name.</ErrorMessage>;
    }
 
    return (
        <>
            {errorMessage}
        </>
    );
}



const DisplayUserIdError = () => {
    const {
        errors,
        userIdEmptyError,
    
        accountExistsError

    } = useSignup();

    let errorMessage = null;

    if (userIdEmptyError) {
        errorMessage = <ErrorMessage>Please enter your email or phone number.</ErrorMessage>;
    }
    else if (errors.emailError && errors.phoneError) {
        errorMessage = <ErrorMessage>Please enter a valid email or phone number.</ErrorMessage>;
    }
    else if (accountExistsError) {
        errorMessage = <ErrorMessage>Uh oh, seems like an account already exists.</ErrorMessage>;
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
    } = useSignup();

    let errorMessage = null;

    if (passwordEmptyError) {
        errorMessage = <ErrorMessage>Please enter a password.</ErrorMessage>;
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
        fullName,
        userId,
        password,

        handleFullNameChange,
        handleUserIdChange,
        handlePasswordChange,

        handleSubmit

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
                            User information
                        </Text>
                    </CredentialTextContainer>
                    <InputContainer>
                        <NormalInput
                            id={""}
                            label={"Full Name"}
                            width={"75%"}
                            value={fullName}
                            onChange={handleFullNameChange}
                        />
                    </InputContainer>
                    <ErrorMessageContainer>
                        <DisplayFullNameError />
                    </ErrorMessageContainer>
                    <InputContainer>
                        <NormalInput
                            id={""}
                            label={"Phone number or email address"}
                            width={"75%"}
                            value={userId}
                            onChange={handleUserIdChange}
                        />


                    </InputContainer>
                    <ErrorMessageContainer>
                        <DisplayUserIdError />
                    </ErrorMessageContainer>
                  

                </Credential>

                <Password>
                    <DateText>
                        <Text size={"1.5rem"} variant={"normal"} fontWeight={"200"}>
                            User password
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

                    </PasswordContainer>
                    <ErrorMessageContainer>
                        <DisplayPasswordError />
                    </ErrorMessageContainer>
                </Password>

                <BottomContainer>
                    <AgreementContainer>
                        <Text variant={"normal"} fontWeight={"300"} size={"15px"}>
                            By signing up, you're agreeing to Connect’s <StyledLink to="/privacy" $isDarkMode={isDarkMode}>terms of services</StyledLink> and privacy, user, data, and child safety
                            <StyledLink to="/privacy" $isDarkMode={isDarkMode}> policies</StyledLink>
                        </Text>
                    </AgreementContainer>
                    <ButtonContainer>
                        <Button
                            variant={"gradient"}
                            width={"90%"}
                            onClick={handleSubmit}
                        >
                            Sign up
                        </Button>
                    </ButtonContainer>
                </BottomContainer>
            </Container>
        </>
    );
}

const ErrorMessageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;

`

const BottomContainer = styled.div`
    flex: 1.3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    // background-color:red;
`;

const AgreementContainer = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    align-items: flex-end;
    justify-content: center;

`

const StyledLink = styled(Link) <{ $isDarkMode: boolean }>`
  color: #C33764; 
  text-decoration: none; 
  font-weight: 500; 
  transition: color 0.2s ease-in-out, text-decoration 0.2s ease-in-out;

  &:hover, &:focus {
    color: #0056b3; /* Darker blue on hover for visual feedback */
    text-decoration: underline; /* Add underline on hover for clarity */
  }

  &:active {
    color: #004085; /* Even darker blue when active/clicked */
  }
`;

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
    flex: 0.4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    gap: 0.8rem;
`
const Credential = styled.div`
    flex: 2;
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
    flex: 0.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `

const Password = styled.div`
    flex: 1.2;
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
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
