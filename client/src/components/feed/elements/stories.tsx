import React, { useState } from 'react';
import styled from 'styled-components';
import Stories from '../containers/storyContainer';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import LargeStoryScroller from './fullScreenStory';
import Text from '../../ConnectUI_web/common/texts/static';

import Logo from "../../ConnectUI_web/common/logo/logo"

import CloseDark from "../assets/closeDark.png"
import CloseLight from "../assets/closeLight.png"

const StoriesContainer: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <Stories>
            <TopContainer>
                <LogoContainer>
                    <LogoWrapper>
                        <Logo size={2} />
                    </LogoWrapper>

                </LogoContainer>
                <ClosingButtonContainer>
                    <ClosingButtonWrapper>
                        <ClosingButton src={isDarkMode ? CloseDark : CloseLight} />
                    </ClosingButtonWrapper>

                </ClosingButtonContainer>
            </TopContainer>
            <LargeStoryScroller />
        </Stories>
    );
};

export default StoriesContainer;

const ClosingButtonWrapper = styled.div`
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: flex-end;
    /* background-color: pink; */
    
`


const ClosingButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    /* background-color: blue; */
    flex: 1;
    width: 100%;  
`


const LogoWrapper = styled.div`
      width: 90%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
`

const LogoContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`


const ClosingButton = styled.img`
    width: 2rem;
    height: 2rem;
    
`

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

const TopContainer = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    top: 0;
    align-items: center;
    justify-content: center;
`