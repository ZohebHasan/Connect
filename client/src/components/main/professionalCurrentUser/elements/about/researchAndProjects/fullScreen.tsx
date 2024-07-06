import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import VerifiedIcon from '../../../../../assets/verified.png';

import Header from '../../common/header';
import TextBody from '../../common/textDescription';


import ProjectDark from "../../../../../assets/projectDark.png";
import ProjectLight from "../../../../../assets/projectLight.png";

import ResearchDark from "../../../../../assets/researchDark.png";
import ResearchLight from "../../../../../assets/researchLight.png";

import LinkDark from "../../../../../assets/linkDark.png";
import LinkLight from "../../../../../assets/linkLight.png";

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

interface ProjectInfo extends CommonInfo {
  role?: string;
  association?: Association;
  projectLink?: string;
  collaborators?: { id: number; src: string }[];
  skills?: string[];
}

interface ResearchAndPubInfo extends CommonInfo {
  role?: string;
  association?: Association;
  researchLink?: string;
  collaborators?: { id: number; src: string }[];
  skills?: string[];
}

interface ElementProps {
  headerType: string;
  info: (ProjectInfo | ResearchAndPubInfo)[];
}

interface Association {
  logo: string;
  name: string;
  link: string;
  isVerified: boolean;
}

const ResearchOrProjectElement: React.FC<ElementProps> = ({ headerType, info }) => {
  const { isDarkMode } = useDarkMode();
  const iconDark = headerType === 'project' ? ProjectDark : ResearchDark;
  const iconLight = headerType === 'project' ? ProjectLight : ResearchLight;

  return (
    <ElementContainer>
      <Header HeaderType={headerType} display={"fullScreen"} />
      {info.map((item, index) => (
        <Info key={index}>
          <ContentWrapper>
            <IconWrapper>
              <Icon src={isDarkMode ? iconDark : iconLight} />
              <VerticalLine />
            </IconWrapper>

            <Details>
              <Title>
                <Text variant="normal" size="1.4rem" fontWeight="400">
                  {item.title}
                </Text>
              </Title>

              {item.role && (
                <InfoRow>
                  <Text variant="transparent" size="0.95rem" fontWeight="300">
                    {item.role}
                  </Text>
                  <Text variant="transparent" size="1.4rem" fontWeight="300">
                    •
                  </Text>
                  <Text variant="transparent" size="0.95rem" fontWeight="300">
                    {item.duration}
                  </Text>
                </InfoRow>
              )}

              {item.skills && (
                <Skills>
                  <Text variant="transparent" size="0.85rem" fontWeight="300">
                    Skills gained/utilized:
                  </Text>
                  {item.skills.map((skill, index) => (
                    <Text key={skill} variant="normal" size="0.86rem" fontWeight="400">
                      {skill}{index < (item.skills?.length ?? 0) - 1 && ','}
                    </Text>
                  ))}
                </Skills>
              )}

              <Description>
                <Text variant="normal" size="1rem" fontWeight="300">
                  •
                </Text>
                {/* <Text variant="normal" size="1rem" fontWeight="300">
                  {item.description}
                </Text> */}
                <TextBody textBody={item.description} display= {"fullScreen"} />

              </Description>

              {(item as ProjectInfo).projectLink && (
                <LinkContainer>
                  <LinkWrapper isDarkMode={isDarkMode}>
                    <Text variant="normal" size="1rem" fontWeight="300">
                      Project Link
                    </Text>
                    <LinkIcon src={isDarkMode ? LinkDark : LinkLight} />
                  </LinkWrapper>
                </LinkContainer>
              )}

              {(item as ResearchAndPubInfo).researchLink && (
                <LinkContainer>
                  <LinkWrapper isDarkMode={isDarkMode}>
                    <Text variant="normal" size="0.95rem" fontWeight="300">
                      Research/Publication Link
                    </Text>
                    <LinkIcon src={isDarkMode ? LinkDark : LinkLight} />
                  </LinkWrapper>
                </LinkContainer>
              )}

              {item.association && (
                <AssociationContainer>
                  <Text variant="normal" size="1rem" fontWeight="300">
                    Association:
                  </Text>
                  <AssociationContent>
                    <LogoContainer>
                      <Logo src={item.association.logo} />
                    </LogoContainer>
                    <OrgName>
                      <Text variant="normal" size="1rem" fontWeight="400">
                        {item.association.name}
                      </Text>
                      {item.association.isVerified && <VerifiedBadge />}
                    </OrgName>
                  </AssociationContent>
                </AssociationContainer>
              )}

              {item.collaborators && (
                <Collaborators>
                  <Text variant="normal" size="1rem" fontWeight="300">
                    Collaborators:
                  </Text>
                  <CollaboratorList>
                    {item.collaborators.slice(0, 3).map(collaborator => (
                      <Collaborator key={collaborator.id}>
                        <Border>
                          <InnerBorder isDarkMode={isDarkMode}>
                            <Story src={collaborator.src} />
                          </InnerBorder>
                        </Border>
                      </Collaborator>
                    ))}
                    {item.collaborators.length > 3 && (
                      <MoreCollaborators>
                        <TextWrapper>
                          <Text variant="normal" size="0.8rem" fontWeight="300">
                            and
                          </Text>
                          <OtherCollaborator>
                            <Text variant="normal" size="0.8rem" fontWeight="300">
                              {item.collaborators.length - 3} other.
                            </Text>
                          </OtherCollaborator>
                        </TextWrapper>
                      </MoreCollaborators>
                    )}
                  </CollaboratorList>
                </Collaborators>
              )}
            </Details>
          </ContentWrapper>
        </Info>
      ))}
    </ElementContainer>
  );
};

export default ResearchOrProjectElement;

const ElementContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: flex-start;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.7rem;
  margin-top: 1rem;
  position: relative;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3.2rem;
  position: absolute;
  height: 100%;
`;

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-top: 0.2rem;
`;

const VerticalLine = styled.div`
 width: 1px;
  background-color: #ccc;
  height: 95%;
  margin-top: 0.7rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 3.2rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: center;
`;

const Skills = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Description = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;

const LinkWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  border: 1px solid ${props => (props.isDarkMode ? 'white' : 'black')};
  padding: 5px 10px;
  border-radius: 5px;
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

const LinkIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

const AssociationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

const AssociationContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
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

const LogoContainer = styled.div``;

const Logo = styled.img`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
`;

const OrgName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const Collaborators = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CollaboratorList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-top: 0.1rem;
`;

const Collaborator = styled.div``;

const Border = styled.div`
  background: linear-gradient(to right, #2e3192, #1bffff);
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

const InnerBorder = styled.div<{ isDarkMode: boolean }>`
  background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

const Story = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const MoreCollaborators = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

const OtherCollaborator = styled.div`
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

const VerifiedBadge: React.FC = () => (
  <VerifiedBadgeContainer>
    <StyledLogo src={VerifiedIcon} alt="Verified" />
  </VerifiedBadgeContainer>
);

const VerifiedBadgeContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledLogo = styled.img`
  width: 1.3rem;
  height: 1.3rem;
`;
