import React, { useState } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

interface ChirpProps {
  textBody: string;
}

const ChirpComponent: React.FC<ChirpProps> = ({textBody}) => {
  const { isDarkMode } = useDarkMode();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };


  const codeBlockIndex = textBody.indexOf('```');
  const truncateIndex = codeBlockIndex !== -1 && codeBlockIndex < 125 ? codeBlockIndex : 125;

  const truncatedText = textBody.length > truncateIndex ? textBody.substring(0, truncateIndex) : textBody;

  const formatText = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```|``.*?``)/g); 
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        return <CodeBlock key={index} $isDarkMode={isDarkMode}>{part.slice(3, -3)}</CodeBlock>; 
      } else if (part.startsWith("``") && part.endsWith("``")) {
        return <InlineCode key={index} $isDarkMode={isDarkMode}>{part.slice(2, -2)}</InlineCode>; 
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <ChirpContainer>
      <TextContainer>
        <Wrapper>
          <StyledText variant={"normal"} size={"1rem"} fontWeight='300'>
            {isExpanded ? formatText(textBody) : (
              <>
                {formatText(truncatedText)}
                {textBody.length > truncateIndex && (
                  <SeeMoreButton onClick={handleToggle} $isDarkMode={isDarkMode}>
                    ...See more
                  </SeeMoreButton>
                )}
              </>
            )}
            {textBody.length > truncateIndex && isExpanded && (
              <SeeMoreButton onClick={handleToggle} $isDarkMode={isDarkMode}>
                See less
              </SeeMoreButton>
            )}
          </StyledText>
        </Wrapper>
      </TextContainer>
    </ChirpContainer>
  );
};

export default ChirpComponent;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ChirpContainer = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  /* margin-bottom: 1rem; */
`;

const SeeMoreButton = styled.span<{ $isDarkMode: boolean }>`
  color: #c963d0;
    cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  margin-left: 0.5rem;
`;

const StyledText = styled(Text)`
  display: inline;
  line-height: 1.6;
`;

const InlineCode = styled.span<{ $isDarkMode: boolean }>`
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#ededed31' : '#9898985a'};
  color: ${({ $isDarkMode }) => $isDarkMode ? '#bdbdbd' : '#474747'};
  padding: 3px 6px;
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  font-weight: 550;
`;

const CodeBlock = styled.pre<{ $isDarkMode: boolean }>`
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#ededed31' : '#9898985a'};
  color: ${({ $isDarkMode }) => $isDarkMode ? '#bdbdbd' : '#474747'};
  padding: 3px 6px;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  font-weight: 550;
  white-space: pre-wrap;

`;
