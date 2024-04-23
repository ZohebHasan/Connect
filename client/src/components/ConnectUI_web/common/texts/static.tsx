import React from 'react';
import styled, { css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

interface TextProps {
    variant: 'transparent' | 'normal' | 'gradient';
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
    $variant: 'transparent' | 'normal' | 'gradient';
    $size: string;
    $isDarkMode: boolean;
    $fontWeight: string;
}

const StyledText = styled.p<StyledTextProps>`
    font-size: ${({ $size }) => $size};
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
                    background: ${$isDarkMode ? "linear-gradient(to right, #1D2671, #C33764)" 
                                              : "linear-gradient(to right, #662D8C , #ED1E79)" };
                    -webkit-background-clip: text;
                    background-clip: text;
                `;
        }
    }}
`;
