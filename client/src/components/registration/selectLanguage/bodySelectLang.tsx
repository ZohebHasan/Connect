import React from 'react';

import BodyContainer from '../../ConnectUI_web/templetes/bodyTemplete';

import Top from './smallComponents/top'
import Bottom from './smallComponents/bottom'



const Body: React.FC = () => {
    return (
        <>
            <BodyContainer flexDirection = {"column"}>
                <Top />
                <Bottom />
            </BodyContainer>
        </>
    );
};

export default Body;


