import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import { useStories } from '../../../contexts/stories/storiesContext';
import Text from '../../ConnectUI_web/common/texts/static';
import AddStoryDark from "../assets/addStoryDark.png";
import AddStoryLight from "../assets/addStoryLight.png";

const StoryScroller: React.FC = () => {
  const { toggleStoriesPage, users, scrollLeft, scrollRight } = useStories();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const { isDarkMode } = useDarkMode();

  const updateButtons = () => {
    const container = containerRef.current;
    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(container.scrollLeft + container.clientWidth < container.scrollWidth);
    }
  };

  useEffect(() => {
    updateButtons();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateButtons);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateButtons);
      }
    };
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <StoryScrollerWrapper>
      <NavButton position="left" isVisible={showLeftButton} onClick={scrollLeft}>
        <NavButtonSvg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></NavButtonSvg>
      </NavButton>

      <StoriesList ref={containerRef}>
        {/* Render the first user's story (logged-in user) */}
        {users.length > 0 && (
          <StoryContainer>
            <MainUser>
              <Border onClick={() => toggleStoriesPage(0)}>
                <InnerBorder $isDarkMode={isDarkMode}>
                  <Story src={users[0].src} />
                </InnerBorder>
              </Border>
              <AddBorder $isDarkMode={isDarkMode}>
                <AddIcon src={isDarkMode ? AddStoryDark : AddStoryLight} />
              </AddBorder>
            </MainUser>
            <Text variant="transparent" size="0.8rem" fontWeight="300">
              My stories
            </Text>
          </StoryContainer>
        )}

        {/* Render other users' stories */}
        {users.slice(1).map((user, index) => (
          <StoryContainer key={user.id}>
            <MainUser>
              <Border onClick={() => toggleStoriesPage(index + 1)}>
                <InnerBorder $isDarkMode={isDarkMode}>
                  <Story src={user.src} />
                </InnerBorder>
              </Border>
            </MainUser>
            <Text variant="transparent" size="0.8rem" fontWeight="300">
              {truncateText(user.username, 11)}
            </Text>
          </StoryContainer>
        ))}
      </StoriesList>

      <NavButton position="right" isVisible={showRightButton} onClick={scrollRight}>
        <NavButtonSvg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" /></NavButtonSvg>
      </NavButton>
    </StoryScrollerWrapper>
  );
};

export default StoryScroller;

const StoryScrollerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

interface NavButtonProps {
  position: 'left' | 'right';
  isVisible: boolean;
}

const NavButton = styled.div<NavButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  ${props => props.position}: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const NavButtonSvg = styled.svg`
  fill: white;
  width: 1.7rem;
  height: 1.7rem;
`;

const StoriesList = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  padding: 15px;
  gap: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Border = styled.div`
  background: linear-gradient(to right, #662D8C, #ED1E79);
  padding: 3px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
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

const InnerBorder = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${props => (props.$isDarkMode ? 'black' : 'white')};
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Story = styled.img`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const AddIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const AddBorder = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${props => (props.$isDarkMode ? 'black' : 'white')};
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.10);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;
