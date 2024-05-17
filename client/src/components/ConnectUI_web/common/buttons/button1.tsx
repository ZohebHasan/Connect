import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    to?: string;
    variant: "transparent" | "gradient" | "normal"
    width?: string;
    isActive?:boolean;
}
  

const Button: React.FC<ButtonProps> = ({ to, onClick, children, variant, width, isActive }) => {
  const { isDarkMode } = useDarkMode();

  

  if (to) {
    return (
      <StyledLink to={to} onClick={onClick} $isDarkMode={isDarkMode} $variant = {variant} $width = {width} $isActive = {isActive}>
        {children}
      </StyledLink>
    );
  } else {
    return (
      <StyledButton onClick={onClick} $isDarkMode={isDarkMode} $variant= {variant} $width = {width} $isActive = {isActive} > 
        {children}
      </StyledButton>
    );
  }
};


export default Button;






interface StyleProps{
  $isDarkMode: boolean;
  $variant: "transparent" | "gradient" | "normal";
  $width ?: string;
  $isActive?:boolean;
}


const baseStyles = css<StyleProps>`
  background: ${({ $variant, $isDarkMode }) => {
    switch ($variant) {
      case 'transparent':
        return 'transparent';
      case 'normal':
        return $isDarkMode ? 'rgba(186, 186, 186, 0.85)' : 'rgba(220, 218, 218, 0.95)'; 
      case 'gradient':
        return $isDarkMode ? 
          'linear-gradient(to right, rgba(29, 38, 113, 0.55), rgba(195, 55, 100, 0.55))' : 
          'linear-gradient(to right, rgba(102, 45, 140, 0.55), rgba(237, 30, 121, 0.55))';
      default:
        return 'red'; 
    }
  }};

  background-color: ${({ $variant, $isDarkMode, $isActive }) => {
    if($isActive){
      switch ($variant) {
        case 'transparent':
          return $isDarkMode ? 'rgba(130, 127, 127, 0.4)' : 'rgba(130, 127, 127, 0.4)'; 
        case 'normal':
          return $isDarkMode ? 'rgba(186, 186, 186, 0.85)' : 'rgba(220, 218, 218, 0.95)'; 
        case 'gradient':
          return $isDarkMode ? 
            'linear-gradient(to right, rgba(29, 38, 113, 0.55), rgba(195, 55, 100, 0.55))' : 
            'linear-gradient(to right, rgba(102, 45, 140, 0.55), rgba(237, 30, 121, 0.55))';
        default:
          return 'red'; 
      }
    }

  }};

  color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : '#212121'};
  font-size: 1.125rem;
  font-weight: 100;
  line-height: 1.3;
  padding: 0.8rem 1.5rem;
  border-radius: 0.375rem;
  text-align: center;
  display:flex;
  justify-content: center;
  text-decoration: none;
  width: ${({ $width }) => $width || 'auto'};

  @media (max-width: 1280px) { 
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
`;



const interactionStyles = css<StyleProps>`
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s ease, box-shadow 0.2s ease;
  user-select: none;
  touch-action: manipulation;

  &:hover {
    transform: scale(1.05);
    background: ${({ $isDarkMode, $variant }) =>
      $isDarkMode
        ? ($variant === 'gradient' 
            ? 'linear-gradient(to right, rgba(29, 37, 113, 0.73), rgba(195, 55, 99, 0.726))'
            : ($variant === 'normal' ? 'rgba(149, 147, 147, 0.85)' : 'rgba(130, 127, 127, 0.4)'))
        : ($variant === 'gradient' 
            ? 'linear-gradient(to right, rgba(102, 45, 140, 0.748), rgba(237, 30, 120, 0.741))'
            : ($variant === 'normal' ? 'rgba(235, 233, 233, 0.95)' : 'rgba(130, 127, 127, 0.4)'))};
  }

  &:active {
    transform: scale(1.05) translateY(0.125rem);
    background: ${({ $isDarkMode, $variant }) =>
      $isDarkMode
        ? ($variant === 'gradient' 
            ? 'linear-gradient(to right, rgb(29, 37, 113), rgb(195, 55, 99))'
            : ($variant === 'normal' ? 'rgba(131, 129, 129, 0.85)' : 'rgba(130, 127, 127, 0.4)'))
        : ($variant === 'gradient' 
            ? 'linear-gradient(to right, rgb(102, 45, 140), rgb(237, 30, 120))'
            : ($variant === 'normal' ? 'rgb(255, 255, 255)' : 'rgba(130, 127, 127, 0.4)'))};
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

const buttonLinkStyles = css<StyleProps>`
  ${baseStyles}
  ${interactionStyles}
  ${backdropBlur}
  border-style: solid;
  border-width: 0.085rem;

  @media (max-width: 1280px) { 
    border-width: 0.055rem;
  }
`;



const StyledLink = styled(Link)<StyleProps>`
  ${buttonLinkStyles}  
`;

const StyledButton = styled.button<StyleProps>`
  ${buttonLinkStyles} 
  border-color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : '#212121'};
  border-width: 0.085rem; 
  font-family: inherit; 
  
  @media (max-width: 1280px) { 
    border-width: 0.055rem;
  }
`;

