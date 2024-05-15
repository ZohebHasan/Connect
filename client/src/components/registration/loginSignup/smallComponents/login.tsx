import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../../../../contexts/Language/Language';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { transLogin } from '../../../../translations/loginSignup/login/login';

import { useLogin } from '../../../../contexts/login/loginContext';

import Text from "../../../ConnectUI_web/common/texts/static"

import Button from "../../../ConnectUI_web/common/buttons/button1"


import SocialLoginButtons from '../elements/socialButtonsLogin';
import OrDivider from '../elements/orDivider';


import Credentials from "./loginCredentials"


const LoginText: React.FC = () => {
    return (
        <TextContainer>
            <Text size={"50px"} variant={"normal"} fontWeight={"500"}>
                Let's get you
            </Text>
            <Text size={"50px"} variant={"gradient"} fontWeight={"500"}>
                in.
            </Text>
        </TextContainer>
    );
}

interface Translations {
    signIn: string;
    signUp: string;
}

const Login: React.FC = () => {
    const { language } = useLanguage();
    const { isDarkMode } = useDarkMode();

    const { handleSubmit } = useLogin();



    let signIn = "Sign in";
    let signUp = "Create an account";

    if (transLogin && transLogin[language]) {
        const { signIn: signInVal, signUp: signUpVal } = transLogin[language] as Translations;
        signIn = signInVal;
        signUp = signUpVal;
    }

    return (
        <>
            <LoginText />
            <LoginContainer $isDarkMode={isDarkMode}>
                <Credentials />
                <ButtonContainer>
                    <Button onClick={handleSubmit} variant="gradient" width="70%">
                        {signIn}
                    </Button>
                </ButtonContainer>

                <SocialLoginButtons flex={1}/>
                {/* <GoogleOauth /> */}
                <OrDivider flex={0.5} />

                <ButtonContainer>
                    <Button to="signup" variant="gradient" width="70%">
                        {signUp}
                    </Button>
                </ButtonContainer>
            </LoginContainer>
        </>
    );
};

export default Login;

const TextContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: row;
    gap: 13px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`



const LoginContainer = styled.div<{ $isDarkMode: boolean }>`
    z-index: 1;
    flex: 7;
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
