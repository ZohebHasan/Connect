import React, { useState } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../../../contexts/DarkMode/DarkMode';
import DummyPersonal from "../../../../../../dummies/personal.jpeg";

import Text from '../../../../../../../ConnectUI_web/common/texts/static';
import InfoIcon from "../../../../../../../assets/info.png"

const MAX_CHARACTERS = 241;

const Chirp: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const remainingCharacters = MAX_CHARACTERS - inputValue.length;
  const wordCountColor = isDarkMode ? 'white' : 'black';

  const formatText = (text: string) => {
    const parts = text.split(/(`[^`]+`|``)/g); // Split by parts that are wrapped in single backticks, including empty backticks
    return parts.map((part, index) => {
      if (part === '``') {
        return <span key={index}>``</span>; // Keep empty backticks as they are
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <Code key={index} $isDarkMode={isDarkMode}>{part.slice(1, -1)}</Code>; // Remove the backticks and wrap in Code component
      }
      return <span key={index}>{part}</span>;
    });
  };

  const text = "Tips: You can use backticks '``' to format your chirp `code` fonts.";

  return (
    <>
      <ChirpInputContainer>
        <ChirpInputWrapper $isDarkMode={isDarkMode}>
          <UserIconContainer>
            <Border>
              <InnerBorder $isDarkMode={isDarkMode}>
                <Story src={DummyPersonal} />
              </InnerBorder>
            </Border>
          </UserIconContainer>
          <InputContainer>
            <StyledTextArea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="What are you thinking, Zoheb?!"
              maxLength={MAX_CHARACTERS + 150}
              $isDarkMode={isDarkMode}
              spellCheck={false} // Disable spellcheck
            />
          </InputContainer>
        </ChirpInputWrapper>
        <WordCountContainer wordCountColor={wordCountColor}>
          <CharacterCount isExceeding={inputValue.length > MAX_CHARACTERS}>
            {inputValue.length}
          </CharacterCount>
          / {MAX_CHARACTERS}
        </WordCountContainer>
        <TipContainer $isDarkMode={isDarkMode}>
          <Info src={InfoIcon} />
          <Text variant={"transparent"} size={"1rem"} fontWeight={"400"}>
            {formatText(text)}
          </Text>
        </TipContainer>
      </ChirpInputContainer>
    </>
  );
};

export default Chirp;

const Info = styled.img`
  width: 1rem;
`;

const TipContainer = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff4d' : '#0000004d')};
  width: 95%;
  border-radius: 5px;
  padding: 0.2rem 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Story = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const InnerBorder = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${props => (props.$isDarkMode ? 'black' : 'white')};
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

const Border = styled.div`
  background: linear-gradient(to right, #662D8C, #ED1E79);
  padding: 1.8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 1rem;
`;

const StyledTextArea = styled.textarea<{ $isDarkMode: boolean }>`
  height: 100%;
  width: 100%;
  background: none; 
  border: none;
  outline: none;
  color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')}; 
  caret-color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')}; 
  resize: none;
  z-index: 1;
  position: relative;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1.3rem;
`;

const WordCountContainer = styled.div<{ wordCountColor: string }>`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  color: ${({ wordCountColor }) => wordCountColor};
`;

const CharacterCount = styled.span<{ isExceeding: boolean }>`
  color: ${({ isExceeding }) => isExceeding ? 'red' : 'inherit'};
`;

const ChirpInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  gap: 1rem;
  height: 100%;
`;

const UserIconContainer = styled.div``;

const ChirpInputWrapper = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 95%;
  gap: 1rem;
  flex: 1;
  padding: 1rem;
  border-radius: 5px;
`;

const Code = styled.span<{ $isDarkMode: boolean }>`
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#ededed92' : '#4040405a'};
  color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
  padding: 3px 6px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  border-radius: 5px;
  font-weight: 550;
`;
