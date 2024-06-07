import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import { useClipContext} from '../../../../../../contexts/personalProfile/clipContext';

import PostContainer from '../../../../../ConnectUI_web/templetes/postBarContainer';
import CloseDark from "../../../../../assets/closeDark.png";
import CloseLight from "../../../../../assets/closeLight.png";
import PostScroller from '../postFullScreenScroller';
import ClipTemplete from '../../../../elements/posts/personalPostTemplate';

const ClipContainer: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { posts, isClipBarOpen, toggleClipBar, activeIndex } = useClipContext();

  return (
    <PostContainer isOpen={isClipBarOpen}>
      <TopContainer>
        <ClosingButtonContainer>
          <ClosingButtonWrapper>
            <ClosingButton src={isDarkMode ? CloseDark : CloseLight} onClick={toggleClipBar}/>
          </ClosingButtonWrapper>
        </ClosingButtonContainer>
      </TopContainer>
      <PostScroller activeIndex={activeIndex}>
        {posts.map((post) => (
          <ClipTemplete
            key={post.id}
            userName={"zoheb.hasan"}
            bodyType={"clip"}
            isVarified={true}
            media={post.media} 
          />
        ))}
      </PostScroller>
    </PostContainer>
  );
};

export default ClipContainer;

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
