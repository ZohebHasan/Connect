import React, { useState } from 'react';
import styled from 'styled-components';
import CourseBarContainer from './courseBarContainer';

import Text from '../../../../../ConnectUI_web/common/texts/static';
import Courses from "./courses"





const Course: React.FC = () => {
  
    return (
        <CourseBarContainer>
            <ProfileTextContainer>
                <Text variant={"school"}
                    size={"2rem"}
                    fontWeight={"300"}
                >
                    Courses
                </Text>
            </ProfileTextContainer>
            <CoursesContainer>
                <CoursesWrapper>
                    <Courses/>
                </CoursesWrapper>
            </CoursesContainer>
            {/* <EmptySpace>
            </EmptySpace> */}
        </CourseBarContainer>
    );
};

export default Course;


const CoursesWrapper = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: red;
  // width: 100%;
`

const ProfileTextContainer = styled.div`
    display: flex;
    flex: 1.5;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    margin-top: 0.7rem;
    // background-color: blue;
`
const CoursesContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;  // Changed from center to flex-start to align children from top to bottom
    max-height: 100%;
    width: 95%;
    overflow-y: auto;
    margin-bottom: 1.2rem;
    // background-color: pink;
`

const EmptySpace = styled.div`
  flex: 0.5;
  // background-color: red;
  width: 100%;
`