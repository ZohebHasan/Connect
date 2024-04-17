import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { useLanguage } from '../../../contexts/Language/Language.js';
import { transHeader } from '../../../translations/loginSignup/selectLang/transHeader';

import '../../../stylesheets/elements/sideBar.css';



interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void; 
  sidebarRef: React.Ref<HTMLDivElement>;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ isOpen, sidebarRef }, ref) => {
  const { language } = useLanguage();


  const {
    aboutUs = "About Us",
    mission = "Our Mission",
    career = "Career",
    contact = "Contact Us",
    childSafety = "Child Safety"
  } = transHeader[language] || {};

  return (
    <StyledSidebar ref={ref} isOpen={isOpen}>
      <div className="emptySpace"></div>
      <div className={`links ${isOpen ? '' : 'hidden'}`}>
        <a href="#">{aboutUs}</a>
        <a href="#">{mission}</a>
        <a href="#">{career}</a>
        <a href="#">{contact}</a>
        <a href="#">{childSafety}</a>
      </div>
    </StyledSidebar>
  );
});

export default Sidebar;


const StyledSidebar = styled.div<{ isOpen: boolean }>`
  height: 0;
  width: 300px;
  position: absolute;
  top: 15px;
  right: 0;
  background-color: rgba(48, 48, 48, 0.5);
  backdrop-filter: blur(10px);
  overflow-x: hidden;
  transition: height 0.5s ease-out, transform 0.5s ease-out, opacity 0.5s ease-in-out, border-radius 0.5s ease-out;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  margin-right: 15px;

  ${({ isOpen }) => isOpen && css`
    height: calc(100% - 15px);
    border-radius: 0;
    transform: scaleY(1);
    opacity: 1;
  `}

  & .emptySpace {
    height: 70px;
  }

  & .links {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;

    &.hidden {
      opacity: 0;
    }

    a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: #313131;
      display: block;
      transition: 0.3s;

      &:hover {
        color: black;
      }
    }
  }

  @media (max-width: 650px) {
    width: 200px; // Adjusting width based on screen size
  }

  // Dark mode specific styles
  ${({ theme }) => theme.darkMode && css`
    background-color: rgba(48, 48, 48, 0.5); // Dark theme background
    & .links a {
      color: #a9a9a9; // Dark theme link color

      &:hover {
        color: white; // Dark theme link hover color
      }
    }
  `}

  ${({ theme }) => !theme.darkMode && css`
    background-color: rgba(177, 177, 177, 0.5); // Light theme background
    & .links a {
      color: #575757; // Light theme link color

      &:hover {
        color: black; // Light theme link hover color
      }
    }
  `}
`;
