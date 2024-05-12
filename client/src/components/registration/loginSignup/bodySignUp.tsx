import React from 'react';
import styled from 'styled-components';

import BodyContainer from "../../ConnectUI_web/templetes/bodyTemplete";
import Poster from './smallComponents/poster';
import SignupBody from '../../ConnectUI_web/containers/loginSignup/halfBody';
import SignupNonEmail from './smallComponents/signUp';
import BottomSignup from './smallComponents/bottom';



const BodySignup: React.FC = () => {
    return (
        <BodyContainer flexDirection="row" position="absolute">
            <Poster/>
            <SignupBody>      
                <SignupContainer>
                    <SignupNonEmail />
                </SignupContainer>   
                <BottomSignup flex={3} />
            </SignupBody>
        </BodyContainer>
    );
}

export default BodySignup;

const SignupContainer = styled.div`
    flex: 8;
    width: 70%;
    @media (max-width: 1920px) {  
        width: 60%; 
    }
    @media (max-width: 1440px) {  
        width: 70%;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
`