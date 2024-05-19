import React from 'react';
import styled from 'styled-components';

import BodyContainer from "../../ConnectUI_web/templetes/bodyTemplete";
import Poster from './smallComponents/poster';
import AddPhoneNumBody from '../../ConnectUI_web/containers/loginSignup/halfBody';
import AddPhoneNum from './smallComponents/addPhoneNum'
import BottomPhoneNum from './smallComponents/bottom';



const BodyPhoneNum: React.FC = () => {
    return (
        <BodyContainer flexDirection="row" position="absolute">
            <Poster/>
            <AddPhoneNumBody>      
                <AddPhoneNumContainer>
                    <AddPhoneNum/>
                </AddPhoneNumContainer>   
                <BottomPhoneNum flex={3} />
            </AddPhoneNumBody>
        </BodyContainer>
    );
}

export default BodyPhoneNum;

const AddPhoneNumContainer = styled.div`
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