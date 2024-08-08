import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';



import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete"
import LeftBar from '../smallComponents/leftBar';
import ProfileBody from './smallComponents/profileBody';

import Header from "../elements/header"






const Body: React.FC = () => {



    return (
        <>
            <Bodycontainer flexDirection="row">
                <Header/>
                <LeftBar />
                <ProfileBody />
            </Bodycontainer>
        </>
    );
};

export default Body;


