import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';
import JobIconDark from "../../../../assets/jobDark.png";
import JobIconLight from "../../../../assets/jobLight.png";
import ConnectLogo from "../../../dummies/Connect.jpg";

import VerifiedIcon from "../../../../assets/verified.png"

import ExperienceElement from './experience/experience';
import EducationElement from './education/education';
import ProjectsElement from './project/project';
import ResearchAndPublicationsElement from './researchAndPublications/researchAndPublications';
import RecommendationElement from './recommendation/recommendation';
import AwardElement from "./award/award";
import CertificationElement from "./certification/certification";
import SkillComponent from "./skill/skill";
import LeadershipComponenets from "./leadership/leadership"

import { useAboutInfoContext } from '../../../../../contexts/professionalProfile/aboutContext';

import AboutDataElement from './bodyWParent';

const VerifiedBadge: React.FC = () => {
    return (
        <>
            <VerifiedBadgeContainer>
                <StyledLogo src={VerifiedIcon} alt="Logo" />
            </VerifiedBadgeContainer>
        </>
    );
}

const VerifiedBadgeContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const StyledLogo = styled.img`
    width: 1.3rem;
    height: 1.3rem;
`;

const AboutInfo: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { education, experiences, leadership, awards, certifications } = useAboutInfoContext();

    return (
        <AboutInfoContainer>
            {/* <ExperienceElement />
            <Divider isDarkMode={isDarkMode} />
            <EducationElement />
            <ProjectsElement />
            <Divider isDarkMode={isDarkMode} />
            <ResearchAndPublicationsElement />
            <Divider isDarkMode={isDarkMode} />
            <LeadershipComponenets />
            <Divider isDarkMode={isDarkMode} />
            <SkillComponent />
            <Divider isDarkMode={isDarkMode} />
            <RecommendationElement />
            <Divider isDarkMode={isDarkMode} />
            <CertificationElement />
            <Divider isDarkMode={isDarkMode} />
            <AwardElement /> */}


            <AboutDataElement headerType="experience" organizations={experiences} />
            <Divider isDarkMode={isDarkMode} />
            <AboutDataElement headerType="education" organizations={education} />
            <ProjectsElement />
            <Divider isDarkMode={isDarkMode} />
            <ResearchAndPublicationsElement />
            <Divider isDarkMode={isDarkMode} />
            <AboutDataElement headerType="leadership" organizations={leadership} />
            <Divider isDarkMode={isDarkMode} />
            <SkillComponent />
            {/* <Divider isDarkMode={isDarkMode} /> */}
            {/* <RecommendationElement /> */}
            <Divider isDarkMode={isDarkMode} />
            <AboutDataElement headerType="certification" organizations={certifications} />
            <Divider isDarkMode={isDarkMode} />
            <AboutDataElement headerType="award" organizations={awards} />


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
