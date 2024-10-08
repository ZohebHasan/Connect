import React from 'react';
import styled from 'styled-components';

import BodyContainer from "../../ConnectUI_web/templetes/bodyTemplete";
import Poster from './smallComponents/poster';
import HalfBody from '../../ConnectUI_web/containers/loginSignup/halfBody';
import UserInfo from './smallComponents/ageVerification';
import Bottom from './smallComponents/bottom';
import DatePicker from './elements/datePicker';


const Body: React.FC = () => {
    return (
        <BodyContainer flexDirection="row" position="absolute">
            <Poster/>
            <HalfBody>      
                <Container>
                    <UserInfo />
                </Container>   
                <Bottom flex={1} />
            </HalfBody>
        </BodyContainer>
    );
}

export default Body;

const Container = styled.div`
    flex: 3;
    width: 80%;
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