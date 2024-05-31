import React, { useState } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

const ChirpComponent: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };


  const fullText = `
    How can I use \`\`state\`\` and \`\`setState\`\` in a React component? 
    Here is the code I'm working with:
    \`\`\`
    import React, { useState } from 'react';

    const ExampleComponent = () => {
      const [count, setCount] = useState(0);

      const increment = () => setCount(count + 1);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      );
    };

    export default ExampleComponent;
    \`\`\`
    Can I use different names for \`\`state\`\` variables and their setters?
  `;

  // Check if there is a code block before the 125th character
  const codeBlockIndex = fullText.indexOf('```');
  const truncateIndex = codeBlockIndex !== -1 && codeBlockIndex < 125 ? codeBlockIndex : 125;

  const truncatedText = fullText.length > truncateIndex ? fullText.substring(0, truncateIndex) : fullText;

  const formatText = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```|``.*?``)/g); // Split by parts that are wrapped in triple or double backticks
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        return <CodeBlock key={index} $isDarkMode={isDarkMode}>{part.slice(3, -3)}</CodeBlock>; // Remove the backticks and wrap in CodeBlock component
      } else if (part.startsWith("``") && part.endsWith("``")) {
        return <InlineCode key={index} $isDarkMode={isDarkMode}>{part.slice(2, -2)}</InlineCode>; // Remove the backticks and wrap in InlineCode component
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <ChirpContainer>
      <TextContainer>
        <Wrapper>
          <StyledText variant={"normal"} size={"1rem"} fontWeight='300'>
            {isExpanded ? formatText(fullText) : (
              <>
                {formatText(truncatedText)}
                {fullText.length > truncateIndex && (
                  <SeeMoreButton onClick={handleToggle} $isDarkMode={isDarkMode}>
                    ...See more
                  </SeeMoreButton>
                )}
              </>
            )}
            {fullText.length > truncateIndex && isExpanded && (
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
  width: 93%;
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
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const SeeMoreButton = styled.span<{ $isDarkMode: boolean }>`
  color: rgb(184, 27, 100);
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
