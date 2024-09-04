import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

import { useDarkMode } from '../../../../../../../../../contexts/DarkMode/DarkMode';


import Text from '../../../../../../../../ConnectUI_web/common/texts/static';

import LeftDark from "../../../../../../../../assets/leftDarkArrow.png"
import LeftLight from "../../../../../../../../assets/leftLightArrow.png"
import LeftToRightText from '../../../../../../../../ConnectUI_web/common/texts/animated/leftToRight';

import CloseButton from '../../closeButton/close';
import Button from '../../../../../../../../ConnectUI_web/common/buttons/button1';


import InfoDark from "../../../../../../../../assets/infoDark.png";
import InfoLight from "../../../../../../../../assets/infoLight.png";

import Toggle from './toggle';

import { useSchoolProfile } from '../../../../../../../../../contexts/schoolProfile/school';

import InputFieldComponent from './inputField/inputBox';


import DownArrowDark from "../../../../../../../../assets/downCircleDark.png"
import DownArrowLight from "../../../../../../../../assets/downCirlceLight.png"

import DefaultOrgIconDark from "../../../../../../../../assets/orgIconDark.png"
import DefaultOrgIconLight from "../../../../../../../../assets/orgIconLight.png"



const DisplayErrorMessages = () => {
    const { courseCodeEmptyError, courseNameEmptyError, connectionError } = useSchoolProfile();


    let errorMessage = null;

    if (connectionError) {
        errorMessage = <ErrorMessage>Something went wrong, please try again</ErrorMessage>;
    }
    else if (courseCodeEmptyError) {
        errorMessage = <ErrorMessage>Course code field is empty</ErrorMessage>;
    }
    else if (courseNameEmptyError) {
        errorMessage = <ErrorMessage>Course name field is empty</ErrorMessage>;
    }

    return (
        <>
            {errorMessage}
        </>
    );
}

const Chirp: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const [isAtTop, setIsAtTop] = useState(true);  // State to track if scrollbar is at the top
    const dataBodyRef = useRef<HTMLDivElement>(null);  // Ref to access the DataBodyContainer
    const {
        courseCodeEmptyError,
        courseNameEmptyError,
        connectionError,
        activateSearchBar,
        schoolProfile,
        togglePrivate,
        handleCourseNameChange,
        handleCourseCodeChange,
        handleInstructorKeywordChange,
        handleTAKeywordChange,

        isPrivate,
        courseName,
        courseCode,
        instructorKeyword,
        taKeyword,
        handleCourseCreationSubmit
    } = useSchoolProfile();

    const scrollToBottom = () => {
        if (dataBodyRef.current) {
            dataBodyRef.current.scrollTo({ top: dataBodyRef.current.scrollHeight, behavior: 'smooth' });
        }
    };

    // Handle scroll event
    const handleScroll = () => {
        const threshold = 0.8; // 80% threshold

        if (dataBodyRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = dataBodyRef.current;
            const scrollPercentage = scrollTop / (scrollHeight - clientHeight);

            // Set isAtTop to true if at the top, or false if scrolled down 80% or more
            setIsAtTop(scrollPercentage < threshold);
        }
    };

    // Add scroll event listener
    useEffect(() => {
        const container = dataBodyRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);


    return (
        <ChirpsContainer>
            <TopContainer $isDarkMode={isDarkMode}>
                <ChirpTextContainer>
                    <Wrapper onClick={activateSearchBar}>
                        <LeftIcon src={isDarkMode ? LeftDark : LeftLight} />
                        <Text variant={"normal"}
                            size={"1.4rem"}
                            fontWeight={"300"}
                        >
                            Join a course
                        </Text>
                    </Wrapper>
                </ChirpTextContainer>
                <CloseButtonContainer>
                    <CloseButton />
                </CloseButtonContainer>
            </TopContainer>
            <CreateContainer>
                {isAtTop && (
                    <DownArrowIcon
                        src={isDarkMode ? DownArrowDark : DownArrowLight}
                        $isdarkMode={isDarkMode}
                        onClick={scrollToBottom}  // Scroll to bottom on click
                    />
                )}
                <TitleContainer>
                    <TitleWrapper>
                        <Text variant={"normal"}
                            size={"1.5rem"}
                            fontWeight={"200"}
                        >
                            Create a
                        </Text>
                        <Text variant={"school"}
                            size={"1.5rem"}
                            fontWeight={"200"}
                        >
                            Course
                        </Text>
                    </TitleWrapper>

                    <SchoolWrapper>
                        <LogoContainer>
                            <Logo src={isDarkMode ? DefaultOrgIconDark : DefaultOrgIconLight} />
                        </LogoContainer>
                        <OrgName>
                            <Text variant="normal" size="1.3rem" fontWeight="200">
                                {schoolProfile?.campus.name}
                            </Text>
                            {/* {isVerified && <VerifiedBadge type='org' />} */}
                        </OrgName>
                    </SchoolWrapper>

                </TitleContainer>
                <DataBodyContainer ref={dataBodyRef}>
                    {schoolProfile?.userType === 'Student' &&
                        <StudentLedContainer $isDarkMode={isDarkMode}>
                            <InfoIcon src={isDarkMode ? InfoDark : InfoLight} />
                            <Text variant={"normal"}
                                size={"0.9rem"}
                                fontWeight={"300"}
                            >
                                Course groups created by students are designated as 'Student-led.'
                                However, the group creator has the option to transfer ownership to a
                                faculty member at any time.
                            </Text>
                        </StudentLedContainer>
                    }

                    <IsPrivateToggleContainer>
                        <TextContainer>
                            <Text variant={"normal"}
                                size={"1.2rem"}
                                fontWeight={"400"}
                            >
                                Set course group as private
                            </Text>
                        </TextContainer>
                        <Toggle isOn={isPrivate} toggleOn={togglePrivate} />
                    </IsPrivateToggleContainer>
                    <InputContainer>
                        <Header>
                            <Text variant={"normal"}
                                size={"1.1rem"}
                                fontWeight={"300"}
                            >
                                Course Name
                            </Text>
                        </Header>
                        <InputFieldComponent
                            id="search_in_course"
                            label={"Enter course name here, e.g., System Fundamentals II"}
                            value={courseName}
                            onChange={handleCourseNameChange}
                            width="100%"
                            isSearchBox={false}
                        />
                        {courseNameEmptyError && <ErrorMessage>Course name field is empty</ErrorMessage>}
                    </InputContainer>
                    <InputContainer>
                        <Header>
                            <Text variant={"normal"}
                                size={"1.1rem"}
                                fontWeight={"300"}
                            >
                                Course code
                            </Text>
                        </Header>
                        <InputFieldComponent
                            id="search_in_course"
                            label={"Enter course code here, e.g., CSE320"}
                            value={courseCode}
                            onChange={handleCourseCodeChange}
                            width="100%"
                            isSearchBox={false}
                        />
                        {courseCodeEmptyError && <ErrorMessage>Course code field is empty</ErrorMessage>}
                    </InputContainer>
                    <InputContainer>
                        <Header>
                            <Text variant={"normal"}
                                size={"1.1rem"}
                                fontWeight={"300"}
                            >
                                Add {schoolProfile?.userType === 'Student' ? 'instructor' : 'Co-instructor'} (Optional)
                            </Text>
                        </Header>
                        <InputFieldComponent
                            id="search_in_course"
                            label={"Search instructor name, username, or school email"}
                            value={instructorKeyword}
                            onChange={handleInstructorKeywordChange}
                            width="100%"
                            isSearchBox={true}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Header>
                            <Text variant={"normal"}
                                size={"1.1rem"}
                                fontWeight={"300"}
                            >
                                Select TAs (Optional)
                            </Text>
                        </Header>
                        <InputFieldComponent
                            id="search_in_course"
                            label={"Search TA name, username, or school email"}
                            value={taKeyword}
                            onChange={handleTAKeywordChange}
                            width="100%"
                            isSearchBox={true}
                        />
                    </InputContainer>
                </DataBodyContainer>
            </CreateContainer>
            <BottomContainer $isDarkMode={isDarkMode}>
                {connectionError && <ErrorMessage>Something went wrong, please try again</ErrorMessage>}
                <PostAsChripButtonContainer>
                    <PostAsWrapper $isDarkMode={isDarkMode} onClick={handleCourseCreationSubmit}>
                        <Text variant={"normal"}
                            size={"1.1rem"}
                            fontWeight={"200"}
                        >
                            Create
                        </Text>

                    </PostAsWrapper>
                </PostAsChripButtonContainer>
            </BottomContainer>
        </ChirpsContainer>
    );
};

export default Chirp;

const OrgName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const Logo = styled.img`
  width: 1.9rem;
  height: auto;
  border-radius: 50%;
`;

const LogoContainer = styled.div``;


const SchoolWrapper = styled.div`
    flex: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 0.7rem;
    /* background-color: red; */
`

const Header = styled.div`
    width: 100%;
    /* background-color: blue; */
    display: flex;
    justify-content: flex-start;
`


const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  60% { transform: translateX(10px); }
  70% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  90% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;


const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 5px;
    font-size: 13px;
    animation: ${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both; 
`

const DownArrowIcon = styled.img<{ $isdarkMode: boolean }>`
    position: absolute;
    width: 1.8rem;
    background-color: ${({ $isdarkMode }) => $isdarkMode ? '#686868' : '#d3d3d3'};
    border-radius: 50%;
    z-index: 1;
    bottom: 3%;  /* Aligns the icon at the bottom */
    left: 50%;  /* Positions the icon in the center horizontally */
    transform: translateX(-50%);  /* Adjusts the icon to be centered */
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${({ $isdarkMode }) => $isdarkMode ? '#6b6b6b' : '#b0b0b0'};
        transform: translateX(-50%) scale(1.03);
    }

    &:active {
        background-color: ${({ $isdarkMode }) => $isdarkMode ? '#525252' : '#a1a1a1'};
        transform: translateX(-50%) scale(0.98);
    }
`;

const TextContainer = styled.div`
    flex: 5;
    display: flex;
    align-items: center;
    justify-content: flex-start;

`


const InfoIcon = styled.img`
    width: 1rem;
    margin-top: 0.25rem;
`

const StudentLedContainer = styled.div<{ $isDarkMode: boolean }>`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 0.3rem;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? '#494949' : '#b4b4b4'};
    padding: 0.3rem 0.6rem;
    border-radius: 10px;
    width: 95%;
`

const IsPrivateToggleContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    width: 95%;
`

const SelectTAContainer = styled.div`
    flex-direction: column;
    margin-top: 1rem;
    width: 95%;
    margin-bottom: 2rem;
`

const SearchInstructorContainer = styled.div`
    flex-direction: column;
    margin-top: 1rem;
    width: 95%;
`

const CourseCodeContainer = styled.div`
    flex-direction: column;
    margin-top: 1rem;
    width: 95%;
`

const InputContainer = styled.div`
    /* background-color: black; */
    flex-direction: column;
    margin-top: 1rem;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
`


const DataBodyContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    /* position: relative; */
    /* background-color: pink; */
    overflow: auto;
    width: 100%;
    height: 100%;
`

const TitleContainer = styled.div`
    /* background-color: yellow; */
    width: 95%;
    display: flex;
    /* gap: 0.3rem; */
    align-items: center;
    justify-content: center;
`

const TitleWrapper = styled.div`
    flex:1;
    display: flex;
    gap: 0.3rem;
    align-items: center;
    justify-content: flex-start;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;

    &:hover {
        opacity: 0.7;
        transform: scale(1.03);
    }

    &:active {
        transform: scale(1);
    }
`

const CreateContainer = styled.div`
    flex: 8; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    overflow-y: auto; /* Enable vertical scrolling */
    max-height: 100%; 
    position: relative;
    /* background-color: blue; */
`;

const LeftIcon = styled.img`
    width: 1.5rem;
`

const PostAsWrapper = styled.div <{ $isDarkMode: boolean }>`
    border: 1px solid ${({ $isDarkMode }) => $isDarkMode ? '#ccc' : '#333'};
    padding: 0.3rem 2rem;
    border-radius: 7px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.3s ease, box-shadow 0.2s ease;
    /* background: linear-gradient(to right, rgba(102, 45, 140, 0.55), rgba(237, 30, 121, 0.55)); */
    &:hover {
        /* opacity: 0.7; */
        transform: scale(1.03);
        /* background: linear-gradient(to right, rgba(102, 45, 140, 0.748), rgba(237, 30, 120, 0.741)); */

    }

    &:active {
        /* background: (to right, rgb(102, 45, 140), rgb(237, 30, 120)); */
        transform: scale(1);
    }
`;

const CloseButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const TopContainer = styled.div<{ $isDarkMode: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 1;
    /* border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')}; */
`;


const PostAsChripButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: orange; */
`

const PostingAsContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const BottomContainer = styled.div<{ $isDarkMode: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 95%;
    padding-top: 0.5rem;
    border-top: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
`;

const ChirpsWrapper = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: red;
  // width: 100%;
`

const ChirpTextContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    /* width: 90%; */
    /* background-color: blue; */
`

const ChirpsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40rem;
    width: 45rem;
    overflow: hidden; 
    /* background-color: blue; */

    /* margin-bottom: 1.2rem; */
    // background-color: pink;
    padding: 0.5rem 1rem;
`

const EmptySpace = styled.div`
  flex: 0.5;
  // background-color: red;
  width: 100%;
`
