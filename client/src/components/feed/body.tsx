import React, { useState } from 'react';



import Bodycontainer from "../ConnectUI_web/templetes/bodyTemplete"
import LeftBar from './smallComponents/leftBar';
import MainFeed from './smallComponents/feed';
import RightBar from './smallComponents/rightBar';

import Stories from "./elements/stories"

import { StoriesPageProvider } from '../../contexts/stories/storiesContext';

const Body: React.FC = () => {



    return (
        <>
            <StoriesPageProvider>
                <Bodycontainer flexDirection="row">
                    <Stories />
                    <LeftBar />
                    <MainFeed />
                    <RightBar />
                </Bodycontainer>
            </StoriesPageProvider>
        </>
    );
};

export default Body;


