import React from 'react';
import styled from 'styled-components';

import BodyContainer from "../../ConnectUI_web/templetes/bodyTemplete";
import Poster from './smallComponents/poster';
import LoginBody from '../../ConnectUI_web/containers/loginSignup/halfBody';
import Login from './smallComponents/login';
import BottomLogin from './smallComponents/bottom';


const Body: React.FC = () => {
    return (
        <BodyContainer flexDirection="row" position="absolute">
            <Poster />
            <LoginBody>
                <LoginContainer>
                    <Login/>
                </LoginContainer>
                <BottomLogin flex={1.5} />
            </LoginBody>
        </BodyContainer>
    );
};

export default Body;


const LoginContainer = styled.div`
    flex: 9;
    width: 70%;
    @media (max-width: 1920px) {  
        width: 60%; 
    }
    display: flex;
    flex-direction: column;
    align-items: center;
`;