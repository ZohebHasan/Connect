import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../../../../ConnectUI_web/common/texts/static';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

interface CaptionProps {
    title: string;
}

const Caption: React.FC<CaptionProps> = ({title}) => {

    const { isDarkMode } = useDarkMode();
    const formatText = (text: string) => {
        const parts = text.split(/(``.*?``)/g); 
        return parts.map((part, index) => {
            if (part.startsWith("``") && part.endsWith("``")) {
                return <Code key={index} $isDarkMode={isDarkMode}>{part.slice(2, -2)}</Code>; 
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <CaptionContainer>
            <TextContainer>
                <Wrapper>
                    <Text variant={"normal"} size={"1.1rem"} fontWeight='400'>
                        {formatText(title)}
                    </Text>
                </Wrapper>
            </TextContainer>
        </CaptionContainer>
    );
};

export default Caption;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CaptionContainer = styled.div`
  display: flex;
  width: 90%;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;
  /* margin-bottom: 1rem; */
`;

const Code = styled.span<{ $isDarkMode: boolean }>`
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#ededed31' : '#9898985a'};
  color: ${({ $isDarkMode }) => $isDarkMode ? '#e9e9e9' : '#333333'};
  padding: 3px 6px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  border-radius: 5px;
  font-weight: 600;
`;
