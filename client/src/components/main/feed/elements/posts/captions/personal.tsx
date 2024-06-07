import React, { useState } from 'react';
import styled from 'styled-components';
import VerifiedIcon from '../../../assets/verified.png';
import Text from '../../../../../ConnectUI_web/common/texts/static';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';

interface CaptionPersonalProps {
  userName: string;
  isVarified: boolean;
}

const VerifiedBadge: React.FC = () => (
  <VerifiedBadgeContainer>
    <StyledLogo src={VerifiedIcon} alt="Verified" />
  </VerifiedBadgeContainer>
);

const CaptionPersonal: React.FC<CaptionPersonalProps> = ({ userName, isVarified }) => {
  const { isDarkMode } = useDarkMode();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const fullText = "I am saddened to share that today. I have been laid off from Google. If you know of any opportunities, please let me know. Here's a code snippet: ``const[state, setState]`` in React.";

  const formatText = (text: string) => {
    const parts = text.split(/(``.*?``)/g); // Split by parts that are wrapped in double backticks
    return parts.map((part, index) => {
      if (part.startsWith("``") && part.endsWith("``")) {
        return <Code key={index} $isDarkMode={isDarkMode}>{part.slice(2, -2)}</Code>; // Remove the backticks and wrap in Code component
      }
      return <span key={index}>{part}</span>;
    });
  };

  const truncatedText = fullText.length > 125 ? fullText.substring(0, 125) : fullText;

  return (
    <CaptionContainer>
      <UserNameContainerBottom>
        <Text variant={'normal'} size={'1rem'} fontWeight="300">
          {userName}
        </Text>
        {isVarified && <VerifiedBadge />}
      </UserNameContainerBottom>
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
    </CaptionContainer>
  );
};

export default CaptionPersonal;

const SeeMoreButton = styled.span<{ isDarkMode: boolean }>`
  color: rgb(184, 27, 100);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 300;
  margin-left: 0.5rem;
`;

const VerifiedBadgeContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledLogo = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;

const CaptionContainer = styled.div`
  display: flex;
  width: 95%;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const UserNameContainerBottom = styled.div`
  flex: 3;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  gap: 0.3rem;
  width: 100%;
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
