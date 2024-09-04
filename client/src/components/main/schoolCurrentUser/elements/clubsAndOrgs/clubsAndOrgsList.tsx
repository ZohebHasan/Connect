import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import CourseHeader from "./headers/headerList";
import { useOrgs } from '../../../../../contexts/schoolProfile/clubAndOrgsContext';
import AddCourseButton from "../common/addCourse";
import Text from '../../../../ConnectUI_web/common/texts/static';

const OrgsComponenet: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { clubsAndOrgs } = useOrgs();

  return (
    <OrgsComponenetContainer>
      {clubsAndOrgs && clubsAndOrgs.length > 0 ? (
        <>
          <AddCourseButton type= {"org"} position= {'end'}/>
          {clubsAndOrgs.map((org) => (
            <CourseHeader key={org.clubAndOrgId} org={org} />
         
          ))}
        </>
      ) : (
        <>
          <NoOrgsContainer>
            <Text variant={"transparent"} size="1.5rem" fontWeight="300">
              You haven't created or joined any club/organizations yet.
            </Text>
            <ButtonWrapper>
              <AddCourseButton type= {"org"} position= {'center'}/>
            </ButtonWrapper>
          </NoOrgsContainer>
        </>
      )}
    </OrgsComponenetContainer>
  );
};

export default OrgsComponenet;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoOrgsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrgsComponenetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 0.5rem;
  gap: 1rem;
`;
