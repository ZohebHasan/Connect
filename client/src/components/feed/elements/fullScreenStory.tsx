import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const StoryScroller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleWheel = (event: WheelEvent) => event.preventDefault();
      container.addEventListener('wheel', handleWheel);

      // Start with the first story centered
      scrollToActiveStory(0);

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  const scrollToActiveStory = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const story = container.children[index + 1] as HTMLElement; // Adjust for the placeholder

      if (story) {
        const containerCenter = container.offsetWidth / 2;
        const storyCenter = story.offsetLeft + story.offsetWidth / 2;
        const scrollPosition = storyCenter - containerCenter;
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollLeft = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      scrollToActiveStory(newIndex);
      return newIndex;
    });
  };

  const scrollRight = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, 14); // Assuming 15 stories
      scrollToActiveStory(newIndex);
      return newIndex;
    });
  };

  return (
    <Wrapper>
      <NavButton className="left" onClick={scrollLeft}>
        &#9664;
      </NavButton>
      <CenteredContainer>
        <StoryContainer ref={containerRef}>
          <PlaceholderStory>.</PlaceholderStory>
          {[...Array(15)].map((_, index) => (
            <Story key={index} isActive={index === activeIndex}>
              Story {index + 1}
            </Story>
          ))}
          <PlaceholderStory>.</PlaceholderStory>
        </StoryContainer>
      </CenteredContainer>
      <NavButton className="right" onClick={scrollRight}>
        &#9654;
      </NavButton>
    </Wrapper>
  );
};

export default StoryScroller;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: red;
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
  justify-content: flex-start;
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
  background-color: ${(props) => (props.isActive ? '#ccc' : '#999')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.isActive ? '24px' : '12px')};
  font-weight: bold;
  color: #333;
  transition: transform 0.5s ease, background-color 0.5s ease, width 0.5s ease, height 0.5s ease, font-size 0.5s ease;

  &.active {
    transform: scale(1);
  }
`;

const PlaceholderStory = styled.div`
  flex-shrink: 0;
  width: 500px;
  margin: 10px;
  border-radius: 16px;
  background-color: blue;
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
