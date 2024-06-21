import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import DummyProfessional from "../../../../dummies/professional.jpeg"



import ProjectDark from "../../../../../assets/projectDark.png"
import ProjectLight from "../../../../../assets/projectLight.png"


import LinkDark from "../../../../../assets/linkDark.png"
import LinkLight from "../../../../../assets/linkLight.png"

import VerifiedIcon from "../../../../../assets/verified.png"

import Header from '../header';

const VerifiedBadge: React.FC = () => {
  return (
    <>
      <VerifiedBadgeContainer>
        <StyledLogo src={VerifiedIcon} alt="Logo" />
      </VerifiedBadgeContainer>
    </>
  )

}

const VerifiedBadgeContainer = styled.div`
    display: flex;
    align-items: flex-start;

`

const StyledLogo = styled.img`
    width: 1.3rem;
    height: 1.3rem;

`;


const ProjectElement: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const isVerified = true;

  const collaborators = [
    { id: 1, src: DummyProfessional },
    { id: 2, src: DummyProfessional },
    { id: 3, src: DummyProfessional },
    { id: 4, src: DummyProfessional },
  ];

  const visibleCollaborators = collaborators.slice(0, 3);
  const remainingCollaboratorsCount = collaborators.length - visibleCollaborators.length;

  return (
    <ProjectContainer>
      <Header HeaderType='project'/>
      <Projects>
        <DegreeWrapper>
          <StringIconContainer>
            <JobIcon src={isDarkMode ? ProjectDark : ProjectLight} />
            <VerticalLine />
          </StringIconContainer>

          <Degree>
            <DegreeTop>
              <DegreeName>
                <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                  B-Tree
                </Text>
        
              </DegreeName>
            </DegreeTop>
            <ProjectInfo>

              <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                Designer and Developer
              </Text>
              <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                •
              </Text>
              <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                Jan 2024 - Present (5 mos)
              </Text>
            </ProjectInfo>
            <SkillsContainer>
              <Text variant={"transparent"} size={"0.75rem"} fontWeight={"300"}>
                Skills gained/utilized:
              </Text>
              <Text variant={"normal"} size={"0.75rem"} fontWeight={"300"}>
                Java
              </Text>
            </SkillsContainer>
            <DegreeDescription>
              <Text variant={"normal"} size={"0.9rem"} fontWeight={"300"}>
                •
              </Text>
              <Text variant={"normal"} size={"0.9rem"} fontWeight={"300"}>
                Designed and created an end-to-end encrypted platform and coded 24/7
                like an idiot collaborating with his idiot friends just like himself.
              </Text>
            </DegreeDescription>
            <ProjectLinkContainer>
              <ProjectLinkWrapper $isDarkMode={isDarkMode}>
                <Text variant={"normal"} size={"0.9rem"} fontWeight={"300"}>
                  Project Link
                </Text>
                <LinkIcon src={isDarkMode ? LinkDark : LinkLight} />
              </ProjectLinkWrapper>

            </ProjectLinkContainer>

            <CollaboratorContainer>
              <Text variant={"normal"} size={"0.9rem"} fontWeight={"300"}>
                Collaborators:
              </Text>
              <CollaboratorListWrapper>
                {visibleCollaborators.map((collaborator) => (
                  <Collaborator key={collaborator.id}>
                    <Border>
                      <InnerBorder $isDarkMode={isDarkMode}>
                        <Story src={collaborator.src} />
                      </InnerBorder>
                    </Border>
                  </Collaborator>
                ))}
                {remainingCollaboratorsCount > 0 && (
                  <>
                    <TextWrapper>
                      <Text variant={"normal"} size={"0.8rem"} fontWeight={"300"}>
                        and
                      </Text>
                      <OtherCollaborator>
                        <Text variant={"normal"} size={"0.8rem"} fontWeight={"300"}>
                          {remainingCollaboratorsCount} other.
                        </Text>
                      </OtherCollaborator>
                    </TextWrapper>

                  </>

                )}
              </CollaboratorListWrapper>

            </CollaboratorContainer>

          </Degree>
        </DegreeWrapper>
      </Projects>
    </ProjectContainer>
  );
};

export default ProjectElement;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`

const CollaboratorListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-top: 0.1rem;
`

const ProjectLinkWrapper = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  border: 1px solid ${props => (props.$isDarkMode ? 'white' : 'black')};
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
`

const ProjectLinkList = styled.div`
  display: flex;
  flex-direction: row;
`

const ProjectLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`

const Story = styled.img`
  width: 2.5rem;
  height: 2.5rem;
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

const AvatarContainer = styled.div`
  
`

const Border = styled.div`
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

const CollaboratorList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 0.3rem;
`
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
`

const Collaborator = styled.div`


  
`

const CollaboratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`

const SkillsContainer = styled.div`
  display: flex;
  /* margin-top: 0.5rem; */
  gap: 0.3rem;
  align-items: flex-start;
  justify-content: flex-start;
`

const Musk = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    /* align-items: flex-start; */
    /* justify-content: flex-start; */
    /* gap: 0.7rem; */

`;

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const JobIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.2rem;
`;

const StringIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3.2rem;
  height: 100%;
`;

const VerticalLineCompanies = styled.div`
  width: 1px;
  background-color: #ccc; /* Adjust color as needed */
  /* flex-grow: 1; */
  /* height: 1rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  margin-top: 0.7rem;
`;

const VerticalLine = styled.div`
  width: 1px;
  background-color: #ccc; /* Adjust color as needed */
  /* flex-grow: 1; */
  /* height: 1rem; */
  height: 60%;
  margin-top: 0.7rem;
`;

const DegreeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.7rem;
  margin-top: 1rem;
`;

const DegreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: pink; */
`;

const DegreeLocation = styled.div``;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: center;
`;

const DegreeName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const DegreeTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Degree = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const WorkingDuration = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProjectTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const DegreeDescription = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const CompanyNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;

`;

const CompanyLogo = styled.img`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
`;

const CompanyLogoContainer = styled.div``;

const CompanyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const Projects = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: flex-start;
  justify-content: center;
`;

const ProjectHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

const ProjectContainer = styled.div`
  display: flex;
  width: 85%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;

const AboutInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 1rem;
`;
