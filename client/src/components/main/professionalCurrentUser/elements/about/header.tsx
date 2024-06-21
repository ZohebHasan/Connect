import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

import JobIconDark from "../../../../assets/jobDark.png";
import JobIconLight from "../../../../assets/jobLight.png";

import EducationDark from "../../../../assets/educationDark.png";
import EducationLight from "../../../../assets/educationLight.png";

import ProjectDark from "../../../../assets/projectDark.png";
import ProjectLight from "../../../../assets/projectLight.png";

import ResearchDark from "../../../../assets/researchDark.png";
import ResearchLight from "../../../../assets/researchLight.png";

import LeadershipIconDark from "../../../../assets/controlDark.png";
import LeadershipIconLight from "../../../../assets/controlLight.png";

import SkillDark from "../../../../assets/skillDark.png";
import SkillLight from "../../../../assets/skillLight.png";

import RecommendationDark from "../../../../assets/recommendationDark.png";
import RecommendationLight from "../../../../assets/recommendationLight.png";

import CertificationDark from "../../../../assets/certificationDark.png";
import CertificationLight from "../../../../assets/certificationLight.png";

import AwardDark from "../../../../assets/awardDark.png";
import AwardLight from "../../../../assets/awardLight.png";

interface HeaderProps {
  HeaderType: string;
}

const Header: React.FC<HeaderProps> = ({ HeaderType }) => {
  const { isDarkMode } = useDarkMode();

  const getIcon = () => {
    switch (HeaderType) {
      case 'job':
        return isDarkMode ? JobIconDark : JobIconLight;
      case 'education':
        return isDarkMode ? EducationDark : EducationLight;
      case 'project':
        return isDarkMode ? ProjectDark : ProjectLight;
      case 'research':
        return isDarkMode ? ResearchDark : ResearchLight;
      case 'leadership':
        return isDarkMode ? LeadershipIconDark : LeadershipIconLight;
      case 'skill':
        return isDarkMode ? SkillDark : SkillLight;
      case 'recommendation':
        return isDarkMode ? RecommendationDark : RecommendationLight;
      case 'certification':
        return isDarkMode ? CertificationDark : CertificationLight;
      case 'award':
        return isDarkMode ? AwardDark : AwardLight;
      default:
        return isDarkMode ? JobIconDark : JobIconLight;
    }
  };

  const getHeaderText = () => {
    switch (HeaderType) {
      case 'job':
        return 'Experiences';
      case 'education':
        return 'Education';
      case 'project':
        return 'Projects';
      case 'research':
        return 'Research & Publications';
      case 'leadership':
        return 'Leadership & Extracurricular Activities';
      case 'skill':
        return 'Skills & Expertise';
      case 'recommendation':
        return 'Recommendations';
      case 'certification':
        return 'Certifications';
      case 'award':
        return 'Awards';
      default:
        return 'Experiences';
    }
  };

  const getBorderIcon = () => {
    switch (HeaderType) {
      case 'job':
        return isDarkMode ? JobIconLight : JobIconDark;
      case 'education':
        return isDarkMode ? EducationLight : EducationDark;
      case 'project':
        return isDarkMode ? ProjectLight : ProjectDark;
      case 'research':
        return isDarkMode ? ResearchLight : ResearchDark;
      case 'leadership':
        return isDarkMode ? LeadershipIconLight : LeadershipIconDark;
      case 'skill':
        return isDarkMode ? SkillLight : SkillDark;
      case 'recommendation':
        return isDarkMode ? RecommendationLight : RecommendationDark;
      case 'certification':
        return isDarkMode ? CertificationLight : CertificationDark;
      case 'award':
        return isDarkMode ? AwardLight : AwardDark;
      default:
        return isDarkMode ? JobIconLight : JobIconDark;
    }
  };

  return (
    <HeaderContainer>
      <Wrapper>
        <IconContainer>
          <Icon2Container>
            <BorderContainer>
              <BorderImageContainer>
                <BorderIcon src={getBorderIcon()} />
              </BorderImageContainer>
              <TopImageContainer>
                <Icon src={getIcon()} />
              </TopImageContainer>
            </BorderContainer>
          </Icon2Container>
          <Icon1Container>
            <Icon src={getIcon()} />
          </Icon1Container>
        </IconContainer>
        <TextContainer>
          <Text variant={"normal"} size={"1.6rem"} fontWeight={"400"}>
            {getHeaderText()}
          </Text>
        </TextContainer>
      </Wrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 2.5rem;
`;

const Icon1Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 0;
`;

const Icon2Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

const BorderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BorderImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const TopImageContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const BorderIcon = styled.img`
  width: 1.7rem;
  height: 1.7rem;
`;

const Icon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;
