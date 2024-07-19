import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';
import PostAsIcons from "./postAsIcons";
import IconButton from "../../../../containers/buttonLogo";
import CloseLight from "../../../../../assets/closeProfilesLight.png";
import CloseDark from "../../../../../assets/closeProfilesDark.png";
import OpenLight from "../../../../../assets/openLight.png";
import OpenDark from "../../../../../assets/openDark.png";
import { useCreateBar } from '../../../../../../contexts/leftBar/createBarContext';

const PixelAndClip: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { isPostingAsBarOpen, togglePostingAsBar, addProtectedRef, removeProtectedRef } = useCreateBar();
    const postAsButtonRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      if (postAsButtonRef.current) {
        addProtectedRef(postAsButtonRef);
      }
  
      return () => {
        if (postAsButtonRef.current) {
          removeProtectedRef(postAsButtonRef);
        }
      };
    }, [postAsButtonRef, addProtectedRef, removeProtectedRef]);
    return (
        <PostingAsWrapper>
            <PostAsTextContainer>
                <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                    Posting from:
                </Text>
            </PostAsTextContainer>

            <PostAsIconContainer>
                <PostAsIcons />
            </PostAsIconContainer>
            <ProfileTypeTextContainer>
                <Text variant={"personal"} size={"1.1rem"} fontWeight={"400"}>
                    Personal
                </Text>
            </ProfileTypeTextContainer>
            <ButtonWrapper onClick={togglePostingAsBar}>
                <ButtonContainer $isDarkMode={isDarkMode} ref={postAsButtonRef}>
                    <IconButton
                        darkModeLogo={OpenDark}
                        lightModeLogo={OpenLight}
                        activeDarkLogo={CloseDark}
                        activeLightLogo={CloseLight}
                        isActive={isPostingAsBarOpen}
                        size={1.8}
                    />
                </ButtonContainer>
            </ButtonWrapper>
        </PostingAsWrapper>
    );
};

export default PixelAndClip;

const ButtonContainer = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  height: 100%;
  border-radius: 0.5rem;
  position: relative;
  z-index: 4;

  &:hover {
    color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#565454' : '#a0a0a0')};
    opacity: 0.7;
    transform: scale(1.05);
  }

  &:active {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#919191' : '#595858')};
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, color 0.3s, opacity 0.3s ease-in-out;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 5rem;
`;

const ProfileTypeTextContainer = styled.div`
    /* position: relative;
    z-index: 5; */
`;

const PostAsTextContainer = styled.div`
`;

const PostAsIconContainer = styled.div`
  width: 4rem;
  position: relative;
  z-index: 5;
`;

const PostingAsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;
