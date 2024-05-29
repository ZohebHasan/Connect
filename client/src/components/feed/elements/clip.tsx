import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PlayDark from '../assets/storyPlayDark.png';
import PauseDark from '../assets/storyPauseDark.png';
import StoryOptionDark from '../assets/storyOptionsDark.png';
import SoundIcon from '../assets/soundIcon.png';
import MuteIcon from '../assets/muteIcon.png';
import NotLikedDark from '../assets/NotLikedDark.png';
import Liked from '../assets/likedIcon.png';
import ShareIcon from '../assets/share.png';
import StoryReplyBox from './storyReply/storyReplyBox';

import VerifiedIcon from "../assets/verified.png"
import Text from '../../ConnectUI_web/common/texts/static';
import DummyVideo1 from "../dummies/dummyVideo1.mp4"

import CommentLight from "../assets/commentsLight.png"
import CommentDark from "../assets/commentsDark.png"

import Adnan from "../dummies/Adnan.jpeg"
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
const VerifiedBadge: React.FC = () => {
    const isVarified: boolean = true;
    return (
        <>
            <VerifiedBadgeContainer>
                <StyledLogo src={VerifiedIcon} alt="Logo" />
            </VerifiedBadgeContainer>
        </>
    )

}

interface ClipTempleteProps {
    userName: string;
    // userPhoto: string;
}

const ClipTemplete: React.FC<ClipTempleteProps> = ({ userName }) => {
    const isPlaying = true;
    const isMute = false;
    const liked = false;
    const [reply, setReply] = useState('');
    const isVarified: boolean = true;
    const { isDarkMode } = useDarkMode();

    const handleReplyChange = (value: string) => {
        setReply(value);
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };

    return (
        <>

            <ClipsTemplete>
                <ClipsTempleteWrapper >
                    <Top>
                        <HeaderContainer>
                            <UserAndTimeContainer>
                                <Wrapper>
                                    <User>
                                        <AvatarContainer>
                                            <Avatar src={Adnan} />
                                        </AvatarContainer>
                                        <UserNameContainer>
                                            <Text variant={"normal"} size={"1rem"} fontWeight='300'>{truncateText(userName, 11)}</Text>
                                            {isVarified ? <VerifiedBadge /> : <></>}

                                        </UserNameContainer>
                                    </User>
                                    <UploadTimeContainer>
                                        <Text variant={"transparent"} size={"0.8rem"} fontWeight='300'>2h ago</Text>
                                    </UploadTimeContainer>
                                </Wrapper>
                            </UserAndTimeContainer>
                            <ControlAndOptions>

                                <OptionButtonContainer>
                                    <OptionButtonWrapper>
                                        <MediumIconButton src={StoryOptionDark} />
                                    </OptionButtonWrapper>
                                </OptionButtonContainer>
                            </ControlAndOptions>
                        </HeaderContainer>
                    </Top>
                    <ClipContainer>
                        <StyledVideo autoPlay loop muted playsInline controls={false} >
                            <source src={DummyVideo1} type="video/mp4" />
                        </StyledVideo>
                    </ClipContainer>

                    <Bottom>
                        <BottomWrapper>

                            <ButtonsContainer>


                                <IconButton src={liked ? Liked : NotLikedDark} />
                                <IconButton src= {CommentDark}/>
                                <IconButton src={ShareIcon} />

                            </ButtonsContainer>

                        </BottomWrapper>
                    </Bottom>

                </ClipsTempleteWrapper>
            </ClipsTemplete>
        </>
    );
};

export default ClipTemplete;

const ClipsTemplete = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    width: 100%;
`

const ClipsTempleteWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* margin: 1rem; */
    width: 95%;
    background-color: green;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: orange;
  margin-bottom: 1rem;

`;

const HeaderContainer = styled.div`
  /* flex: 1; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  
`;


const CaptionWrapper = styled.div`
`

const CaptionContainer = styled.div`
    /* flex: 2; */
    display: flex;
    width: 95%;
    align-items: center;
    justify-content: flex-start;
    background-color: red;
`



const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* display: flex;
    align-items: center;
    justify-content: center; */

`;

const ClipContainer = styled.div` //this guy stores the clip
    display: flex; 
    width: 45%;
    height: auto;
    align-items: center;
    justify-content: center;
`


const VerifiedBadgeContainer = styled.div`
    display: flex;
    // flex: 1;
    align-items: flex-start;
    // justify-content: center;
    // width: 100%;
    // height: 100%;
    // background-color: pink;
`

const StyledLogo = styled.img`
    width: 1.6rem;
    height: 1.6rem;

`;





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

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: blue;
  margin-top: 1rem;
`;

const BottomWrapper = styled.div`

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
 
`;

const ButtonsContainer = styled.div`
  /* flex: 1; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  gap: 1.5rem;
`;

const ShareIconContainer = styled.div`
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReactIconContainer = styled.div`
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: pink;
  width: 3rem;
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
  width: 70%;
  justify-content: flex-end;
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
  flex-direction: row;
  gap: 0.3rem;
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



const UserAndTimeContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;