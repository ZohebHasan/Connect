import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../../../../ConnectUI_web/common/texts/static';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

const Caption: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

//    const fullText = "I am saddened to share that today. I have been laid off from Google. Please let me know if you have any opportunity for me. Here's a code snippet: ``const[state, setState]``. This message is extended to reach a total of 300 characters. Let's make sure to provide the best support for those in need.";

  const fullText = `
    I am saddened to share that today. I have been laid off from Google. Please let me know if you have any opportunity for me.
    Here's a code snippet: \`\`const[state, setState]\`\`.
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
    This message is extended to reach a total of 300 characters. Let's make sure to provide the best support for those in need.
  `;

  const truncatedText = fullText.length > 125 ? fullText.substring(0, 125) : fullText;

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
    <CaptionContainer>
      <TextContainer>
        <Wrapper>
          <Text variant={"normal"} size={"1rem"} fontWeight='300'>
            {isExpanded ? formatText(fullText) : (
              <>
                {formatText(truncatedText)}
                {fullText.length > 125 && (
                  <SeeMoreButton onClick={handleToggle} isDarkMode={isDarkMode}>
                    ...See more
                  </SeeMoreButton>
                )}
              </>
            )}
            {fullText.length > 125 && isExpanded && (
              <SeeMoreButton onClick={handleToggle} isDarkMode={isDarkMode}>
                See less
              </SeeMoreButton>
            )}
          </Text>
        </Wrapper>
      </TextContainer>
    </CaptionContainer>
  );
};

export default Caption;

const Wrapper = styled.div`
  display: flex;
  width: 93%;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SeeMoreButton = styled.span<{ isDarkMode: boolean }>`
  color: rgb(184, 27, 100);
  cursor: pointer;
  font-size: 1rem;
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
  margin-bottom: 1rem;
`;

const Code = styled.span<{ $isDarkMode: boolean }>`
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#ededed31' : '#9898985a'};
  color: ${({ $isDarkMode }) => $isDarkMode ? '#bdbdbd' : '#747474'};
  padding: 3px 6px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  border-radius: 5px;
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

const InlineCode = styled.span<{ $isDarkMode: boolean }>`
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#ededed31' : '#9898985a'};
  color: ${({ $isDarkMode }) => $isDarkMode ? '#bdbdbd' : '#474747'};
  padding: 3px 6px;
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  font-weight: 550;
`;