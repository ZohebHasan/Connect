import React from 'react';

import AddPhoneNumPageContainer from '../../components/ConnectUI_web/templetes/pageTemplete'

import HeaderAddPhoneNum from '../../components/loginSignup/common/headerHidden';
import BodyAddPhoneNum from '../../components/loginSignup/login/bodyPhoneNum';

import Copyright from '../../components/ConnectUI_web/common/copyright/Copyright';

const LoginPage: React.FC = () => {
    return (
        <>
            <AddPhoneNumPageContainer fadeIn={true} variant = {"fit"}>
                <HeaderAddPhoneNum/>
                <BodyAddPhoneNum/>
            </AddPhoneNumPageContainer>
            <Copyright/>
        </>
    );
};

export default LoginPage;