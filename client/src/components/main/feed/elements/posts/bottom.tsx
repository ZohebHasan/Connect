import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import Text from '../../../../ConnectUI_web/common/texts/static';


import NotLikedDark from '../../assets/notLikedDark.png';
import NotLikedLight from '../../assets/notLikedLight.png';

import LikedIcon from '../../assets/likedIcon.png';

import CommentLight from '../../assets/commentsLight.png';
import CommentDark from '../../assets/commentsDark.png';

import ShareLight from '../../assets/shareLight.png';
import ShareDark from '../../assets/shareDark.png';

import ViewsDark from '../../assets/viewsDark.png';
import ViewsLight from '../../assets/viewsLight.png';


const BottomComponent: React.FC = () => {

  const {isDarkMode} = useDarkMode();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Bottom>
      <BottomWrapper>
        <ButtonsContainer>
          <LikedButtonContainer onClick={handleLike}>
            <IconButton src={isLiked ? LikedIcon : isDarkMode ? NotLikedDark : NotLikedLight} isLiked={isLiked} />
            <Text variant={'transparent'} size={'0.9rem'} fontWeight="300">
              12k
            </Text>
          </LikedButtonContainer>
          <CommentButtonContainer>
            <IconButton src={isDarkMode ? CommentDark : CommentLight} />
            <Text variant={'transparent'} size={'0.9rem'} fontWeight="300">
              3k
            </Text>
          </CommentButtonContainer>
          <ShareButtonContainer>
            <IconButton src={isDarkMode ? ShareDark : ShareLight} />
          </ShareButtonContainer>
          <ViewsIconContainer>
            <ViewIcon src={isDarkMode ? ViewsDark : ViewsLight} />
            <Text variant={'transparent'} size={'0.7rem'} fontWeight="300">
              450k
            </Text>
          </ViewsIconContainer>
        </ButtonsContainer>

      </BottomWrapper>
    </Bottom>
  );
};

export default BottomComponent;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 0.8rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 95%;
  gap: 1.5rem;
`;

const LikedButtonContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`;

const CommentButtonContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`;

const ShareButtonContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`;

const ViewsIconContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3rem;
`;

const ViewIcon = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.6;
`;

const likeAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const IconButton = styled.img<{ isLiked?: boolean }>`
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out, filter 0.3s ease-in-out;
  filter: ${({ isLiked }) => (isLiked ? 'brightness(1.2)' : 'brightness(1)')};
  animation: ${({ isLiked }) => (isLiked ? css`${likeAnimation} 0.5s` : 'none')};

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }

  &:active {
    transform: scale(1);
  }
`;
