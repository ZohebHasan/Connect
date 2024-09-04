import React from 'react';
import styled, { keyframes, css } from 'styled-components'; // Import styled, keyframes, and css
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode'; // Import useDarkMode hook
import { useSchoolProfile } from '../../../../../../contexts/schoolProfile/school'; // Import useSchoolProfile hook

const FilterBarContainer: React.FC<{ children?: React.ReactNode , }> = ({ children }) => {
  const { isDarkMode } = useDarkMode(); // Use the useDarkMode hook
  const { isCourseSearchAddBarOpen, loading } = useSchoolProfile(); // Use the useSchoolProfile hook

  return (
    <StyledFilterBarContainer $isFilterBarContainerOpen={isCourseSearchAddBarOpen} $isDarkMode={isDarkMode} $isDisabled={loading}>
      <LinksContainer $isFilterBarContainerOpen={isCourseSearchAddBarOpen}>
        {children}
      </LinksContainer>
    </StyledFilterBarContainer>
  );
};

export default FilterBarContainer;

const fadeOutAndMove = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledFilterBarContainer = styled.div<{ $isFilterBarContainerOpen?: boolean; $isDarkMode?: boolean,  $isDisabled: boolean }>`
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : 'auto')};
  
  ${({ $isFilterBarContainerOpen, $isDarkMode, $isDisabled }) => css`
    visibility: ${$isFilterBarContainerOpen ? 'visible' : 'hidden'};
    opacity: ${$isFilterBarContainerOpen ? ($isDisabled ? 0.2 : 1) : 0};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    animation: ${!$isFilterBarContainerOpen && css`${fadeOutAndMove} 0.5s forwards`};
    pointer-events: ${$isFilterBarContainerOpen ? 'auto' : 'none'};
    box-shadow: ${$isDarkMode
      ? '0 4px 8px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
      : '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05)'};
    border: 1px solid ${$isDarkMode ? 'rgba(193, 193, 193, 0.2)' : 'rgba(57, 57, 57, 0.1)'};
  `}
  
  border-radius: 15px;
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center;
`;

const LinksContainer = styled.div<{ $isFilterBarContainerOpen?: boolean }>`
  opacity: ${({ $isFilterBarContainerOpen }) => ($isFilterBarContainerOpen ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;