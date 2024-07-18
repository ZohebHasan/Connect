import React, { useState } from 'react';



import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete"
import LeftBar from '../smallComponents/leftBar';
import MainFeed from './smallComponents/feed';
import RightBar from './smallComponents/rightBar';

import Stories from "./elements/story/stories"

import Create from '../smallComponents/createBar/createBar';

import Header from "../elements/header"

const Body: React.FC = () => {



    return (
        <>

            <Bodycontainer flexDirection="row">
                <Create/>
                <Header/>
                <Stories />
                <LeftBar />
                <MainFeed />
                <RightBar />
            </Bodycontainer>
        </>
    );
};

export default Body;


