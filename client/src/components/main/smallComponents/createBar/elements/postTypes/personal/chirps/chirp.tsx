import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../../../../contexts/DarkMode/DarkMode';
import { useCreateBar } from '../../../../../../../../contexts/leftBar/createBarContext';

import Text from '../../../../../../../ConnectUI_web/common/texts/static';

import LeftDark from "../../../../../../../assets/leftDarkArrow.png"
import LeftLight from "../../../../../../../assets/leftLightArrow.png"
import LeftToRightText from '../../../../../../../ConnectUI_web/common/texts/animated/leftToRight';

import CloseButton from '../../../closeButton/close';
import Button from '../../../../../../../ConnectUI_web/common/buttons/button1';

import PostingAs from "../../../postAs/postAs";
import ChirpInput from '../chirps/chirpsInputBox';



const Chirp: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    const { isClipAndPixelActive, setClipAndPixelActive, setChirpActive } = useCreateBar();


    return (
        <ChirpsContainer>
            <TopContainer $isDarkMode={isDarkMode}>
                <ChirpTextContainer>
                    <Wrapper onClick={setClipAndPixelActive}>
                        <LeftIcon src={isDarkMode ? LeftDark : LeftLight} />
                        <Text variant={"normal"}
                            size={"1.4rem"}
                            fontWeight={"300"}
                        >
                            Pixel & Clips
                        </Text>
                    </Wrapper>
                </ChirpTextContainer>
                <CloseButtonContainer>
                    <CloseButton />
                </CloseButtonContainer>
            </TopContainer>
            <ChirpContainer>
                <ChirpInput />
            </ChirpContainer>
            <BottomContainer $isDarkMode={isDarkMode}>
                <PostingAsContainer>
                    <PostingAs />
                </PostingAsContainer>
                <PostAsChripButtonContainer>
                    <PostAsWrapper >
                        <Text variant={"normal"}
                            size={"1.3rem"}
                            fontWeight={"200"}
                        >
                            Post
                        </Text>
                        
                    </PostAsWrapper>
                </PostAsChripButtonContainer>
            </BottomContainer>
        </ChirpsContainer>
    );
};

export default Chirp;

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

const ChirpContainer = styled.div`
    flex: 8; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 1rem;
    /* background-color: blue; */
`

const LeftIcon = styled.img`
    width: 1.5rem;
`

const PostAsWrapper = styled.div`
    border: 1px solid white;
    padding: 0.3rem 2rem;
    border-radius: 7px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.3s ease, box-shadow 0.2s ease;
    background: linear-gradient(to right, rgba(102, 45, 140, 0.55), rgba(237, 30, 121, 0.55));
    &:hover {
        /* opacity: 0.7; */
        transform: scale(1.03);
        background: linear-gradient(to right, rgba(102, 45, 140, 0.748), rgba(237, 30, 120, 0.741));

    }

    &:active {
        background: (to right, rgb(102, 45, 140), rgb(237, 30, 120));
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
    border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
`;


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
    padding-top: 1rem;
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
