import React from 'react';

import PageContainer from '../../components/ConnectUI_web/templetes/pageTemplete'
import Background1 from '../../components/ConnectUI_web/backgrounds/background1/background1';

import Header from '../../components/loginSignup/common/headerVisible';
import Body from '../../components/loginSignup/agreement/bodyAgreement'

import Copyright from '../../components/ConnectUI_web/common/copyright/Copyright';


const AgreementPage: React.FC = () => {
   
    return (
        <>
            <PageContainer fadeIn={true} variant = {"fit"}>
                <Background1 />
                <Header/>
                <Body/>
            </PageContainer>
            <Copyright /> 
        </>
    );
};

export default AgreementPage;
