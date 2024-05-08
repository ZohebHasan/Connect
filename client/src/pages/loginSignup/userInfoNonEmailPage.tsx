import React from 'react';

import PageContainer from '../../components/ConnectUI_web/templetes/pageTemplete'

import Header from '../../components/loginSignup/common/headerHidden';
import Body from '../../components/loginSignup/login/bodyUserInfoNonEmail';

import Copyright from '../../components/ConnectUI_web/common/copyright/Copyright';


const SignupPage: React.FC = () => {
    return (
        <>
            <PageContainer fadeIn={true} variant = {"fit"}>
                <Header/>
                <Body/>
            </PageContainer>
            <Copyright/>       
        </>
    );
};

export default SignupPage;