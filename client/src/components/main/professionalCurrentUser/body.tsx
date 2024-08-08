import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete";
import LeftBar from '../smallComponents/leftBar';
import ProfileBody from './smallComponents/profileBody';
import DataFullScreen from './elements/about/dataFullScreen';
import Header from "../elements/header";

const Body: React.FC = () => {
    const location = useLocation();
    const { username } = useParams<{ username: string }>();

    const renderContent = () => {
        const professionalPath = `/professional/${username}`;

        switch (location.pathname) {
            case professionalPath:
                return <DataFullScreen />;
            default:
                return <></>;
        }
    };

    return (
        <>
            <Bodycontainer flexDirection="row">
                {renderContent()}
                <Header />
                <LeftBar />
                <ProfileBody />
            </Bodycontainer>
        </>
    );
};

export default Body;
