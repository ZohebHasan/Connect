import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useCourses } from '../../../../contexts/schoolProfile/courseContext';

import SelectButton from "../../containers/buttonLogo";
import Text from '../../../ConnectUI_web/common/texts/static';

import SelectedDark from "../../../assets/selectedDark.png";
import SelectedLight from "../../../assets/selectedLight.png";
import NotSelectedLight from "../../../assets/notSelectedLight.png";
import NotSelectedDark from "../../../assets/notSelectedDark.png";

const LeftBarButtons: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { courses, activeCourse, setActiveCourse, toggleCourseBar } = useCourses();

    const handleCourseClick = (courseCode: string) => {
        setActiveCourse(courseCode);
        toggleCourseBar();
    };

    return (
        <>
            {courses.map(course => (
                <ButtonLink
                    key={course.courseCode}
                    $isDarkMode={isDarkMode}
                    onClick={() => handleCourseClick(course.courseCode)}
                >
                    <ButtonWrapper>
                        <LogoContainer>
                            <TextContainer>
                                <Text size={"1.1rem"} variant={"normal"} fontWeight={"300"}>{course.courseCode}</Text>
                            </TextContainer>
                            <SelectButtonContainer>
                                <SelectButton
                                    darkModeLogo={NotSelectedDark}
                                    lightModeLogo={NotSelectedLight}
                                    activeDarkLogo={SelectedDark}
                                    activeLightLogo={SelectedLight}
                                    isActive={activeCourse?.courseCode === course.courseCode}
                                    size={1.5}
                                />
                            </SelectButtonContainer>
                        </LogoContainer>
                    </ButtonWrapper>
                </ButtonLink>
            ))}
        </>
    );
};

export default LeftBarButtons;

const TextContainer = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
`;

const SelectButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

const ButtonWrapper = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 0.7rem;
`;

const ButtonLink = styled.button<{ $isDarkMode: boolean }>`
    flex: 1;
    margin: 0.5rem 0rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    border-radius: 0.5rem;
    text-decoration: none;
    color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font: inherit;
    font-size: inherit;
    outline: none;
    transition: transform 0.2s ease-in-out, color 0.3s, opacity 0.3s ease-in-out;

    &:hover {
        color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
        background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#6c6c6c' : '#a2a2a2')};
        transition: color 0.3s, background-color 0.3s, opacity 0.3s ease-in-out;
        opacity: 0.8;
        transform: scale(1.05); 
    }

    &:active {
        background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#919191' : '#595858')};
        transition: color 0.2s, background-color 0.2s;
        transform: scale(1.00);
    }
`;
