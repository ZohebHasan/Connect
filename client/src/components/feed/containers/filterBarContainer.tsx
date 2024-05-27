import React, { useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import { useFilter } from '../../../contexts/feed/filters/filtersContext';

const FilterBarContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isFiltersbarOpen, toggleFiltersbar, addProtectedRef, removeProtectedRef } = useFilter();
  const { isDarkMode } = useDarkMode();
  const FilterBarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (FilterBarContainerRef.current) {
      addProtectedRef(FilterBarContainerRef);
    }

    return () => {
      if (FilterBarContainerRef.current) {
        removeProtectedRef(FilterBarContainerRef);
      }
    };
  }, [addProtectedRef, removeProtectedRef]);

  const handleFilterBarContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <StyledFilterBarContainer ref={FilterBarContainerRef} $isFilterBarContainerOpen={isFiltersbarOpen} $isDarkMode={isDarkMode} onClick={handleFilterBarContainerClick}>
      <LinksContainer $isFilterBarContainerOpen={isFiltersbarOpen}>
        {children}
      </LinksContainer>
    </StyledFilterBarContainer>
  );
};

export default FilterBarContainer;

const fadeOutAndMove = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const StyledFilterBarContainer = styled.div<{ $isFilterBarContainerOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isFilterBarContainerOpen, $isDarkMode }) => css`
    opacity: ${$isFilterBarContainerOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
    transform: ${$isFilterBarContainerOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: opacity 0.3s ease-in-out;
    animation: ${!$isFilterBarContainerOpen && css`${fadeOutAndMove} 0.5s forwards`};
  `}
  height: 40%;
  width: 18.4rem;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  z-index: 3;
  transform-origin: bottom;
  top: 0.5rem;
  bottom: auto;
`;

const LinksContainer = styled.div<{ $isFilterBarContainerOpen?: boolean }>`
  opacity: ${({ $isFilterBarContainerOpen }) => $isFilterBarContainerOpen ? 1 : 0};
  transition: opacity 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
