import React, { useState } from 'react';
import styled from 'styled-components';

import Text from '../../../../ConnectUI_web/common/texts/static';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

interface CaptionPersonalProps {
  textBody: string;
  display: 'fullScreen' | 'notFullScreen';
}

const CaptionPersonal: React.FC<CaptionPersonalProps> = ({ textBody, display }) => {
  const { isDarkMode } = useDarkMode();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const formatText = (text: string) => {
    const parts = text.split(/(`.*?`|``.*?``)/g); // Split by parts that are wrapped in single or double backticks
    return parts.map((part, index) => {
      if (part.startsWith("``") && part.endsWith("``")) {
        return <Code key={index} $isDarkMode={isDarkMode} $isFullScreen={display === 'fullScreen'}>{part.slice(2, -2)}</Code>; // Remove the double backticks and wrap in Code component
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <Code key={index} $isDarkMode={isDarkMode} $isFullScreen={display === 'fullScreen'}>{part.slice(1, -1)}</Code>; // Remove the single backtick and wrap in Code component
      }
      return <span key={index}>{part}</span>;
    });
  };

  const truncatedText = textBody.length > 125 ? textBody.substring(0, 125) : textBody;

  return (
    <CaptionContainer>
      <Text variant={"normal"} size={display === 'fullScreen' ? "1rem" : "0.9rem"} fontWeight='300'>
        {isExpanded ? formatText(textBody) : (
          <>
            {formatText(truncatedText)}
            {textBody.length > 125 && (
              <SeeMoreButton onClick={handleToggle} $isDarkMode={isDarkMode} $isFullScreen={display === 'fullScreen'}>
                ...See more
              </SeeMoreButton>
            )}
          </>
        )}
        {textBody.length > 125 && isExpanded && (
          <SeeMoreButton onClick={handleToggle} $isDarkMode={isDarkMode} $isFullScreen={display === 'fullScreen'}>
            See less
          </SeeMoreButton>
        )}
      </Text>
    </CaptionContainer>
  );
};

export default CaptionPersonal;

const SeeMoreButton = styled.span<{ $isDarkMode: boolean, $isFullScreen: boolean }>`
  color: rgb(58, 161, 216);
  cursor: pointer;
  font-size: ${({ $isFullScreen }) => ($isFullScreen ? '1rem' : '0.9rem')};
  font-weight: 300;
  margin-left: 0.5rem;
`;

const CaptionContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const Code = styled.span<{ $isDarkMode: boolean, $isFullScreen: boolean }>`
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#ededed31' : '#9898985a'};
  color: ${({ $isDarkMode }) => $isDarkMode ? '#bdbdbd' : '#747474'};
  padding: 3px 6px;
  font-family: 'Courier New', Courier, monospace;
  font-size: ${({ $isFullScreen }) => ($isFullScreen ? '1rem' : '0.9rem')};
  border-radius: 5px;
  font-weight: 600;
`;
