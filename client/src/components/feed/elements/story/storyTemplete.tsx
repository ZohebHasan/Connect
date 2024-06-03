import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';


import PlayDark from '../../assets/storyPlayDark.png';
import PauseDark from '../../assets/storyPauseDark.png';

import StoryOptionDark from '../../assets/storyOptionsDark.png';

import SoundIcon from '../../assets/soundIcon.png';
import MuteIcon from '../../assets/muteIcon.png';

import NotLikedDark from '../../assets/notLikedDark.png';
import Liked from '../../assets/likedIcon.png';

import ShareIcon from '../../assets/share.png';

import StoryReplyBox from './storyReply/storyReplyBox';

interface StoryTempleteProps {
    userName: string;
    userPhoto: string;
    isActive: boolean;
}

const StoryTemplete: React.FC<StoryTempleteProps> = ({ userName, userPhoto, isActive }) => {
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
            {isActive ? (
                <>
                    <StoryTempleteContainer>


                        <Top>
                            <DurationContainer>
                                <DurationBarWrapper>
                                    <DurationBar />
                                </DurationBarWrapper>
                            </DurationContainer>
                            <HeaderContainer>
                                <UserAndTimeContainer>
                                    <Wrapper>
                                        <User>
                                            <AvatarContainer>
                                                <Avatar src={userPhoto} />
                                            </AvatarContainer>
                                            <UserNameContainer>
                                                <UserName>{truncateText(userName, 11)}</UserName>
                                            </UserNameContainer>
                                        </User>
                                        <UploadTimeContainer>
                                            <UploadTime>2h ago</UploadTime>
                                        </UploadTimeContainer>
                                    </Wrapper>
                                </UserAndTimeContainer>
                                <ControlAndOptions>
                                    <MuteButtonContainer>
                                        <SmallIconButton src={isMute ? MuteIcon : SoundIcon} />
                                    </MuteButtonContainer>
                                    <PlayButtonContainer>
                                        <PlayPauseButton src={isPlaying ? PlayDark : PauseDark} />
                                    </PlayButtonContainer>
                                    <OptionButtonContainer>
                                        <OptionButtonWrapper>
                                            <MediumIconButton src={StoryOptionDark} />
                                        </OptionButtonWrapper>
                                    </OptionButtonContainer>
                                </ControlAndOptions>
                            </HeaderContainer>
                        </Top>
                        <Bottom>
                            <BottomWrapper>
                                <EmptyContainer />
                                <ButtonsContainer>
                                    <ReactIconContainer>
                                        <IconButton src={liked ? Liked : NotLikedDark} />
                                    </ReactIconContainer>
                                    <ShareIconContainer>
                                        <IconButton src={ShareIcon} />
                                    </ShareIconContainer>
                                </ButtonsContainer>
                                <ReplyBoxContainer>
                                    <StoryReplyBox
                                        id="story-reply"
                                        label="Reply to user"
                                        value={reply}
                                        onChange={handleReplyChange}
                                        width="90%"
                                    />
                                </ReplyBoxContainer>
                            </BottomWrapper>
                        </Bottom>
                    </StoryTempleteContainer>
                </>
            ) : (
                <InactiveStoryContainer>
                    <InactiveAvatarContainer>
                        <Avatar src={userPhoto} />
                    </InactiveAvatarContainer>
                    <InactiveUploadTimeContainer>
                        <UserName>{truncateText(userName, 11)}</UserName>
                        <UploadTime>2h ago</UploadTime>
                    </InactiveUploadTimeContainer>
                </InactiveStoryContainer>

            )}
        </>
    );
};

export default StoryTemplete;

const StoryTempleteContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

const InactiveUploadTimeContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
`


const InactiveAvatarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const InactiveStoryContainer = styled.div`
    flex: 1;    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.9rem

`

const fillAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const hoverScale = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`;

const clickScale = keyframes`
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const HoverEffect = css`
  cursor: pointer;
  &:hover {
    animation: ${hoverScale} 0.2s forwards;
  }
  &:active {
    animation: ${clickScale} 0.2s forwards;
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const DurationBar = styled.div`
  background-color: #cd2272;
  animation: ${fillAnimation} 5s linear;
  color: transparent;
  height: 0.1rem;
`;

const IconButton = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  ${HoverEffect}
`;

const SmallIconButton = styled(IconButton)`
  width: 1.5rem;
  height: 1.5rem;
`;

const MediumIconButton = styled(IconButton)`
  width: 1.3rem;
  height: 1.3rem;
`;

const PlayPauseButton = styled(IconButton)`
  width: 1.2rem;
  height: 1.2rem;
`;

const DurationBarWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 90%;
  height: 100%;
`;

const DurationContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.5rem;
  height: 0.7rem;
`;

const EmptyContainer = styled.div`
  flex: 2;
`;

const Bottom = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const BottomWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 90%;
`;

const ShareIconContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReactIconContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReplyBoxContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MuteButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
`;

const UploadTimeContainer = styled.div`
  display: flex;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  ${HoverEffect}
`;

const OptionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: flex-start;
`;

const OptionButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ControlAndOptions = styled.div`
  flex: 1.3;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const UploadTime = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
  color: #797979;
`;

const UserName = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: white;
`;

const PlayButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const UserNameContainer = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const AvatarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Top = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const UserAndTimeContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
