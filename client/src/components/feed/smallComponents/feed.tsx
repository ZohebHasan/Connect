import React, { useState } from 'react';
import styled from 'styled-components';

import { FilterProvider } from '../../../contexts/feed/filters/filtersContext';

import FeedContainer from '../../ConnectUI_web/templetes/bodyTemplete';

import FeedHeader from '../elements/feed/feedHeader';
import StoryScroller from '../elements/story/storyBar';

import FilterBar from "../elements/feed/filterBar"



import PersonalPost from '../elements/posts/personalPostTemplate';
import ProfessionalPost from '../elements/posts/professionalPostTemplate';
import SchoolPost from '../elements/posts/schoolPostTemplate';



const MainFeed: React.FC = () => {

    return (
        <>
            <FeedContainer flexDirection={"column"} flex={3.5}>
                <FilterProvider>
                    <FilterBarContainer>
                        <FilterBar />
                    </FilterBarContainer>

                    <FeedWrapper>

                        <FeedHeader />
                        <StoryScroller />
                        <PersonalPost
                            userName={'adnan'}
                            isVarified={true}
                            bodyType={"clip"}
                        />
                        <PersonalPost
                            userName={'adnan'}
                            isVarified={true}
                            bodyType={"post"}
                        />

                        <PersonalPost
                            userName={'adnan'}
                            isVarified={true}
                            bodyType={"chirp"}
                        />
                        <ProfessionalPost
                            userName={'adnan'}
                            isVarified={true}
                            bodyType={"chirp"}
                        />
                        <ProfessionalPost
                            userName={'adnan'}
                            isVarified={true}
                            bodyType={"post"}
                        />

                        <SchoolPost
                            userName={'adnan'}
                            isVarified={true}
                            bodyType={"chirp"}
                        />
                           <SchoolPost
                            userName={'adnan'}
                            isVarified={true}
                            bodyType={"post"}
                        />



                    </FeedWrapper>
                </FilterProvider>


            </FeedContainer>

        </>
    );
};

export default MainFeed;



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
    box-sizing: border-box;
    width: 100%;

`