import React, { useRef, useState, useEffect } from 'react';

import { useDarkMode } from "../../../contexts/DarkMode/DarkMode"
import styled from 'styled-components';
import Text from '../../ConnectUI_web/common/texts/static';
import Personal from "../dummies/personal.jpeg"


import PlayDark from "../assets/storyPlayDark.png"
import PauseDark from "../assets/storyPauseDark.png"
import StoryOptionDark from "../assets/storyOptionsDark.png"

import SoundIcon from "../assets/soundIcon.png"
import MuteIcon from "../assets/muteIcon.png"


import StoryReplyBox from "./storyReply/storyReplyBox"

import NotLikedDark from "../assets/NotLikedDark.png";
import Liked from "../assets/likedIcon.png";

import ShareIcon from "../assets/share.png"

const StoryTemplete: React.FC = () => {

    const isPlaying = true;
    const isMute = false;
    const liked = false;

    const [reply, setReply] = useState('');

    const handleReplyChange = (value: string) => {
        setReply(value);
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };
    return (
        <>

            <Top>
                <DurationContainer>
                    duration bar
                </DurationContainer>

                <HeaderContainer>

                    <UserAndTimeContainer>
                        <Wrapper>
                            <User>
                                <AvatarContainer>
                                    <Avatar src={Personal} />
                                </AvatarContainer>
                                <UserNameContainer>
                                    <UserName>{truncateText('@zohebhasan', 11)}</UserName>
                                </UserNameContainer>
                            </User>
                            <UploadTimeContainer>
                                <UploadTime>2h ago</UploadTime>
                            </UploadTimeContainer>
                        </Wrapper>
                    </UserAndTimeContainer>

                    <ControlAndOptions>
                        <MuteButtonContainer>
                            <MuteButton src={isMute ? MuteIcon : SoundIcon} />
                        </MuteButtonContainer>
                        <PlayButtonContainer>
                            <PlayPauseButton src={isPlaying ? PlayDark : PauseDark} />
                        </PlayButtonContainer>
                        <OptionButtonContainer>
                            <OptionButtonWrapper>
                                <OptionButton src={StoryOptionDark} />
                            </OptionButtonWrapper>
                        </OptionButtonContainer>

                    </ControlAndOptions>

                </HeaderContainer>
            </Top>
            <Bottom>
                <BottomWrapper>
                    <ReplyBoxContainer>
                        <StoryReplyBox
                            id="story-reply"
                            label="Reply to user"
                            value={reply}
                            onChange={handleReplyChange}
                            width="90%"
                        />
                    </ReplyBoxContainer>
                    <ButtonsContainer>
                        <ReactIconContainer>
                            <ReactIcon src={liked ? Liked : NotLikedDark} />
                        </ReactIconContainer>
                        <ShareIconContainer>
                            <ShareButton src={ShareIcon} />
                        </ShareIconContainer>
                    </ButtonsContainer>
                </BottomWrapper>
            </Bottom>
        </>
    );
}

export default StoryTemplete

const Bottom = styled.div`
    flex: 1;
    /* background-color: green; */
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`

const BottomWrapper = styled.div`
    
    /* background-color: green; */
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    
`

const ShareButton = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`


const ReactIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;

    
`

const ButtonsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* background-color: orange; */
`




const ShareIconContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: blue; */
`

const ReactIconContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: pink; */
`

const ReplyBoxContainer = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: yellow; */
`

const MuteButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 100%; */
    /* background-color: red; */
    
`
const MuteButton = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  &:hover {
    transform: scale(1.10);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`

const Wrapper = styled.div`
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.8rem;
`

const UploadTimeContainer = styled.div`
    display: flex;
    /* width: 100%; */
`

const User = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
    /* width: 100%; */
    gap: 0.5rem;

    cursor: pointer;
    &:hover {
        transform: scale(1.10);
    }
    &:active {
        transform: scale(1.00);
    }
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`

const OptionButton = styled.img`
    width: 1.3rem;
    height: 1.3rem;
    cursor: pointer;
  &:hover {
    transform: scale(1.10);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
  
`
const OptionButtonWrapper = styled.div`
     display: flex;
    align-items: center;
    width: 80%;
    justify-content: flex-start;
`

const OptionButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* background-color: green; */
`

const ControlAndOptions = styled.div`
  flex: 1.3;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* background-color: blue; */
`



const PlayPauseButton = styled.img`
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  &:hover {
    transform: scale(1.10);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`

const UploadTime = styled.p`
    font-size: 0.8rem;
    font-weight: 300;
    color: #797979;
`

const UserName = styled.p`
    font-size: 1rem;
    font-weight: 300;
    color: white;
`

const PlayButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: pink; */

    width: 100%;
`





const UserNameContainer = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
 
    
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



const DurationContainer = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
width: 90%;
/* background-color: blue; */

`



const UserAndTimeContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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