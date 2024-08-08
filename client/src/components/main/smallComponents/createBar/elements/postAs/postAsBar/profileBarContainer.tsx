import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../../contexts/DarkMode/DarkMode';
import { useCreateBar } from '../../../../../../../contexts/leftBar/createBarContext';

const ProfileBar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isPostingAsBarOpen, addProtectedRef, removeProtectedRef } = useCreateBar();
  const { isDarkMode } = useDarkMode();
  const profileBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profileBarRef.current) {
      addProtectedRef(profileBarRef);
    }

    return () => {
      if (profileBarRef.current) {
        removeProtectedRef(profileBarRef);
      }
    };
  }, [addProtectedRef, removeProtectedRef]);

  const handleProfileBarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <StyledProfileBar
      ref={profileBarRef}
      $isProfileBarOpen={isPostingAsBarOpen}
      $isDarkMode={isDarkMode}
      onClick={handleProfileBarClick}
    >
      <LinksContainer $isProfileBarOpen={isPostingAsBarOpen}>
        {children}
      </LinksContainer>
    </StyledProfileBar>
  );
};

export default ProfileBar;

const StyledProfileBar = styled.div<{ $isProfileBarOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isProfileBarOpen, $isDarkMode }) => `
    height: ${$isProfileBarOpen ? '60%' : '0'};
    width: 35.5%;
    border-top-right-radius: ${$isProfileBarOpen ? '15px' : '50%'};
    border-top-left-radius: ${$isProfileBarOpen ? '15px' : '50%'};
    transform: scaleY(${$isProfileBarOpen ? '1' : '0'});
    opacity: ${$isProfileBarOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgb(35, 35, 35)' : 'rgb(228, 228, 228)'};
    box-shadow: ${$isDarkMode ? '0 4px 8px rgba(0, 0, 0, 0.6)' : '0 4px 8px rgba(0, 0, 0, 0.2)'};
  `}
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: height 0.5s ease-out, transform 0.3s ease-out, opacity 0.5s ease-in-out, border-radius 0.3s ease-out;
  display: flex;
  flex-direction: column;
  z-index: 3;
  transform-origin: bottom;
  bottom: 5%;
  left: 15%;
`;

const LinksContainer = styled.div<{ $isProfileBarOpen?: boolean }>`
  opacity: ${({ $isProfileBarOpen }) => $isProfileBarOpen ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
