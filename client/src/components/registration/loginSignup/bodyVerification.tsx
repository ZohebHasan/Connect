import React from 'react';
import styled from 'styled-components';

import BodyContainer from "../../ConnectUI_web/templetes/bodyTemplete";
import Poster from './smallComponents/poster'
import VerificationBody from '../../ConnectUI_web/containers/loginSignup/halfBody';
import Verification from './smallComponents/verification';
import BottomVerification from './smallComponents/bottom';


const Body: React.FC = () => {
    return (
        <BodyContainer flexDirection="row" position="absolute">
            <Poster/>
            <VerificationBody>
                <VerificationContainer>
                    <Verification />
                </VerificationContainer>
                <BottomVerification flex={3} />
            </VerificationBody>
        </BodyContainer>
    );
}

export default Body;

const VerificationContainer = styled.div`
    flex: 7;
    width: 70%;
    @media (max-width: 1920px) {  
        width: 60%; 
    }
    display: flex;
    flex-direction: column;
    align-items: center;
`;