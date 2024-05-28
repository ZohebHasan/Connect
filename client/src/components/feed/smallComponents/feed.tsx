import React, { useState } from 'react';
import styled from 'styled-components';

import FeedContainer from '../../ConnectUI_web/templetes/bodyTemplete';

import FeedHeader from '../elements/feedHeader';
import FilterButtons from '../elements/feedFilter';
import StoryScroller from '../elements/storyBar';

import FilterBar from "../elements/filterBar"
import { FilterProvider } from '../../../contexts/feed/filters/filtersContext';

const MainFeed: React.FC = () => {

    return (
        <>
            <FeedContainer flexDirection={"column"} flex={4}>
                <FilterProvider>
                    <FilterBarContainer>
                        <FilterBar />
                    </FilterBarContainer>

                    <FeedWrapper>
                        <FeedHeader />
                        <StoryScroller />
                    </FeedWrapper>
                </FilterProvider>
                
                <PostContainer>

                </PostContainer>


            </FeedContainer>

        </>
    );
};

export default MainFeed;

const PostContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    width: 100%;
`;

const FilterBarContainer = styled.div`
    display: flex;
    width: 95%;
    align-items: center;
    justify-content: flex-end;
    
`


const FeedWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid rgba(235, 57, 137, 0.300);

    width: 100%;
    
    
`