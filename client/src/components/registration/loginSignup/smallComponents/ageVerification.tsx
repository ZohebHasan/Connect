import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';

import Text from "../../../ConnectUI_web/common/texts/static";
import Button from "../../../ConnectUI_web/common/buttons/button1";

import DatePicker from '../elements/datePicker';
import NormalInput from '../../../ConnectUI_web/common/inputBox/normal';
import birthdayIconSrc from "../assets/birthdayIcon.png";
import { useSignup } from '../../../../contexts/signup/signupContext';

const UserInfoText: React.FC = () => {
    return (
        <TextContainer>
            <Text size={"3rem"} variant={"normal"} fontWeight={"500"}>
                For your
            </Text>
            <Text size={"3rem"} variant={"gradient"} fontWeight={"500"}>
                safety.
            </Text>
        </TextContainer>
    );
}

const NoticeText: React.FC = () => {
    return (
        <NoticeContainer>
            <Text size={"0.9rem"} variant={"transparent"} fontWeight={"300"}>
                Connect must verify your age to protect child safety and comply with the U.S. Children's
                Online Privacy Protection Act (COPPA).
            </Text>
        </NoticeContainer>
    );
}



const DisplayDateError = () => {
    const {
        dateOfBirthEmptyError,
        underThirteenError,
        sessionResetError
    } = useSignup();

    let errorMessage = null;

    if(sessionResetError){
        errorMessage =  <ErrorMessage>The signup session was reset, taking you back to signup.</ErrorMessage>
    }
    else if(dateOfBirthEmptyError){
       errorMessage =  <ErrorMessage>Please select your date of birth.</ErrorMessage>;
    }
    else if (underThirteenError) {
        errorMessage = <ErrorMessage>Oh no! You are not eligible to create an account yet. Please try again on 
            your 13th birthday!
        </ErrorMessage>;
    }
    return (
        <>
            {errorMessage}
        </>
    );
}

export default function Age() {
    const { language } = useLanguage();
    const { isDarkMode } = useDarkMode();

    const {

        handleAgeNavigation,
    } = useSignup();

    return (
        <>
            <UserInfoText />
            <Container $isDarkMode={isDarkMode}>
                <DateOfBirth>
                    <DateText>
                        <Temp>
                            <HeaderContainer>
                                <Text size={"1.5rem"} variant={"normal"} fontWeight={"200"}>
                                    Date of Birth
                                </Text>
                            </HeaderContainer>
                            <BirthdayIconContainer>
                                <BirthdayIcon src={birthdayIconSrc} alt="Birthday Icon" />
                            </BirthdayIconContainer>
                        </Temp>
                        <NoticeText />
                    </DateText>
                    <DatePickerContainer>
                        <DatePicker />
                    </DatePickerContainer>
                    <ErrorMessageContainer>
                        <DisplayDateError />
                    </ErrorMessageContainer>
                    <ButtonContainer>
                        <Button
                            variant={"gradient"}
                            width={"85%"}
                            onClick={handleAgeNavigation}
                        >
                            Next
                        </Button>
                    </ButtonContainer>
                </DateOfBirth>
            </Container>
        </>
    );
}


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
const ErrorMessageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85%;

`
const HeaderContainer = styled.div`
   display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;`;

const BirthdayIconContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    margin-left: 0.5rem;
    `;

const BirthdayIcon = styled.img`
    width: 2.5rem;
`;

const Temp = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    // background-color: red;
`;

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
`;

const TextContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 0.8rem;
`;

const DateOfBirth = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;

const DateText = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 85%;
`;

const NoticeContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`;

const DatePickerContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 85%;
`;

const ButtonContainer = styled.div`
    flex: 0.9;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
`;
