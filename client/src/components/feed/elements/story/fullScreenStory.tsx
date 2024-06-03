import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useStories } from '../../../../contexts/stories/storiesContext'; // Ensure the path is correct
import StoryTemplete from './storyTemplete';

const StoryScroller: React.FC = () => {
  const { users, activeIndex, setActiveIndex } = useStories();
  const containerRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToActiveStory = useCallback((index: number) => {
    const container = containerRef.current;
    const story = storiesRef.current[index];

    if (container && story) {
      const containerCenter = container.offsetWidth / 2;
      const storyCenter = story.offsetLeft + story.offsetWidth / 2;
      const scrollPosition = storyCenter - containerCenter;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToActiveStory(activeIndex);
  }, [activeIndex, scrollToActiveStory]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleWheel = (event: WheelEvent) => event.preventDefault();
      container.addEventListener('wheel', handleWheel);

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  const handleScrollLeft = () => {
    setActiveIndex((prevIndex: number) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      scrollToActiveStory(newIndex);
      return newIndex;
    });
  };

  const handleScrollRight = () => {
    setActiveIndex((prevIndex: number) => {
      const newIndex = Math.min(prevIndex + 1, users.length - 1);
      scrollToActiveStory(newIndex);
      return newIndex;
    });
  };

  const handleStoryClick = (index: number) => {
    setActiveIndex(index);
    scrollToActiveStory(index);
  };

  return (
    <Wrapper>
      {activeIndex > 0 && (
        <NavButton className="left" onClick={handleScrollLeft}>
          &#9664;
        </NavButton>
      )}
      <CenteredContainer>
        <StoryContainer ref={containerRef}>
          {/* <PlaceholderStory /> */}
          {users.map((user, index) => (
            <Story
              key={user.id}
              ref={(el) => (storiesRef.current[index] = el)}
              isActive={index === activeIndex}
              onClick={() => handleStoryClick(index)}
            >
              <StoryTemplete userName={user.username} userPhoto={user.src} isActive={index === activeIndex} />
            </Story>
          ))}
          {/* <PlaceholderStory /> */}
        </StoryContainer>
      </CenteredContainer>
      {activeIndex < users.length - 1 && (
        <NavButton className="right" onClick={handleScrollRight}>
          &#9654;
        </NavButton>
      )}
    </Wrapper>
  );
};

export default StoryScroller;

const Wrapper = styled.div`
  position: relative;
  width: 60%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StoryContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Story = styled.div<{ isActive: boolean }>`
  flex-shrink: 0;
  width: ${(props) => (props.isActive ? '396px' : '198px')};
  height: ${(props) => (props.isActive ? '704.55px' : '352.275px')};
  margin: 10px;
  border-radius: 16px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.isActive ? '24px' : '12px')};
  font-weight: bold;
  color: #333;
  transition: transform 0.5s ease, background-color 0.5s ease, width 0.5s ease, height 0.5s ease, font-size 0.5s ease;
  cursor: pointer;
`;

const PlaceholderStory = styled.div`
  flex-shrink: 0;
  width: 500px;
  margin: 10px;
  border-radius: 16px;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 1;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;
