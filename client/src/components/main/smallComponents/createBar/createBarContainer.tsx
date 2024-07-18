import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useCreateBar } from '../../../../contexts/leftBar/createBarContext';

const FilterBarContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const { isCreateBarOpen } = useCreateBar();

  return (
    <StyledFilterBarContainer $isFilterBarContainerOpen={isCreateBarOpen} $isDarkMode={isDarkMode}>
      <LinksContainer $isFilterBarContainerOpen={isCreateBarOpen}>
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
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const StyledFilterBarContainer = styled.div<{ $isFilterBarContainerOpen?: boolean; $isDarkMode?: boolean }>`
  ${({ $isFilterBarContainerOpen, $isDarkMode }) => css`
    display: ${$isFilterBarContainerOpen ? 'flex' : 'none'};
    opacity: ${$isFilterBarContainerOpen ? '1' : '0'};
    background-color: ${$isDarkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(230, 230, 230, 0.9)'};
    transition: opacity 0.3s ease-in-out;
    animation: ${!$isFilterBarContainerOpen && css`${fadeOutAndMove} 0.5s forwards`};
    pointer-events: ${$isFilterBarContainerOpen ? 'auto' : 'none'};
  `}
  /* height: 40%;
  width: 40%; */
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
  opacity: ${({ $isFilterBarContainerOpen }) => $isFilterBarContainerOpen ? 1 : 0};
  transition: opacity 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
