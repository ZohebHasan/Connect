import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import { useProfile } from '../../../contexts/feed/profiles/profilesContext';
import { useFilter } from '../../../contexts/feed/filters/filtersContext';


const FilterBarContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const {isFiltersbarOpen, toggleFiltersbar, addProtectedRef, removeProtectedRef } = useFilter();
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

const StyledFilterBarContainer = styled.div<{ $isFilterBarContainerOpen?: boolean; $isDarkMode?: boolean }>`
  
  ${({ $isFilterBarContainerOpen, $isDarkMode }) => `
    height: ${$isFilterBarContainerOpen ? '40%' : '0'};
    width: 18.4rem;
    border-top-right-radius: ${$isFilterBarContainerOpen ? '15px' : '50%'};
    border-top-left-radius: ${$isFilterBarContainerOpen ? '15px' : '50%'};
    transform: scaleY(${$isFilterBarContainerOpen ? '1' : '0'});
    opacity: ${$isFilterBarContainerOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
  `}
  
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  backdrop-filter: blur(3px);
  overflow-x: hidden;
  overflow-y: hidden;
  transition: height 0.7s ease-out, transform 0.7s ease-out, opacity 0.8s ease-in-out, border-radius 0.8s ease-out;
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
