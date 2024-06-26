import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import { usePixelContext } from '../../../../../../contexts/personalProfile/pixelContext';

import PostContainer from '../../../../../ConnectUI_web/templetes/postBarContainer';
import CloseDark from "../../../../../assets/closeDark.png";
import CloseLight from "../../../../../assets/closeLight.png";
import PostScroller from '../postFullScreenScroller';
import PixelTemplete from '../../../../elements/posts/personalPostTemplate';

const StoriesContainer: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { posts, isPixelBarOpen, togglePixelBar, activeIndex } = usePixelContext();

  return (
    <PostContainer isOpen={isPixelBarOpen}>
      <TopContainer>
        <ClosingButtonContainer>
          <ClosingButtonWrapper>
            <ClosingButton src={isDarkMode ? CloseDark : CloseLight} onClick={togglePixelBar}/>
          </ClosingButtonWrapper>
        </ClosingButtonContainer>
      </TopContainer>
      <PostScroller activeIndex={activeIndex}>
        {posts.map((post) => (
          <PixelTemplete
            key={post.id}
            userName={"zoheb.hasan"}
            bodyType={"pixel"}
            isVarified={true}
            media={post.media} // Pass the media prop here
          />
        ))}
      </PostScroller>
    </PostContainer>
  );
};

export default StoriesContainer;

const ClosingButtonWrapper = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: flex-end;
`;

const ClosingButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

const ClosingButton = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.10);
  }

  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const TopContainer = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  top: 0;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;