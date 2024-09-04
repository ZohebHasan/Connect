import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import { useNavigate } from 'react-router-dom';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import OptionIconDark from "../../../../../assets/optionHorizontalDark.png";
import OptionIconLight from "../../../../../assets/optionHorizontalLight.png";


import SchoolPhotoDark from "../../../../../assets/schoolUserDark.png"
import SchoolPhotoLight from "../../../../../assets/schoolUserLight.png"

// import { Course, useCourses } from '../../../../../../contexts/schoolProfile/courseContext';
import { Course, useSchoolProfile } from '../../../../../../contexts/schoolProfile/school';

interface HeaderProps {
  course: Course;
}

const Header: React.FC = () => {
  const { isDarkMode } = useDarkMode();



  return (
    <HeaderContainer
      $isDarkMode={isDarkMode}

    >
      <TopWrapper>
        <TitleContainer>
          <TitleWrapper>
            <CourseCodeContainer>

              <CourseCodeLoading $isDarkMode={isDarkMode}/>
            </CourseCodeContainer>
          </TitleWrapper>
   
          <CourseTitleLoading $isDarkMode={isDarkMode}/>
        </TitleContainer>
        <OptionIconContainer
        >
          <OptionWrapper>
      
            <OptionIconLoading $isDarkMode={isDarkMode}/>
          </OptionWrapper>
        </OptionIconContainer>
      </TopWrapper>

      <BottomWrapper>
        <DataContainer>
          <InstructorContainer>
            <InstructorTextLoading $isDarkMode={isDarkMode} />
            <AssociationContent
              $isDarkMode={isDarkMode}
            >
              <Border $type={"instructor"} />
              <NameContainer>
                <FullName>
                  <InstructorNameLoading $isDarkMode={isDarkMode}/>

                </FullName>
                <InstructorUserNameLoading $isDarkMode={isDarkMode}/>
              </NameContainer>
            </AssociationContent>
          </InstructorContainer>

          <TAContainer>
            <TATextLoading $isDarkMode={isDarkMode}/>
            <CollaboratorList>
              <Collaborator >
                  <Border $type={"ta"}/>    
              </Collaborator>
              <Collaborator >
                  <Border $type={"ta"}/>    
              </Collaborator>
              <Collaborator >
                  <Border $type={"ta"}/>    
              </Collaborator>
            </CollaboratorList>
          </TAContainer>
        </DataContainer>
      </BottomWrapper>
    </HeaderContainer>
  );
};

export default Header;


const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Create a mixin for the loading effect with dark mode support
const loadingEffect = css<{ $isDarkMode: boolean }>`
  background: ${({ $isDarkMode }) => $isDarkMode
    ? 'linear-gradient(90deg, #afafaf 0%, grey 50%, #bdbdbd 100%)'
    : 'linear-gradient(90deg, #3a3a3a 0%, grey 50%, #303030 100%)'};
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.5s ease-in-out infinite;
`;


const OptionIconLoading = styled.div<{ $isDarkMode: boolean }>`
  width: 0.6rem;
  height: 1.8rem;
  ${loadingEffect}
  border-radius: 15px;
  

`

const InstructorUserNameLoading = styled.div<{ $isDarkMode: boolean }>`
  width: 5rem;
  height: 0.7rem;
  margin-top: 0.5rem;
  ${loadingEffect}
  border-radius: 15px;
`

const InstructorNameLoading = styled.div<{ $isDarkMode: boolean }>`
  width: 8rem;
  height: 0.8rem;
  margin-top: 0.5rem;
  ${loadingEffect}
  border-radius: 15px;
`

const TATextLoading = styled.div<{ $isDarkMode: boolean }>`
  width: 9rem;
  height: 1.2rem;
  margin-top: 0.5rem;
  ${loadingEffect}
  border-radius: 15px;
`

const InstructorTextLoading = styled.div<{ $isDarkMode: boolean }>`
  width: 5rem;
  height: 1.2rem;
  margin-top: 0.5rem;
  ${loadingEffect}
  border-radius: 15px;
`

const CourseTitleLoading = styled.div<{ $isDarkMode: boolean }>`
  width: 25rem;
  height: 1.2rem;
  margin-top: 0.5rem;
  ${loadingEffect}
  border-radius: 15px;
`

const CourseCodeLoading = styled.div<{ $isDarkMode: boolean }>`
  width: 7rem;
  height: 2rem;
  margin-top: 0.5rem;
  ${loadingEffect}
  border-radius: 15px;
`

const CourseCodeContainer = styled.div`
  flex: 3;
`;

const NameContainer = styled.div``;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 30%;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
`;

const OptionIcon = styled.img`
  width: 2.1rem;
`;

const OptionIconContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

const MoreCollaborators = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

const UserIcon = styled.img<{ $type: "ta" | "instructor" }>`
  width: ${({ $type }) => ($type === "ta" ? "1.6rem" : "1.8rem")};
  height: ${({ $type }) => ($type === "ta" ? "1.6rem" : "1.8rem")};
  border-radius: 50%;
  flex-shrink: 0;
`;

const InnerBorder = styled.div<{ isDarkMode: boolean; $type: "ta" | "instructor" }>`
  background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
  padding: ${props => (props.$type === "ta" ? "1px" : "1.2px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

const Collaborator = styled.div``;

const Border = styled.div<{ $type: "ta" | "instructor" }>`
  width: 1.9rem;
  height: 1.9rem;
  /* background: linear-gradient(to right, #EA8D8D, #A890FE); */
  background-color: grey;
  padding: ${props => (props.$type === "ta" ? "1.5px" : "1.5px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CollaboratorList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-top: 0.3rem;
`;

const VerifiedBadgeContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;


const StyledLogo = styled.img<{ $type: 'org' | 'user' }>`
  width: ${(props) => (props.$type === 'user' ? '1.6rem' : '1.2rem')};
  height: auto;
`;

const FullName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const AssociationContent = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  /* background-color: red; */
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const TAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
`;

const InstructorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.3rem;
  width: 100%;
`;

const TitleContainer = styled.div`
  flex: 4;
`;

const HeaderContainer = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  width: 95%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 2px 15px ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(164, 164, 164, 0.2)' : 'rgba(0, 0, 0, 0.2)')};
  border: ${({ $isDarkMode }) =>
    $isDarkMode ? '1px solid rgba(248, 197, 255, 0.201)' : '1px solid rgba(60, 38, 63, 0.201)'};
  padding: 0.5rem 1rem;
  opacity: 0.4;
 
`;
