import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import CourseHeader from "./headers/headerList"
import { useOrgs } from '../../../../../contexts/schoolProfile/clubAndOrgsContext';
import AddCourseButton from "./buttons/addCourse"

const OrgsComponenet: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { orgs } = useOrgs();

  return (
    <OrgsComponenetContainer>
      <AddCourseButton/>
      {orgs.map((org) => (
        <CourseHeader key={org.orgCode} org={org} />
      ))}
    </OrgsComponenetContainer>
  );
};

export default OrgsComponenet;

const OrgsComponenetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 0.5rem;
  gap: 1rem;


`;
