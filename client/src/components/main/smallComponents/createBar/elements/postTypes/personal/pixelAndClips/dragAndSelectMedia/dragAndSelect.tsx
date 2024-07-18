import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../../../../../contexts/DarkMode/DarkMode';
import { useCreateBar } from '../../../../../../../../../contexts/leftBar/createBarContext';

import Text from '../../../../../../../../ConnectUI_web/common/texts/static';

import RightDark from "../../../../../../../../assets/rightCircleDark.png";
import RightLight from "../../../../../../../../assets/rightCircleLight.png";

import LeftToRightText from '../../../../../../../../ConnectUI_web/common/texts/animated/leftToRight';

import CloseButton from '../../../../closeButton/close';
import DragAndSelect from "./dragArea";

import PostingAs from "../../../../postAs/postAs";
import Chirp from '../../chirps/chirpsInputBox';

const PixelAndClip: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { postAs, profiles } = useCreateBar();
    const [dragging, setDragging] = useState(false);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragging(false);
    }, []);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);

        const files = event.dataTransfer.files;
        const validFiles = Array.from(files).filter(file =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
        );

        if (validFiles.length > 0) {
            // Handle valid files
            console.log(validFiles);
            // You can add your own logic to handle the files here
        }
    }, []);

    const {setChirpActive } = useCreateBar();


    return (
        <PixelAndClipsContainer>
            <TopContainer $isDarkMode={isDarkMode}>
                <PixelAndClipTextContainer>
                    <LeftToRightText size='1.5rem'> Create Pixels or Clip</LeftToRightText>
                </PixelAndClipTextContainer>
                <CloseButtonContainer>
                    <CloseButton />
                </CloseButtonContainer>
            </TopContainer>
            <MediaSelectorContainer
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                $isDragging={dragging}
            >
                <DragAndSelect />
            </MediaSelectorContainer>
            <BottomContainer $isDarkMode={isDarkMode}>
                <PostingAsContainer>
                    <PostingAs />
                </PostingAsContainer>

                <PostAsChripButtonContainer>
                    <PostAsWrapper onClick={setChirpActive}>
                        <Text variant={"normal"}
                            size={"1.1rem"}
                            fontWeight={"400"}
                        >
                            Post a Chirp instead
                        </Text>
                        <RightIcon src={isDarkMode ? RightDark : RightLight} />
                    </PostAsWrapper>
                </PostAsChripButtonContainer>
            </BottomContainer>
        </PixelAndClipsContainer>
    );
};

export default PixelAndClip;

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
    border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
`;

const MediaSelectorContainer = styled.div<{ $isDragging: boolean }>`
    flex: 8; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    background-color: ${({ $isDragging }) => ($isDragging ? 'grey' : 'transparent')};
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
    padding-top: 1rem;
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
