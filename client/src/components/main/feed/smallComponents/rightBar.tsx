import React, { useState } from 'react';
import styled from 'styled-components';


import RightBarContainer from '../../../ConnectUI_web/templetes/bodyTemplete';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

import DarkLightToggle from '../../../ConnectUI_web/common/darkLightToggle/darkLightToggle';
import Text from '../../../ConnectUI_web/common/texts/static';

import SuggestedUser from "../elements/suggestedPeople/peopleTemplate"
import SuggestedJob from "../elements/suggestedJobs/jobTemplate";
import ConnaButton from '../../../ConnectUI_web/common/conna/connaButton';


const RightBar: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    return (
        <>
            <RightBarContainer flexDirection={"column"} flex={2}>
                <TopContainer>
                    {/* <DarkLightToggle /> */}
                </TopContainer>

                <SuggestedPeopleContainer>
                    <TextAndLinkContainer>
                        <TextContainer>
                            <Text variant={"transparent"} fontWeight={"400"} size={"1.1rem"}>Suggested profiles</Text>
                        </TextContainer>
                        <SeeAllContainer>
                            <StyledLink $isDarkMode={isDarkMode}>See more</StyledLink>
                        </SeeAllContainer>
                    </TextAndLinkContainer>
                    <PeopleBodyContainer>
                        <PeopleWrapper>
                            <SuggestedUser suggestedProfile={"personal"} />
                            <SuggestedUser suggestedProfile={"school"} />
                            <SuggestedUser suggestedProfile={"professional"} />
                        </PeopleWrapper>
                    </PeopleBodyContainer>
                </SuggestedPeopleContainer>

                <SuggestedJobsContainer>
                    <TextAndLinkContainer>
                        <TextContainer>
                            <Text variant={"transparent"} fontWeight={"400"} size={"1.1rem"}>Jobs for you</Text>
                        </TextContainer>
                        <SeeAllContainer>
                            <StyledLink $isDarkMode={isDarkMode}>See more</StyledLink>
                        </SeeAllContainer>
                    </TextAndLinkContainer>
                    <JobBodyContainer>
                        <JobWrapper>
                            <SuggestedJob/>
                            <SuggestedJob/>
                            <SuggestedJob/>
                        </JobWrapper>
                    </JobBodyContainer>
                </SuggestedJobsContainer>
                <ConnaContainer>
                    <ConnaButton/>
                </ConnaContainer>


            </RightBarContainer>

        </>
    );
};

export default RightBar;

const ConnaContainer = styled.div`
    display: flex;
    /* flex: 0.5; */
    align-items: center;
    justify-content: flex-end;
    /* background-color: red; */
    width: 100%;
`

const JobWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: red; */
    gap: 1rem;
`

const PeopleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: red; */
    gap: 0.5rem;
`

const StyledLink = styled.p<{ $isDarkMode: boolean }>`
  cursor: pointer;
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff' : '#000000')};
  font-size: 0.9rem;
  font-weight: 400;
  transition: transform 0.2s, color 0.2s;


  &:hover {
    transform: scale(1.05);
    color: ${({ $isDarkMode }) => ($isDarkMode ? '#bbbbbb' : '#555555')};
  }


  &:active {
    transform: scale(0.95);
  }
`;

const SeeAllContainer = styled.div`
    flex: 1;
    /* background-color: cyan; */
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
`

const TextContainer = styled.div`
    /* background-color: orange; */
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
`


const TextAndLinkContainer = styled.div`
    /* background-color: pink; */
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const PeopleBodyContainer = styled.div`
    display: flex;
    flex: 3;
    flex-direction: column;
    /* background-color: red; */
`
const JobBodyContainer = styled.div`
    display: flex;
    flex: 4;
    flex-direction: column;
    /* background-color: red; */
`


const SuggestedPeopleContainer = styled.div`
    display: flex;
    flex: 3;
    /* background-color: green; */
    width: 90%;
    flex-direction: column;
`

const TopContainer = styled.div`
    display: flex;
    flex: 0.5;
    width: 95%;
    align-items: center;
    justify-content: flex-end;
    /* background-color: red; */
    
`



const SuggestedJobsContainer = styled.div`
    display: flex;
    flex: 3;
    /* background-color: blue; */
    width: 90%;
    flex-direction: column;
    
`