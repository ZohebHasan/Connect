import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../../../../../contexts/DarkMode/DarkMode';


import Text from '../../../../../../../../ConnectUI_web/common/texts/static';

import RightDark from "../../../../../../../../assets/rightCircleDark.png";
import RightLight from "../../../../../../../../assets/rightCircleLight.png";

import LeftToRightText from '../../../../../../../../ConnectUI_web/common/texts/animated/leftToRight';

import CloseButton from '../../closeButton/close';

import Header from './headerListLoading';

import InputFieldComponent from '../../inputField/inputBox';

import { useSchoolProfile } from '../../../../../../../../../contexts/schoolProfile/school';

const PixelAndClip: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const {activateCreateBar} = useSchoolProfile();

    let createCourse = false;

    const handleCreateCourseActive = () => {
        createCourse = true;
    }

    const [text, setText] = useState("");



    return (
        <PixelAndClipsContainer>
            <TopContainer $isDarkMode={isDarkMode}>
                <PixelAndClipTextContainer>
                    <Text variant={"normal"}
                        size={"1.5rem"}
                        fontWeight={"200"}
                    >
                        Search your course
                    </Text>
                </PixelAndClipTextContainer>
                <CloseButtonContainer>
                    <CloseButton />
                </CloseButtonContainer>
            </TopContainer>
            <SearchContainer>
                <SearchBoxContainer>
                    <InputFieldComponent
                        id="search_in_course"
                        label={"Search by course code, name, instructor, or ID at Stony Brook University"}
                        value={text}
                        onChange={setText}
                        width="100%"
                        isSearchBox={true}
                    />
                </SearchBoxContainer>

                <SearchResultContainer>
                   
                    {/* <LoadingWrapper>
                        <Header />
                        <Header />
                        <Header /> 
                        <Header />
         
    
                    </LoadingWrapper> */}

                </SearchResultContainer>
            </SearchContainer>
            <BottomContainer $isDarkMode={isDarkMode}>


                <PostAsChripButtonContainer>
                    <PostAsWrapper onClick={activateCreateBar}>
                        <Text variant={"normal"}
                            size={"1.1rem"}
                            fontWeight={"400"}
                        >
                            Create a course instead
                        </Text>
                        <RightIcon src={isDarkMode ? RightDark : RightLight} />
                    </PostAsWrapper>
                </PostAsChripButtonContainer>
            </BottomContainer>
        </PixelAndClipsContainer>
    );
};

export default PixelAndClip;

const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 25rem;
    max-height: 100%;
    gap: 1rem;
    overflow: auto;
    /* background-color: blue; */
`

const SearchResultContainer = styled.div`
    /* background-color: pink; */
    width: 100%;
    flex: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

`

const SearchBoxContainer = styled.div`
    /* background-color: blue; */
    width: 100%;
    flex: 1;
`

const ChirpContainer = styled.div`
    flex: 5; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 1rem;
    /* background-color: blue; */
`

const RightIcon = styled.img`
    width: 1.8rem;
`

const PostAsWrapper = styled.div`
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

const SearchContainer = styled.div`
    flex: 8; 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 1rem;
   
`

const PostAsChripButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    width: 100%;
    padding-top: 0.5rem;
    border-top: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
`;

const PixelAndClipsWrapper = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: red;
  // width: 100%;
`

const PixelAndClipTextContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    /* width: 90%; */
    /* background-color: blue; */
`

const PixelAndClipsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40rem;
    width: 45rem;
    overflow-y: auto;
    /* margin-bottom: 1.2rem; */
    // background-color: pink;
    padding: 0.5rem 1rem;
`

const EmptySpace = styled.div`
  flex: 0.5;
  // background-color: red;
  width: 100%;
`
