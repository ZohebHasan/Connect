import React, { useState } from 'react';
import styled from 'styled-components';
import Stories from '../containers/storyContainer';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import LargeStoryScroller from './fullScreenStory';
import Text from '../../ConnectUI_web/common/texts/static';



const StoriesContainer: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <Stories>
            {/* <EmptySpace>

            </EmptySpace> */}

            <LargeStoryScroller />


        </Stories>
    );
};

export default StoriesContainer;




const OptionsWrapper = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: red;
  // width: 100%;

`

const SettingsTextContainer = styled.div`
    display: flex;
    flex: 0.7;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    // background-color: blue;
`
const OptionsContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;  // Changed from center to flex-start to align children from top to bottom
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    // background-color: pink;
`

const EmptySpace = styled.div`
  flex: 0.8;
  // background-color: red;
  width: 100%;
`