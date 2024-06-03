import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import Dummy1 from '../../../dummies/dummyPhotoPortrait1.png';
import Dummy2 from '../../../dummies/dummyPhotoPortrait2.png';
import Dummy3 from '../../../dummies/dummyPhotoPortrait3.png';
import Dummy4 from '../../../dummies/dummyPhotoPortrait4.png';

import DummyVideo from '../../../dummies/dummyVideoPortrait.mp4';

import PrevLight from '../../../assets/prevLight.png';
import PrevDark from '../../../assets/prevDark.png';

import NextLight from '../../../assets/nextLight.png';
import NextDark from '../../../assets/nextDark.png';

import VolumeLight from "../../../assets/volumeLight.png";
import VolumeDark from "../../../assets/volumeDark.png";

import MuteLight from "../../../assets/muteLight.png";
import MuteDark from "../../../assets/muteDark.png";

import PlayDark from '../../../assets/storyPlayDark.png';
import PlayLight from '../../../assets/storyPlayLight.png';

import PauseDark from '../../../assets/storyPauseDark.png';
import PauseLight from '../../../assets/storyPauseLight.png';

const media = [
  { type: 'image', src: Dummy1 },
  { type: 'image', src: Dummy2 },
  { type: 'image', src: Dummy3 },
  { type: 'image', src: Dummy4 },
  { type: 'video', src: DummyVideo }
];

const MediaScroller: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handlePreviousMedia = () => {
    if (currentMediaIndex > 0) {
      setDirection('left');
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const handleNextMedia = () => {
    if (currentMediaIndex < media.length - 1) {
      setDirection('right');
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

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

  return (
    <MediaScrollerContainer>

      <MediaContainer>
        {currentMediaIndex > 0 && (
          <NavigationButtonLeft onClick={handlePreviousMedia} $isDarkMode={isDarkMode}>
            <NavigationIcon src={isDarkMode ? PrevDark : PrevLight} alt="Previous Media" />
          </NavigationButtonLeft>
        )}

        <MediaWrapper
          key={currentMediaIndex}
          direction={direction}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          >
          {media[currentMediaIndex].type === 'image' ? (
            <CurrentImage src={media[currentMediaIndex].src} alt="Current Media" />
          ) : (
            <Videowrapper>
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
              <CurrentVideo
                ref={videoRef}
                autoPlay
                loop
                muted={isMute}
                controls={false}
                onMouseDown={() => {
                  videoRef.current?.pause();
                  setIsPlaying(false);
                }}
                onMouseUp={() => {
                  videoRef.current?.play();
                  setIsPlaying(true);
                }}
              >
                <source src={media[currentMediaIndex].src} type="video/mp4" />
                Your browser does not support the video tag.
              </CurrentVideo>
            </Videowrapper>
          )}
        </MediaWrapper>
        
        {currentMediaIndex < media.length - 1 && (
          <NavigationButtonRight onClick={handleNextMedia} $isDarkMode={isDarkMode}>
            <NavigationIcon src={isDarkMode ? NextDark : NextLight} alt="Next Media" />
          </NavigationButtonRight>
        )}
        <DotsIndicatorContainer>
          {media.map((_, index) => (
            <Dot
              key={index}
              $isDarkMode={isDarkMode}
              isActive={index === currentMediaIndex}
            />
          ))}
        </DotsIndicatorContainer>
      </MediaContainer>

    </MediaScrollerContainer>
  );
};

export default MediaScroller;

const VideoControllingButtons = styled.div`
  display: flex;
  position: absolute;
  align-items: flex-start;
  justify-content: flex-end;
  width: 90%;
  z-index: 1;
  top: 0.5rem;
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

const SmallIconButton = styled(IconButton)`
  width: 1.2rem;
  height: 1.2rem;
`;

const PlayPauseButton = styled(IconButton)`
  width: 1.2rem;
  height: 1.2rem;
`;

const MuteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ControllerButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const Videowrapper = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-30%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  0% {
    transform: translateX(30%);
  }
  100% {
    transform: translateX(0);
  }
`;

const MediaScrollerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 1rem;
`;

const MediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 60%;
  position: relative;
`;

const MediaWrapper = styled.div<{ direction: 'left' | 'right' }>`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border: 1px solid transparent;
  animation: ${({ direction }) => (direction === 'left' ? slideInFromLeft : slideInFromRight)} 0.5s ease;
`;

const CurrentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const CurrentVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const NavigationButton = styled.button<{ $isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(194, 194, 194, 0.778)' : 'rgba(200, 200, 200, 0.5)')};
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;

  &:hover {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(201, 201, 201, 0.843)' : 'rgba(131, 131, 131, 0.7)')};
    animation: ${hoverScale} 0.2s forwards;
  }

  &:active {
    animation: ${clickScale} 0.2s forwards;
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(187, 187, 187, 0.876)' : 'rgba(79, 79, 79, 0.7)')};
  }
`;

const NavigationButtonLeft = styled(NavigationButton)`
  left: 1rem;
`;

const NavigationButtonRight = styled(NavigationButton)`
  right: 1rem;
`;

const NavigationIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

const DotsIndicatorContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 1; 
`;

const Dot = styled.div<{ isActive: boolean; $isDarkMode: boolean }>`
  width: ${({ isActive }) => (isActive ? '0.6rem' : '0.3rem')};
  height: ${({ isActive }) => (isActive ? '0.6rem' : '0.3rem')};
  background-color: ${({ isActive, $isDarkMode }) => (isActive ? ($isDarkMode ? '#e6e6e6f6' : '#2727279e') : ($isDarkMode ? '#e7e7e7' : '#e6e6e6;'))};
  border-radius: 50%;
  transition: all 0.5s ease;
`;
