import React from 'react';

import PageContainer from '../../../components/ConnectUI_web/templetes/pageTemplete'
import Header from '../../../components/loginSignup/selectLanguage/headerSelectLang';
import Background1 from '../../../components/ConnectUI_web/backgrounds/background1/background1';
import Body from '../../../components/loginSignup/selectLanguage/bodySelectLang'
import Copyright from '../../../components/ConnectUI_web/common/copyright/Copyright';


const SelectLanguagePage: React.FC = () => {

    return (
        <>
            <PageContainer fadeIn={true} variant = {"fit"}>
                <Background1 />
                <Header/>
                <Body />
            </PageContainer>
            <Copyright />
        </>
    );
};

export default SelectLanguagePage;

