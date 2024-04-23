import React from 'react';

import SignupPageContainer from '../../components/ConnectUI_web/templetes/pageTemplete'

import HeaderSignup from '../../components/loginSignup/common/headerHidden';
import BodySignup from '../../components/loginSignup/login/bodySignUp';

import Copyright from '../../components/ConnectUI_web/common/copyright/Copyright';


const SignupPage: React.FC = () => {
    return (
        <>
            <SignupPageContainer fadeIn={true} variant = {"fit"}>
                <HeaderSignup/>
                <BodySignup/>
            </SignupPageContainer>
            <Copyright/>       
        </>
    );
};

export default SignupPage;