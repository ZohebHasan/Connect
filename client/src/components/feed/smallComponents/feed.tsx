import React, { useState} from 'react';
import styled from 'styled-components';

import FeedContainer from '../../ConnectUI_web/templetes/bodyTemplete';

import StoryScroller from '../elements/storyBar';

const MainFeed: React.FC= () => {

    return (
        <>
            <FeedContainer flexDirection= {"column"} flex = {4}>
                <StoryScroller/>
                <Temp>
                    .
                </Temp>
            </FeedContainer>

        </>
    );
};

export default MainFeed;

const Temp = styled.div`
    width: 100%;
    background-color: red;
`