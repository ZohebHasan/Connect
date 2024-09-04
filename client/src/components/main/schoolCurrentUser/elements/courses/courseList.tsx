import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import CourseHeader from "./headers/headerList"
import AddCourseButton from "../common/addCourse"
import { useSchoolProfile } from '../../../../../contexts/schoolProfile/school';
import Text from '../../../../ConnectUI_web/common/texts/static';

const Courses: React.FC = () => {
  const { schoolProfile, openCourseSearchAddBar } = useSchoolProfile();
  const { isDarkMode } = useDarkMode();

  return (
    <CoursesContainer>
      {schoolProfile?.courses && schoolProfile.courses.length > 0 ? (
        <>
          <AddCourseButton type = {"course"} onClick={openCourseSearchAddBar} position = {'end'}/>
          {schoolProfile.courses.map((course) => (
            <CourseHeader key={course.course} course={course} />
          ))}
        </>
      ) : (
        <>
          <NoCourseContainer>
            <Text variant={"transparent"} size="1.5rem" fontWeight="300">
              You haven't created or joined any course yet.
            </Text>
            <ButtonWrapper>
              <AddCourseButton type = {"course"} onClick={openCourseSearchAddBar} position = {'center'}/>
            </ButtonWrapper>

          </NoCourseContainer>
        </>
      )}
    </CoursesContainer>
  );
};

export default Courses;

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
