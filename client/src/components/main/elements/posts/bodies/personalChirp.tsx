import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

interface ChirpComponentProps {
  textBody: string;
}

const ChirpComponent: React.FC<ChirpComponentProps> = ({ textBody }) => {
  const { isDarkMode } = useDarkMode();

  const formatText = (text: string) => {
    const parts = text.split(/(``.*?``)/g); // Split by parts that are wrapped in double backticks
    return parts.map((part, index) => {
      if (part.startsWith("``") && part.endsWith("``")) {
        return <Code key={index} $isDarkMode={isDarkMode}>{part.slice(2, -2)}</Code>; // Remove the backticks and wrap in Code component
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <ChirpContainer>
      <TextContainer>
        <Wrapper>
          <StyledText variant={"normal"} size={"1rem"} fontWeight='300'>
            {formatText(textBody)}
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
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChirpContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const StyledText = styled(Text)`
  display: inline;
  line-height: 1.6;
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
