import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import { useStoriesPage } from '../../../contexts/stories/storiesContext';

import Zoheb from "../dummies/personal.jpeg";
import Fahim from "../dummies/Fahim.jpg";
import Adnan from "../dummies/Adnan.jpeg";
import Faysal from "../dummies/Faysal.jpg";
import Faisal from "../dummies/Faisal.jpeg";
import Priyanka from "../dummies/Priyanka.jpeg";
import Yodahe from "../dummies/Yodahe.jpg";
import Puja from "../dummies/Puja.jpeg";

import Text from '../../ConnectUI_web/common/texts/static';

import AddStoryDark from "../assets/addStoryDark.png";
import AddStoryLight from "../assets/addStoryLight.png";

const StoryScroller: React.FC = () => {
  const { toggleStoriesPage } = useStoriesPage();
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

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

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
        
        <StoryContainer>
          <MainUser>
            <Border onClick={toggleStoriesPage}>
              <InnerBorder $isDarkMode={isDarkMode}>
                <Story src={Zoheb} />
              </InnerBorder>
            </Border>
            <AddBorder $isDarkMode={isDarkMode}>
              <AddIcon src={isDarkMode ? AddStoryDark : AddStoryLight} />
            </AddBorder>
          </MainUser>
          <Text variant="transparent" size='0.8rem' fontWeight='300'>My stories</Text>
        </StoryContainer>

        <StoryContainer>
          <MainUser>
            <Border onClick={toggleStoriesPage}>
              <InnerBorder $isDarkMode={isDarkMode}>
                <Story src={Priyanka} />
              </InnerBorder>
            </Border>
          </MainUser>
      
            <Text variant="transparent" size='0.8rem' fontWeight='300'>
              {truncateText('@priyankamukherjeemuhahahahahhaha', 11)}
            </Text>

        </StoryContainer>

        <StoryContainer>
          <MainUser>
            <Border onClick={toggleStoriesPage}>
              <InnerBorder $isDarkMode={isDarkMode}>
                <Story src={Fahim} />
              </InnerBorder>
            </Border>
          </MainUser>
          <Text variant="transparent" size='0.8rem' fontWeight='300'>
            {truncateText('@mehrabhossain', 11)}
          </Text>
        </StoryContainer>

        <StoryContainer>
          <MainUser>
            <Border onClick={toggleStoriesPage}>
              <InnerBorder $isDarkMode={isDarkMode}>
                <Story src={Yodahe} />
              </InnerBorder>
            </Border>
          </MainUser>
          <Text variant="transparent" size='0.8rem' fontWeight='300'>
            {truncateText('@yodahe', 11)}
          </Text>
        </StoryContainer>
        <StoryContainer>
          <MainUser>
            <Border onClick={toggleStoriesPage}>
              <InnerBorder $isDarkMode={isDarkMode}>
                <Story src={Adnan} />
              </InnerBorder>
            </Border>
          </MainUser>
          <Text variant="transparent" size='0.8rem' fontWeight='300'>
            {truncateText('@adnanzarif', 11)}
          </Text>
        </StoryContainer>
        <StoryContainer>
          <MainUser>
            <Border onClick={toggleStoriesPage}>
              <InnerBorder $isDarkMode={isDarkMode}>
                <Story src={Faysal} />
              </InnerBorder>
            </Border>
          </MainUser>
          <Text variant="transparent" size='0.8rem' fontWeight='300'>
            {truncateText('@faysalahmed', 11)}
          </Text>
        </StoryContainer>
        <StoryContainer>
          <MainUser>
            <Border onClick={toggleStoriesPage}>
              <InnerBorder $isDarkMode={isDarkMode}>
                <Story src={Faisal} />
              </InnerBorder>
            </Border>
          </MainUser>
          <Text variant="transparent" size='0.8rem' fontWeight='300'>
            {truncateText('@faisalhossain', 11)}
          </Text>
        </StoryContainer>
        <StoryContainer>
          <MainUser>
            <Border onClick={toggleStoriesPage}>
              <InnerBorder $isDarkMode={isDarkMode}>
                <Story src={Puja} />
              </InnerBorder>
            </Border>
          </MainUser>
          <Text variant="transparent" size='0.8rem' fontWeight='300'>
            {truncateText('@pujadas', 11)}
          </Text>
        </StoryContainer>
      </StoriesList>

      <NavButton position="right" isVisible={showRightButton} onClick={scrollRight}>
        <NavButtonSvg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" /></NavButtonSvg>
      </NavButton>
    </StoryScrollerWrapper>
  );
};

export default StoryScroller;



const MainUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StoryScrollerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
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
