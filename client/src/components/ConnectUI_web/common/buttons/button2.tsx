import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    to?: string;
    variant: "professional" | "personal" | "school";
    width?: string;
    isActive?: boolean;
    size?: number;
}

const Button: React.FC<ButtonProps> = ({ to, onClick, children, variant, width, isActive, size = 1 }) => {
    const { isDarkMode } = useDarkMode();

    if (to) {
        return (
            <StyledLink
                to={to}
                onClick={onClick}
                $isDarkMode={isDarkMode}
                $variant={variant}
                $width={width}
                $isActive={isActive}
                $size={size}
            >
                {children}
            </StyledLink>
        );
    } else {
        return (
            <StyledButton
                onClick={onClick}
                $isDarkMode={isDarkMode}
                $variant={variant}
                $width={width}
                $isActive={isActive}
                $size={size}
            >
                {children}
            </StyledButton>
        );
    }
};

export default Button;

interface StyleProps {
    $isDarkMode: boolean;
    $variant: "professional" | "personal" | "school";
    $width?: string;
    $isActive?: boolean;
    $size: number;
}

const baseStyles = css<StyleProps>`
  background: ${({ $variant }) => {
        switch ($variant) {
            case 'school':
                return 'linear-gradient(to right, #EA8D8D, #A890FE)';
            case 'professional':
                return 'linear-gradient(to right, #2E3192, #1BFFFF)';
            case 'personal':
                return 'linear-gradient(to right, #662D8C, #ED1E79)';
            default:
                return 'red';
        }
    }};

  background-color: ${({ $isActive, $variant }) => {
        if ($isActive) {
            switch ($variant) {
                case 'school':
                    return 'linear-gradient(to right, #EA8D8D, #A890FE)';
                case 'professional':
                    return 'linear-gradient(to right, #2E3192, #1BFFFF)';
                case 'personal':
                    return 'linear-gradient(to right, #662D8C, #ED1E79)';
                default:
                    return 'red';
            }
        }
    }};

  color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : '#212121'};
  font-size: ${({ $size }) => 1.125 * $size}rem;
  font-weight: 100;
  line-height: 1.3;
  padding: ${({ $size }) => 0.8 * $size}rem ${({ $size }) => 1.5 * $size}rem;
  border-radius: ${({ $size }) => 0.375 * $size}rem;
  text-align: center;
  display: flex;
  justify-content: center;
  text-decoration: none;
  width: ${({ $width }) => $width || 'auto'};

  @media (max-width: 1280px) { 
    font-size: ${({ $size }) => 0.8 * $size}rem;
    padding: ${({ $size }) => 0.5 * $size}rem ${({ $size }) => 1 * $size}rem;
  }
`;

const interactionStyles = css<StyleProps>`
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s ease, box-shadow 0.2s ease;
  user-select: none;
  touch-action: manipulation;

  &:hover {
    transform: scale(1.05);
    background: ${({ $variant }) => {
        switch ($variant) {
            case 'school':
                return 'linear-gradient(to right, #EA8D8D, #A890FE)';
            case 'professional':
                return 'linear-gradient(to right, #2E3192, #1BFFFF)';
            case 'personal':
                return 'linear-gradient(to right, #662D8C, #ED1E79)';
            default:
                return 'red';
        }
    }};
  }

  &:active {
    transform: scale(1.05) translateY(0.125rem);
    background: ${({ $variant }) => {
        switch ($variant) {
            case 'school':
                return 'linear-gradient(to right, #EA8D8D, #A890FE)';
            case 'professional':
                return 'linear-gradient(to right, #2E3192, #1BFFFF)';
            case 'personal':
                return 'linear-gradient(to right, #662D8C, #ED1E79)';
            default:
                return 'red';
        }
    }};
  }

  &:focus {
    outline: 0 solid transparent;
  }

  &:focus:before {
    content: "";
    position: absolute;
    left: calc(-1 * 0.375rem * ${({ $size }) => $size});
    top: calc(-1 * 0.375rem * ${({ $size }) => $size});
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
  border-width: ${({ $size }) => 0.085 * $size}rem;

  @media (max-width: 1280px) { 
    border-width: ${({ $size }) => 0.055 * $size}rem;
  }
`;

const StyledLink = styled(Link) <StyleProps>`
  ${buttonLinkStyles}  
`;

const StyledButton = styled.button<StyleProps>`
  ${buttonLinkStyles} 
  border-color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : '#212121'};
  border-width: ${({ $size }) => 0.085 * $size}rem; 
  font-family: inherit; 
  
  @media (max-width: 1280px) { 
    border-width: ${({ $size }) => 0.055 * $size}rem;
  }
`;
