import React from 'react';

import LoginPageContainer from '../../components/ConnectUI_web/templetes/pageTemplete'

import HeaderLogin from '../../components/loginSignup/common/headerHidden';
import BodyLogin from '../../components/loginSignup/login/bodyLogin';

import Copyright from '../../components/ConnectUI_web/common/copyright/Copyright';

const LoginPage: React.FC = () => {
    return (
        <>
            <LoginPageContainer fadeIn={true} variant = {"fit"}>
                <HeaderLogin/>
                <BodyLogin/>
            </LoginPageContainer>
            <Copyright/>
        </>
    );
};

export default LoginPage;