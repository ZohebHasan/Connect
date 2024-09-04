import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import CourseHeaderLoading from "./headers/headerListLoading"
import AddCourseButton from "../common/addCourse"

import { useSchoolProfile } from '../../../../../contexts/schoolProfile/school';
import Text from '../../../../ConnectUI_web/common/texts/static';

const Courses: React.FC = () => {
  const { schoolProfile } = useSchoolProfile();
  const { isDarkMode } = useDarkMode();

  return (
    <CoursesContainer>
      <AddCourseLoadingWrapper>
        <AddCourseLoading $isDarkMode={isDarkMode}/>
      </AddCourseLoadingWrapper>
      <CourseHeaderLoading/>
    </CoursesContainer>
  );
};

export default Courses;


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

const AddCourseLoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
`

const AddCourseLoading = styled.div  <{ $isDarkMode: boolean }>`
    width: 8rem;
    height: 1.8rem;
    opacity: 0.4;
    border-radius: 15px;
    ${loadingEffect}
`

const ButtonWrapper = styled.div`
  width: 50%; 

`

const NoCourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 0.5rem;
  gap: 1rem;
`;
