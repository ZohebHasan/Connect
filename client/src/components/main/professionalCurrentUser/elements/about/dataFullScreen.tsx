import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import { useAboutInfoContext } from '../../../../../contexts/professionalProfile/aboutContext';

import DataContainer from '../../../../ConnectUI_web/templetes/postBarContainer';
import CloseDark from "../../../../assets/closeDark.png";
import CloseLight from "../../../../assets/closeLight.png";

import AboutDataElement from './infoWOrg/fullScreen';
import SkillComponent from "./skills/fullScreen";
import ResearchOrProjectElement from "./researchAndProjects/fullScreen";

const StoriesContainer: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { isDataBarOpen, toggleDataBar, activeType, setActiveType, researchAndPublications, skills, projects, education, experiences, leadership, awards, certifications } = useAboutInfoContext();

  const renderActiveComponent = () => {
    switch (activeType) {
      case 'experience':
        return <AboutDataElement headerType="experience" organizations={experiences} />;
      case 'education':
        return <AboutDataElement headerType="education" organizations={education} />;
      case 'project':
        return <ResearchOrProjectElement headerType="project" info={projects} />;
      case 'research':
        return <ResearchOrProjectElement headerType="research" info={researchAndPublications} />;
      case 'leadership':
        return <AboutDataElement headerType="leadership" organizations={leadership} />;
      case 'skill':
        return <SkillComponent headerType="skill" data={skills} />;
      case 'certification':
        return <AboutDataElement headerType="certification" organizations={certifications} />;
      case 'award':
        return <AboutDataElement headerType="award" organizations={awards} />;
      default:
        return null;
    }
  };

  return (
    <DataContainer isOpen={isDataBarOpen}>
      <TopContainer>
        <ClosingButtonContainer>
          <ClosingButtonWrapper>
            <ClosingButton src={isDarkMode ? CloseDark : CloseLight} onClick={() => {
              toggleDataBar();
              setActiveType(null);
            }} />
          </ClosingButtonWrapper>
        </ClosingButtonContainer>
      </TopContainer>
      <DataList $isDarkMode={isDarkMode}>
        <Wrapper>
          <Data>
            {renderActiveComponent()}
          </Data>
        </Wrapper>
      </DataList>
    </DataContainer>
  );
};

export default StoriesContainer;

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  justify-content:center; /* Align items to the top */

 
`;

const DataList = styled.div<{ $isDarkMode: boolean }>`
  width: 100%;
  height: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  justify-content: flex-start; /* Align items to the top */
  margin-top: 1rem;


  ::-webkit-scrollbar {
    width: 4px; 
    height: 8px; 
  }

  ::-webkit-scrollbar-track {
    background: transparent; 
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ $isDarkMode }) => ($isDarkMode ? '#555' : '#888')}; 
    border-radius: 10px; 
    min-height: 30px; 
    transition: background-color 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #f41c7ac9;
  }
`;

const Data = styled.div`
  width: 100%;
  display: flex;
  align-items: center; /* Center items horizontally */
  justify-content: flex-start; /* Align items to the top */

`;

const ClosingButtonWrapper = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: flex-end;
`;

const ClosingButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

const ClosingButton = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.10);
  }

  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const TopContainer = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  top: 0;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;
