import React from 'react';


import VerificationPageLoginContainer from '../../components/ConnectUI_web/templetes/pageTemplete'


import HeaderVerification from '../../components/loginSignup/common/headerHidden';
import BodyVerification from '../../components/loginSignup/login/bodyVerification';

import Copyright from '../../components/ConnectUI_web/common/copyright/Copyright';

const VerificationPage: React.FC = () => {
    return (
        <>
            <VerificationPageLoginContainer fadeIn={true} variant = {"fit"}>
                <HeaderVerification/>
                <BodyVerification/>
            </VerificationPageLoginContainer>
            <Copyright/>
        </>
    );
};

export default VerificationPage;