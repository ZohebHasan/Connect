import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import SkillDark from "../../../../../assets/skillDark.png";
import SkillLight from "../../../../../assets/skillLight.png";

import Header from '../../common/header';
import TextBody from '../../common/textDescription';

interface Media {
  type: 'image' | 'video';
  url: string;
}

interface CommonInfo {
  title: string;
  timeType?: string;
  location?: string;
  duration: string;
  description: string;
  media?: Media[];
  department?: string;
}

interface SkillInfo extends CommonInfo {
  proficiency?: string;
  endorsedBy?: { id: number; src: string }[];
}

interface SkillsComponentProps {
  headerType: string;
  data: SkillInfo[];
}

const SkillsComponent: React.FC<SkillsComponentProps> = ({ headerType, data }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <SkillsContainer>
      <Header HeaderType={headerType} display={"fullScreen"} />
      <SkillsList>
        {data.map((skill, index) => {
          const { title, duration, description, proficiency, endorsedBy } = skill;
          const visibleEndorsers = endorsedBy?.slice(0, 3) || [];
          const remainingEndorsersCount = endorsedBy ? endorsedBy.length - visibleEndorsers.length : 0;

          return (
            <SkillWrapper key={index}>
              <IconContainer>
                <SkillIcon src={isDarkMode ? SkillDark : SkillLight} />
                <VerticalDivider />
              </IconContainer>

              <SkillDetails>
                <SkillHeader>
                  <SkillTitle>
                    <Text variant={"normal"} size={"1.4rem"} fontWeight={"400"}>
                      {title}
                    </Text>
                  </SkillTitle>
                </SkillHeader>
                <SkillInfo>
                  <PracticeDuration>
                    <Text variant={"transparent"} size={"0.95rem"} fontWeight={"300"}>
                      In practice for:
                    </Text>
                    <Text variant={"normal"} size={"0.95rem"} fontWeight={"300"}>
                      {duration}
                    </Text>
                  </PracticeDuration>
                  <Text variant="transparent" size="1rem" fontWeight="300">
                    •
                  </Text>
                  <PracticeDuration>
                    <Text variant={"normal"} size={"0.95rem"} fontWeight={"300"}>
                      {proficiency}
                    </Text>
                  </PracticeDuration>
                </SkillInfo>

                <SkillDescription>
                  <Text variant={"normal"} size={"1rem"} fontWeight={"300"}>
                    •
                  </Text>
                  {/* <Text variant={"normal"} size={"1rem"} fontWeight={"300"}>
                    {description}
                  </Text> */}
                  <TextBody textBody={description} display= {"fullScreen"}/>
                </SkillDescription>

                <EndorsersContainer>
                  <Text variant={"normal"} size={"0.95rem"} fontWeight={"300"}>
                    Endorsed by:
                  </Text>
                  <EndorsersList>
                    {visibleEndorsers.map((endorser) => (
                      <Endorser key={endorser.id}>
                        <OuterBorder>
                          <InnerBorder $isDarkMode={isDarkMode}>
                            <EndorserImage src={endorser.src} />
                          </InnerBorder>
                        </OuterBorder>
                      </Endorser>
                    ))}
                    {remainingEndorsersCount > 0 && (
                      <EndorserTextWrapper>
                        <Text variant={"normal"} size={"0.9rem"} fontWeight={"300"}>
                          and
                        </Text>
                        <RemainingEndorsers>
                          <Text variant={"normal"} size={"0.9rem"} fontWeight={"300"}>
                            {remainingEndorsersCount} other{remainingEndorsersCount > 1 ? 's' : ''}.
                          </Text>
                        </RemainingEndorsers>
                      </EndorserTextWrapper>
                    )}
                  </EndorsersList>
                </EndorsersContainer>
              </SkillDetails>
            </SkillWrapper>
          );
        })}
      </SkillsList>
    </SkillsContainer>
  );
};

export default SkillsComponent;

const SkillsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: flex-start;
  justify-content: center;
`;

const SkillWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.7rem;
  margin-top: 1rem;
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3.2rem;
  height: 100%;
  position: absolute;
`;

const SkillIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.2rem;
`;

const VerticalDivider = styled.div`
  width: 1px;
  background-color: #ccc;
  height: 95%;
  margin-top: 0.7rem;
`;

const SkillDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  margin-left: 3.2rem;
`;

const SkillHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SkillTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const SkillInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: center;
`;

const PracticeDuration = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SkillDescription = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const EndorsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const EndorsersList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-top: 0.1rem;
`;

const EndorserTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

const Endorser = styled.div``;

const RemainingEndorsers = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const OuterBorder = styled.div`
  background: linear-gradient(to right, #2E3192, #1BFFFF);
  padding: 1.8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const InnerBorder = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${(props) => (props.$isDarkMode ? 'black' : 'white')};
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

const EndorserImage = styled.img`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

