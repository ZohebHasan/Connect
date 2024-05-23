import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

const StoryScroller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const {isDarkMode} = useDarkMode();

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

  return (
    <StoryScrollerWrapper>
      <NavButton position="left" isVisible={showLeftButton} onClick={scrollLeft}>
        <NavButtonSvg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></NavButtonSvg>
      </NavButton>
      <StoryContainer ref={containerRef}>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="white" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="blue" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="red" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="pink" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="yellow" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="blue" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="pink" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="green" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="orange" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="white" />
          </InnerBorder>
        </Border>
        <Border>
          <InnerBorder $isDarkMode = {isDarkMode}>
            <Story bgColor="blue" />
          </InnerBorder>
        </Border>
      </StoryContainer>
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

const Border = styled.div`
  background: linear-gradient(to right, #662D8C, #ED1E79);
  padding: 3px; /* Adjusted padding for the outer border */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
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
  
  
const InnerBorder = styled.div<{$isDarkMode: boolean}>`
background-color: ${props => (props.$isDarkMode ? 'black' : 'white')}; /* Conditionally set background color */
padding: 2px; 
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Story = styled.div<{ bgColor: string }>`
  width: 62px; /* Reduced width to fit inside the inner border */
  height: 62px; /* Reduced height to fit inside the inner border */
  background-color: ${props => props.bgColor};
  border-radius: 50%;
  flex-shrink: 0;
`;




const StoryContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  overflow-x: scroll; /* Enable horizontal scrolling */
  scroll-behavior: smooth; /* Smooth scrolling */
  scrollbar-width: none; /* Hide scrollbar in Firefox */
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Webkit-based browsers */
  }
`;
