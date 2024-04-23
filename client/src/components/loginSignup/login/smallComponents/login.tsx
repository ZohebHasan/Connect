import React from 'react';
import styled from 'styled-components';

import { useLanguage } from '../../../../contexts/Language/Language';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { transLogin } from '../../../../translations/loginSignup/login/login';


import Text from "../../../ConnectUI_web/common/texts/static"
import NormalInput from '../../../ConnectUI_web/common/inputBox/normal';
import HiddenInput from '../../../ConnectUI_web/common/inputBox/hidden';
import Button from "../../../ConnectUI_web/common/buttons/button1"
import SocialLoginButtons from './socialButtons';
import OrDivider from './orDivider';


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

const TextContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: row;
    gap: 13px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`




const Credentials: React.FC = () => {
    const { language } = useLanguage();

    let id = "Phone, email, or username"
    let pass = "Password"

    if (transLogin && transLogin[language]) {
        const { id: idVal, pass: passVal } = transLogin[language];
        id = idVal;
        pass = passVal;
    }
    return (
        <CredentialContainer>
            <NormalInput id={""} label={id} />
            <HiddenInput id={""} label={pass} />
        </CredentialContainer>
    );
}

const CredentialContainer = styled.div`
    flex: 1.5;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 15px;
`;




interface Translations {
    signIn: string;
    signUp: string;
}

const Login: React.FC = () => {
    const { language } = useLanguage();
    const { isDarkMode } = useDarkMode();

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
                    <Button to="twoStep" variant="gradient" width="58%">
                        {signIn}
                    </Button>
                </ButtonContainer>

                <SocialLoginButtons flex = {1}/>

                <OrDivider flex={0.5}/>

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



const LoginContainer = styled.div<{ $isDarkMode: boolean }>`
    z-index: 1;
    flex: 7;
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
    flex:1;
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
`
