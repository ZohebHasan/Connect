import React from 'react';
import styled from 'styled-components';

import BodyContainer from "../../ConnectUI_web/templetes/bodyTemplete";
import Poster from './smallComponents/poster';
import HalfBody from '../../ConnectUI_web/containers/loginSignup/halfBody';
import UserCredentials from './smallComponents/userCredentials';
import Bottom from './smallComponents/bottom';



const Body: React.FC = () => {
    return (
        <BodyContainer flexDirection="row" position="absolute">
            <Poster/>
            <HalfBody>      
                <Container>
                    <UserCredentials />
                </Container>   
                <Bottom flex={1.7} />
            </HalfBody>
        </BodyContainer>
    );
}

export default Body;

const Container = styled.div`
    flex: 8;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
`