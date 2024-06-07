import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import VolumeLight from "../../../../assets/volumeLight.png";
import VolumeDark from "../../../../assets/volumeDark.png";
import MuteLight from "../../../../assets/muteLight.png";
import MuteDark from "../../../../assets/muteDark.png";
import PlayDark from '../../../../assets/storyPlayDark.png';
import PlayLight from '../../../../assets/storyPlayLight.png';
import PauseDark from '../../../../assets/storyPauseDark.png';
import PauseLight from '../../../../assets/storyPauseLight.png';

import { Media } from '../mediaType';

interface ClipProps {
  media: Media[];
}

const ClipComponent: React.FC<ClipProps> = ({ media }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const { isDarkMode } = useDarkMode();

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMute;
      setIsMute(!isMute);
    }
  };

  const handleMouseDown = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseUp = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <ClipContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {isHovered && (
        <VideoControllingButtons>
          <ControllerButtonsWrapper>
            <PlayButtonContainer onClick={handlePlayPause}>
              <PlayPauseButton src={isPlaying ? (isDarkMode ? PauseDark : PauseLight) : (isDarkMode ? PlayDark : PlayLight)} />
            </PlayButtonContainer>
            <MuteButtonContainer onClick={handleMute}>
              <SmallIconButton src={isMute ? (isDarkMode ? MuteDark : MuteLight) : (isDarkMode ? VolumeDark : VolumeLight)} />
            </MuteButtonContainer>
          </ControllerButtonsWrapper>
        </VideoControllingButtons>
      )}
      <StyledVideo
        ref={videoRef}
        autoPlay
        loop
        muted={isMute}
        controls={false}
      >
        <source src={media[0].url} type="video/mp4" />
      </StyledVideo>
    </ClipContainer>
  );
};

export default ClipComponent;

const ControllerButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const VideoControllingButtons = styled.div`
  display: flex;
  position: absolute;
  align-items: flex-start;
  justify-content: flex-end;
  width: 90%;
  height: 95%;
  z-index: 1;
`;

const ClipContainer = styled.div`
  display: flex;
  width: 45%;
  padding-top: 80%; /* 16:9 aspect ratio */
  position: relative;
  margin-bottom: 1rem;
  overflow: hidden;
  align-items: center;
  justify-content: center;
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
  opacity: 0.5;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
  &:hover {
    animation: ${hoverScale} 0.2s forwards;
    opacity: 1;
  }
  &:active {
    animation: ${clickScale} 0.2s forwards;
  }
`;

const IconButton = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  ${HoverEffect}
`;

const PlayPauseButton = styled(IconButton)`
  width: 1.2rem;
  height: 1.2rem;
`;

const SmallIconButton = styled(IconButton)`
  width: 1.2rem;
  height: 1.2rem;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MuteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
