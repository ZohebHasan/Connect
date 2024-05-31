import React from 'react';
import styled, { css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

interface TextProps {
    variant?: 'transparent' | 'normal' | 'personal' | 'school' | 'professional' | 'gradient';
    size: string;
    fontWeight: string;
    children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ variant, size, children, fontWeight }) => {
    const { isDarkMode } = useDarkMode();
    return (
        <StyledText $variant={variant} $size={size} $isDarkMode={isDarkMode} $fontWeight = {fontWeight}>
            {children}
        </StyledText>
    );
}

export default Text;

interface StyledTextProps {
    $variant?: 'transparent' | 'normal' | 'personal' | 'school' | 'professional' | 'gradient'
    $size: string;
    $isDarkMode: boolean;
    $fontWeight: string;
}

const StyledText = styled.p<StyledTextProps>`
    display: inline;
    line-height: 1.6;
    font-size: ${({ $size }) => $size};

    @media (max-width: 1280px) { 
        font-size: ${({ $size }) => `calc(${$size} * 0.65)`}; 
    }

    font-weight: ${ ({$fontWeight}) => $fontWeight};
    ${({ $variant, $isDarkMode }) => {
        switch ($variant) {
            case 'transparent':
                return css`
                    color: ${$isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.600)'};
                `;
            case 'normal':
                return css`
                    color: ${$isDarkMode ? 'white' : 'black'};
                `;
            case 'gradient':
                return css`
                    color: transparent;
                    background: ${$isDarkMode ? "linear-gradient(to right, #3944a4, #e15782)" 
                                            : "linear-gradient(to right, #662D8C, #ED1E79)"};
                    -webkit-background-clip: text;
                    background-clip: text;
                `;
            case 'personal':
                return css`
                    color: transparent;
                    background: ${$isDarkMode ? "linear-gradient(to right, #662D8C, #ED1E79)" 
                                              : "linear-gradient(to right, #662D8C, #ED1E79)"};
                    -webkit-background-clip: text;
                    background-clip: text;
                `;
            case 'professional':
                return css`
                    color: transparent;
                    background: ${$isDarkMode ? "linear-gradient(to right, #2E3192, #1BFFFF)"
                                              : "linear-gradient(to right, #2E3192, #1BFFFF)"};
                    -webkit-background-clip: text;
                    background-clip: text;
                `;
            case 'school':
                return css`
                    color: transparent;
                    background: ${$isDarkMode ? "linear-gradient(to right, #EA8D8D, #A890FE)"
                                              : "linear-gradient(to right, #EA8D8D, #A890FE)"};
                    -webkit-background-clip: text;
                    background-clip: text;
                `;
        }
    }}
    
`;
