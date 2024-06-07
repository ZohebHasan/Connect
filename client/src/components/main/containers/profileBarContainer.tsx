import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import { useProfile } from '../../../contexts/profiles/profilesContext';

const ProfileBar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isProfilesbarOpen, toggleProfilesbar, addProtectedRef, removeProtectedRef } = useProfile();
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
    event.stopPropagation(); // Prevents the click from closing the ProfileBar immediately
  };

  return (
    <StyledProfileBar ref={profileBarRef} $isProfileBarOpen={isProfilesbarOpen} $isDarkMode={isDarkMode} onClick={handleProfileBarClick}>
      <LinksContainer $isProfileBarOpen={isProfilesbarOpen}>
        {children}
      </LinksContainer>
    </StyledProfileBar>
  );
};

export default ProfileBar;

const StyledProfileBar = styled.div<{ $isProfileBarOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isProfileBarOpen, $isDarkMode }) => `
    height: ${$isProfileBarOpen ? '50%' : '0'};
    width: 17.5rem;
    border-top-right-radius: ${$isProfileBarOpen ? '15px' : '50%'};
    border-top-left-radius: ${$isProfileBarOpen ? '15px' : '50%'};
    transform: scaleY(${$isProfileBarOpen ? '1' : '0'});
    opacity: ${$isProfileBarOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
  `}
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  transition: height 0.5s ease-out, transform 0.3s ease-out, opacity 0.5s ease-in-out, border-radius 0.3s ease-out;
  display: flex;
  flex-direction: column;
  z-index: 3;
  transform-origin: bottom;
  top: auto;
  bottom: 5rem;
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
