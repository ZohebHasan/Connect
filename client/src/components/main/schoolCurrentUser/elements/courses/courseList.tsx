import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import CourseHeader from "./headers/headerList"
import { useCourses } from '../../../../../contexts/schoolProfile/courseContext';
import AddCourseButton from "./buttons/addCourse"

const Courses: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { courses } = useCourses();

  return (
    <CoursesContainer>
      <AddCourseButton/>
      {courses.map((course) => (
        <CourseHeader key={course.courseCode} course={course} />
      ))}
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


`;
