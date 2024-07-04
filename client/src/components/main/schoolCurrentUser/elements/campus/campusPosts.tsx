import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import PostList from "./posts/postList"
import CreateAndFilterButton from "./buttons/filterAndCreate"



const Courses: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <CoursesContainer>
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
  width: 80%;
  margin-top: 0.5rem;
  gap: 1rem;
  position: relative;
`;

