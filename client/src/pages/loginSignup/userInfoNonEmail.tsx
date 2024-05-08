import React from 'react';


import Header from '../../components/registration/common/headerHidden';
import Body from '../../components/registration/loginSignup/bodyUserInfoNonEmail';


const SignupPage: React.FC = () => {
    return (
        <>
            <Header/>
            <Body />
        </>
    );
};

export default SignupPage;