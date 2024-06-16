import React, { useState, useEffect, ReactNode } from 'react';
import styled from 'styled-components';


interface AnimatedTextProps {
  size: string;
  children?: ReactNode;
}


const LeftToRightText: React.FC<AnimatedTextProps> = ({ size, children }) => {
    const defaultText = "Unable to render your text, default text is being rendered.";
    const [index, setIndex] = useState(0);
    const greyLetterCount = 5;

    const childArray = typeof children === 'string' ? children.split('') : defaultText.split('');
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setIndex(currentIndex => (currentIndex + 1) % childArray.length);
      }, 200);
  
      return () => clearInterval(intervalId);
    }, [childArray.length]);

    return (
      <StyledTextContainer>
        {childArray.map((char, idx) => {
          const isGrey = Array.from({ length: greyLetterCount }, (_, i) => (index + i) % childArray.length).includes(idx);
          return <StyledSpan key={idx} $isGrey={isGrey} $size={size}>{char}</StyledSpan>;
        })}
      </StyledTextContainer>
    );
};

export default LeftToRightText;


interface SpanProps {
  $isGrey: boolean;
  $size: string;
}

const StyledTextContainer = styled.div`
  transition: left 0.5s ease-in-out;
`;

const StyledSpan = styled.span<SpanProps>`
  font-size: ${({ $size }) => $size};
  
  @media (max-width: 1280px) { 
    font-size: ${({ $size }) => `calc(${$size} * 0.65)`}; 
}

  transition: color 0.7s ease;
  color: ${({ $isGrey }) => $isGrey ? 'rgba(172, 172, 172, 0.404)' : 'inherit'};
`;