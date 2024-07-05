import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';



import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete"
import LeftBar from '../smallComponents/leftBar';
import ProfileBody from './smallComponents/courseDataBody';


// import DataFullScreen from './elements/about/dataFullScreen'




const Body: React.FC = () => {

    // const location = useLocation();

    // const renderContent = () => {
    //     switch (location.pathname) {
    //         case "/currentUser/professional":
    //             return  <DataFullScreen/> 
    //         default:
    //             return <></>;
    //     }
    // };

    return (
        <>
            <Bodycontainer flexDirection="row">
                {/* {renderContent()} */}
                <LeftBar />
                <ProfileBody />
            </Bodycontainer>
        </>
    );
};

export default Body;

