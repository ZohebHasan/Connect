import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

interface TransparentButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    to?: string;
}
  

const TransparentButton: React.FC<TransparentButtonProps> = ({ to, onClick, children }) => {
  const { isDarkMode } = useDarkMode();

  if (to) {
    return (
      <StyledLink to={to} onClick={onClick} $isDarkMode={isDarkMode}>
        {children}
      </StyledLink>
    );
  } else {
    return (
      <StyledButton onClick={onClick} $isDarkMode={isDarkMode}>
        {children}
      </StyledButton>
    );
  }
};


export default TransparentButton;



interface StyledLinkProps {
  isDarkMode: boolean;
}


const baseStyles = css<{ $isDarkMode: boolean }>`
  background: transparent;
  color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : '#212121'};
  font-size: 1.125rem;
  font-weight: 100;
  line-height: 1.3;
  padding: 10px 25px;
  border-radius: 0.375rem;
  text-align: left;
  text-decoration: none;
`;

const interactionStyles = css`
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s ease, box-shadow 0.2s ease;
  user-select: none;
  touch-action: manipulation;

  &:not(:disabled):hover {
    transform: scale(1.05);
    background-color: rgba(130, 127, 127, 0.4);
  }

  &:not(:disabled):active {
    transform: translateY(0.125rem);
  }

  &:focus {
    outline: 0 solid transparent;
  }

  &:focus:before {
    content: "";
    position: absolute;
    left: calc(-1 * 0.375rem);
    top: calc(-1 * 0.375rem);
    pointer-events: none;
    user-select: none;
  }

  &:focus:not(:focus-visible) {
    outline: 0 solid transparent;
  }

  &:focus:not(:focus-visible):before {
    border-width: 0;
  }
`;


const backdropBlur = css`
  backdrop-filter: blur(8px);
`;

const buttonLinkStyles = css<{ $isDarkMode: boolean }>`
  ${baseStyles}
  ${interactionStyles}
  ${backdropBlur}
  border-style: solid;
  border-width: 0.085rem;
`;



const StyledLink = styled(Link)<{ $isDarkMode: boolean }>`
  ${buttonLinkStyles}  
`;

const StyledButton = styled.button<{ $isDarkMode: boolean }>`
  ${buttonLinkStyles} 
  border-color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : '#212121'};
  border-width: 0.085rem; 
  font-family: inherit; 
`;

