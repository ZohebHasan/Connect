import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import { useOrgs } from '../../../../../../contexts/schoolProfile/clubAndOrgsContext';

const CourseBarContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isOrgBarOpen, addProtectedRef, removeProtectedRef } = useOrgs();
  const { isDarkMode } = useDarkMode();

  const courseBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (courseBarRef.current) {
      addProtectedRef(courseBarRef);
    }

    return () => {
      if (courseBarRef.current) {
        removeProtectedRef(courseBarRef);
      }
    };
  }, [addProtectedRef, removeProtectedRef]);

  const handleCourseBarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <StyledCourseBarContainer ref={courseBarRef} $isCourseBarContainerOpen={isOrgBarOpen} $isDarkMode={isDarkMode} onClick={handleCourseBarClick}>
      <LinksContainer $isCourseBarContainerOpen={isOrgBarOpen}>
        {children}
      </LinksContainer>
    </StyledCourseBarContainer>
  );
};

export default CourseBarContainer;

const StyledCourseBarContainer = styled.div<{ $isCourseBarContainerOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isCourseBarContainerOpen, $isDarkMode }) => css`
    height: auto;
    width: 98.5%;
    border-bottom-right-radius: ${$isCourseBarContainerOpen ? '10px' : '50%'};
    border-bottom-left-radius: ${$isCourseBarContainerOpen ? '10px' : '50%'};
    transform: scaleY(${$isCourseBarContainerOpen ? '1' : '0'});
    opacity: ${$isCourseBarContainerOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
    transition: transform 0.3s ease-out, opacity 0.5s ease-in-out, border-radius 0.3s ease-out;
  `}
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  z-index: 3;
  transform-origin: top;
  /* left: 0.5rem; */
  /* right: 0.5rem; */
  bottom: auto;
`;

const LinksContainer = styled.div<{ $isCourseBarContainerOpen?: boolean }>`
  opacity: ${({ $isCourseBarContainerOpen }) => $isCourseBarContainerOpen ? 1 : 0};
  transition: opacity 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
