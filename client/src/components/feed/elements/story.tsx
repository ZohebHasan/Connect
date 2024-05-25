import React, { useRef, useState, useEffect } from 'react';

import { useDarkMode } from "../../../contexts/DarkMode/DarkMode"
import styled from 'styled-components';
import Text from '../../ConnectUI_web/common/texts/static';
import Personal from "../dummies/personal.jpeg"

import PlayLight from "../assets/storyPlayLight.png"
import PlayDark from "../assets/storyPlayDark.png"
import PauseLight from "../assets/storyPauseLight.png"
import PauseDark from "../assets/storyPauseDark.png"

import StoryOptionDark from "../assets/storyOptionsDark.png"
import StoryOptionLight from "../assets/storyOptionsLight.png"

import PlayPauseButton from "../containers/buttonLogo"

const StoryTemplete: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    return (
        <>

            <Top>
                <DurationContainer>
                    duration bar
                </DurationContainer>

                <HeaderContainer>

                    <UserAndTimeContainer>
                        <AvatarContainer>
                            <Avatar src={Personal} />
                        </AvatarContainer>
                        <UserNameContainer>
                            <Text variant={"normal"} size={"1rem"} fontWeight={"300"} >zohebhasan</Text>
                            <Text variant={"transparent"} size={"0.8rem"} fontWeight={"300"} >2h</Text>
                        </UserNameContainer>
                    </UserAndTimeContainer>


                    <ControlAndOptions>
                        {/* <PlayButtonContainer> */}
                            <PlayPauseButton
                                lightModeLogo={PlayLight}
                                darkModeLogo={PlayDark}
                                activeDarkLogo={PauseDark}
                                activeLightLogo={PauseLight}
                                isActive={false}
                                size={1}
                            />
                        {/* </PlayButtonContainer> */}
                        <OptionButtonContainer>
                            <OptionButton src={isDarkMode ? StoryOptionDark : StoryOptionLight} />
                        </OptionButtonContainer>

                    </ControlAndOptions>

                </HeaderContainer>
            </Top>
            <Bottom>
                this is bottom
            </Bottom>
        </>
    );
}

export default StoryTemplete

const OptionButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`


const PlayButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`


const OptionButton = styled.img`
    width: 1.3rem;
    height: 1.3rem;
  
`


const UserNameContainer = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* background-color: blue; */
    width: 100%;
    gap: 0.6rem;
`

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  
`

const AvatarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: orange; */
`


const Top = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Bottom = styled.div`
    flex: 1;
    background-color: green;
`

const DurationContainer = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
width: 90%;
/* background-color: blue; */

`

const ControlAndOptions = styled.div`
  flex: 1;
  background-color: yellow;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const UserAndTimeContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  /* background-color: green; */
  
`

const HeaderContainer = styled.div`
flex: 1;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
/* background-color: red; */
width: 100%;

`