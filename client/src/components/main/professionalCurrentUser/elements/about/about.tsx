import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';




import { useAboutInfoContext } from '../../../../../contexts/professionalProfile/aboutContext';
import { useProfessionalContext } from '../../../../../contexts/professionalProfile/professional';

import AboutDataElement from './infoWOrg/infoWOrg';
import SkillComponent from "./skills/skill";
import ResearchOrProjectElement from "./researchAndProjects/researchAndProjects";


const AboutInfo: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { researchAndPublications, skills, projects, education, experiences, leadership, awards, certifications } = useAboutInfoContext();
  const { ProfessionalProfile } = useProfessionalContext();
  return (
    <AboutInfoContainer>
      <AboutDataElement headerType="experience" organizations={ProfessionalProfile?.experiences ?? []} />
      <Divider isDarkMode={isDarkMode} />
      <AboutDataElement headerType="education" organizations={ProfessionalProfile?.educations ?? []} />
      <Divider isDarkMode={isDarkMode} />
      <ResearchOrProjectElement headerType={"project"} info={ProfessionalProfile?.projects ?? []} />
      <Divider isDarkMode={isDarkMode} />
      <ResearchOrProjectElement headerType={"research"} info={ProfessionalProfile?.research ?? []} />
      <Divider isDarkMode={isDarkMode} />
      <AboutDataElement headerType="leadership" organizations={ProfessionalProfile?.leadership ?? []} />
      <Divider isDarkMode={isDarkMode} />
      <SkillComponent headerType='skill' data={ProfessionalProfile?.skills ?? []} />
      <Divider isDarkMode={isDarkMode} />
      <AboutDataElement headerType="certification" organizations={ProfessionalProfile?.certifications ?? []} />
      <Divider isDarkMode={isDarkMode} />
      <AboutDataElement headerType="award" organizations={ProfessionalProfile?.awards ?? []} />


    </AboutInfoContainer>
  );
};

export default AboutInfo;

const AboutInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 2rem;
  gap: 2rem;
`;

const Divider = styled.hr<{ isDarkMode: boolean }>`
  width: 85%;
  border: 0;
  border-top: 0.5px solid ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  margin: 0;
`;
