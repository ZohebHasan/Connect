import React from 'react';


import PageContainer from '../../components/ConnectUI_web/templetes/pageTemplete'


import Header from '../../components/registration/common/headerHidden';
import Body from '../../components/registration/loginSignup/bodyVerificationSignup';

import Copyright from '../../components/ConnectUI_web/common/copyright/Copyright';

const VerificationPage: React.FC = () => {
    return (
        <>
            <Header/>
            <Body />
        </>
    );
};

export default VerificationPage;