import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import CourseHeader from "./headers/activeHeader"
import PostList from "./posts/postList"
import CreateAndFilterButton from "./buttons/activeCourse/filterAndCreate"

import OrgsBar from "./orgsSelectionBar/orgsBar"


const Courses: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <CoursesContainer>
      <OrgsBar/>
      <CourseHeader/>
      <CreateAndFilterButton/>
      <PostList />
    </CoursesContainer>
  );
};

export default Courses;



const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 0.5rem;
  gap: 1rem;
  position: relative;
`;

