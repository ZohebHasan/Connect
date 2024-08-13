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

import RightArrowDark from '../../../../../assets/rightArrowDark.png';
import RightArrowLight from '../../../../../assets/rightArrowLight.png';


import AddIconDark from "../../../../../assets/createDarkActive.png"
import AddIconLight from "../../../../../assets/createLightActive.png"


// import { useAboutInfoContext } from '../../../../../../contexts/professionalProfile/aboutContext';


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
  association?: Org;
  projectLink?: string;
  collaborators?: UserProfile[];
  skills?: string[];
}

interface Org {
  company?: string; // This will hold the ObjectId as a string
  name?: string;
  isVerified?: boolean;
  profilePhoto?: string;
}

interface UserProfile {
  userId: String;
  name?: string;
  isVerified?: boolean;
  profilePhoto?: string;
}

interface ResearchAndPubInfo extends CommonInfo {
  role?: string;
  association?: Org;
  researchLink?: string;
  collaborators?: UserProfile[];
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
  // const { setActiveType, toggleDataBar } = useAboutInfoContext();

  const iconDark = headerType === 'project' ? ProjectDark : ResearchDark;
  const iconLight = headerType === 'project' ? ProjectLight : ResearchLight;

  const getSeeAllText = () => {
    switch (headerType) {
      case 'project':
        return `${info.length} projects`;
      case 'research':
        return `${info.length} research & publications`;
      default:
        return `${info.length} items`;
    }
  };

  const getAddText = () => {
    switch (headerType) {
      case 'project':
        return `projects`;
      case 'research':
        return `research & publications`;
      default:
        return 'projects';
    }
  };

  if (info.length  === 0) {
    return <>
      <ElementContainer>
        <Header HeaderType={headerType} display={"notFullScreen"} />

        <IconContainer>
          <AddInfoWrapper>
            <AddIcon src={isDarkMode ? AddIconDark : AddIconLight} $isDarkMode={isDarkMode} />
            <Text variant={"transparent"} size={"1rem"} fontWeight={"400"}>
              Add {getAddText()}
            </Text>
          </AddInfoWrapper>
        </IconContainer>
      </ElementContainer>
    </>
  }

  // const handleShowAllClick = () => {
  //   setActiveType(headerType);
  //   toggleDataBar();
  // };

  return (
    <ElementContainer>
      <Header HeaderType={headerType} display={"notFullScreen"} />
      {info.slice(0, 1).map((item, index) => (
        <Info key={index}>
          <ContentWrapper>
            <IconWrapper>
              <Icon src={isDarkMode ? iconDark : iconLight} />
              <VerticalLine />
            </IconWrapper>

            <Details>
              <Title>
                <Text variant="normal" size="1.1rem" fontWeight="400">
                  {item.title}
                </Text>
              </Title>

              {item.role && (
                <InfoRow>
                  <Text variant="transparent" size="0.85rem" fontWeight="300">
                    {item.role}
                  </Text>
                  <Text variant="transparent" size="1rem" fontWeight="300">
                    •
                  </Text>
                  <Text variant="transparent" size="0.85rem" fontWeight="300">
                    {item.duration}
                  </Text>
                </InfoRow>
              )}

              {item.skills && (
                <Skills>
                  <Text variant="transparent" size="0.75rem" fontWeight="300">
                    Skills gained/utilized:
                  </Text>
                  {item.skills.map((skill, index) => (
                    <Text key={skill} variant="normal" size="0.75rem" fontWeight="300">
                      {skill}{index < (item.skills?.length ?? 0) - 1 && ','}
                    </Text>
                  ))}
                </Skills>
              )}

              <Description>
                <Text variant="normal" size="0.9rem" fontWeight="300">
                  •
                </Text>
                <TextBody textBody={item.description} display={'notFullScreen'} />
              </Description>

              {(item as ProjectInfo).projectLink && (
                <LinkContainer>
                  <LinkWrapper isDarkMode={isDarkMode}>
                    <Text variant="normal" size="0.9rem" fontWeight="300">
                      Project Link
                    </Text>
                    <LinkIcon src={isDarkMode ? LinkDark : LinkLight} />
                  </LinkWrapper>
                </LinkContainer>
              )}

              {(item as ResearchAndPubInfo).researchLink && (
                <LinkContainer>
                  <LinkWrapper isDarkMode={isDarkMode}>
                    <Text variant="normal" size="0.9rem" fontWeight="300">
                      Research/Publication Link
                    </Text>
                    <LinkIcon src={isDarkMode ? LinkDark : LinkLight} />
                  </LinkWrapper>
                </LinkContainer>
              )}

              {item.association && (
                <AssociationContainer>
                  <Text variant="normal" size="0.9rem" fontWeight="300">
                    Association:
                  </Text>
                  <AssociationContent>
                    <LogoContainer>
                      <Logo src={item.association.profilePhoto} />
                    </LogoContainer>
                    <OrgName>
                      <Text variant="normal" size="0.9rem" fontWeight="400">
                        {item.association.name}
                      </Text>
                      {item.association.isVerified && <VerifiedBadge />}
                    </OrgName>
                  </AssociationContent>
                </AssociationContainer>
              )}

              {item.collaborators && (
                <Collaborators>
                  <Text variant="normal" size="0.9rem" fontWeight="300">
                    Collaborators:
                  </Text>
                  <CollaboratorList>
                    {/* {item.collaborators.slice(0, 3).map(collaborator => (
                      <Collaborator key={collaborator.id}>
                        <Border>
                          <InnerBorder isDarkMode={isDarkMode}>
                            <Story src={collaborator.profilePhoto} />
                          </InnerBorder>
                        </Border>
                      </Collaborator>
                    ))} */}
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
      {info.length > 1 && (
        <ShowAllContainer>
          {/* <ShowAllContainer onClick={handleShowAllClick}> */}
          <Text variant="normal" size="1rem" fontWeight="500">
            See all {getSeeAllText()}
          </Text>
          <ArrowIcon src={isDarkMode ? RightArrowDark : RightArrowLight} />

        </ShowAllContainer>
      )}
    </ElementContainer>
  );
};

export default ResearchOrProjectElement;


const AddInfoWrapper = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.98);
    opacity: 0.6;
  }
`;

const AddIcon = styled.img<{ $isDarkMode: boolean }>`
  width: 1rem;
  padding: 0.3rem;
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
  border-radius: 3px;
`;

const IconContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;

`

const ArrowIcon = styled.img`
  width: 1.4rem;
`

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: flex-start;
  justify-content: center;
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

const ElementContainer = styled.div`
  display: flex;
  width: 85%;
  flex-direction: column;
  align-items: center;
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
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3.2rem;
  height: 100%;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
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

const LinkWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  border: 1px solid ${props => (props.isDarkMode ? 'white' : 'black')};
  padding: 3px 6px;
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
  width: 1rem;
  height: 1rem;
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
  width: 2.1rem;
  height: 2.1rem;
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
  width: 2.5rem;
  height: 2.5rem;
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

const ShowAllContainer = styled.div`
  width: 100%;
  gap: 0.4rem;
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
