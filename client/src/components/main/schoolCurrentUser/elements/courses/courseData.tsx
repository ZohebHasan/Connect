import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import CourseHeader from "./headers/activeHeader"
import PostList from "./posts/postList"
import CreateAndFilterButton from "./buttons/activeCourse/filterAndCreate"

import { useCourses } from '../../../../../contexts/schoolProfile/courseContext';

import CourseBar from "./courseSelectionBar/courseBar"



const Courses: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  

  return (
    <CoursesContainer>
      <CourseBar/>
      <CourseHeader/>
      <CreateAndFilterButton/>
      <PostList />
    </CoursesContainer>
  );
};

export default Courses;

const Divider = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${({ $isDarkMode }) => 
    $isDarkMode ? 'rgba(255, 255, 255, 0.201)' : 'rgba(0, 0, 0, 0.201)'};
  height: 0.5rem;
  width: 100%;
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 0.5rem;
  gap: 1rem;
  position: relative;
  margin-top: 8%;
`;

