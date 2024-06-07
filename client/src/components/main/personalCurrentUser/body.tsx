import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';



import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete"
import LeftBar from '../smallComponents/leftBar';
import ProfileBody from './smallComponents/profileBody';

import PixelFullScreen from "./elements/profilePosts/pixels/pixelFullScreen"
import ClipFullScreen from "./elements/profilePosts/clips/clipsFullScreen"




const Body: React.FC = () => {
    const location = useLocation();

    const renderContent = () => {
        switch (location.pathname) {
            case "/currentUser/personal":
                return <PixelFullScreen />;
            case "/currentUser/personal/clips":
                return <ClipFullScreen/>;
            default:
                return <></>;
        }
    };



    return (
        <>
            <Bodycontainer flexDirection="row">
                {renderContent()}
                <LeftBar />
                <ProfileBody />
            </Bodycontainer>
        </>
    );
};

export default Body;


