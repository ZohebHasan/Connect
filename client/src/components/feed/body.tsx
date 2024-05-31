import React, { useState } from 'react';



import Bodycontainer from "../ConnectUI_web/templetes/bodyTemplete"
import LeftBar from './smallComponents/leftBar';
import MainFeed from './smallComponents/feed';
import RightBar from './smallComponents/rightBar';

import Stories from "./elements/story/stories"

import { useStories } from '../../contexts/stories/storiesContext';


const Body: React.FC = () => {

    const {isStoriesPageOpen} = useStories();

    

    return (
        <>

            <Bodycontainer flexDirection="row">

                <Stories />
                <LeftBar />
                <MainFeed />
                <RightBar />
            </Bodycontainer>

        </>
    );
};

export default Body;


