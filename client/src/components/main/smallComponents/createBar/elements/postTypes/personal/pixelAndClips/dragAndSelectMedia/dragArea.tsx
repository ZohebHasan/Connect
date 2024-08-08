import React, { useRef } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../../../../ConnectUI_web/common/texts/static';
import { useCreateBar, Media } from '../../../../../../../../../contexts/leftBar/createBarContext';

import PixelLight from "../../../../../../../../assets/pixelLightActive.png";
import PixelDark from "../../../../../../../../assets/pixelDarkActive.png";
import ClipDark from "../../../../../../../../assets/clipsDarkActive.png";
import ClipLight from "../../../../../../../../assets/clipsLightActive.png";

const DragAndSelect: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { addMediaToPersonalPost } = useCreateBar();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const validFiles = Array.from(files).filter(file =>
                file.type.startsWith('image/') || file.type.startsWith('video/')
            );

            if (validFiles.length > 0) {
                const media: Media[] = validFiles.map(file => ({
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    url: URL.createObjectURL(file)
                }));
                addMediaToPersonalPost(media);
            }
        }
    };

    return (
        <>
            <IconAndTextContainer>
                <IconContainer>
                    <Icon2Container>
                        <BorderContainer>
                            <BorderImageContainer>
                                <BorderIcon src={isDarkMode ? ClipLight : ClipDark} />
                            </BorderImageContainer>
                            <TopImageContainer>
                                <Icon src={isDarkMode ? ClipDark : ClipLight} />
                            </TopImageContainer>
                        </BorderContainer>
                    </Icon2Container>
                    <Icon1Container>
                        <Icon src={isDarkMode ? PixelDark : PixelLight} />
                    </Icon1Container>
                </IconContainer>
                <TextContainer>
                    <Text
                        variant={"normal"}
                        size={"1.5rem"}
                        fontWeight={"300"}
                    >
                        Drag media here
                    </Text>
                </TextContainer>
            </IconAndTextContainer>

            <DividerContainer>
                <Line $isDarkMode={isDarkMode} />
                <OrText>
                    <Text size={"1rem"} variant={"normal"} fontWeight={"100"}>
                        or
                    </Text>
                </OrText>
                <Line $isDarkMode={isDarkMode} />
            </DividerContainer>

            <SelectButtonContainer $isDarkMode={isDarkMode} onClick={handleButtonClick}>
                <Text
                    variant={"normal"}
                    size={"1.1rem"}
                    fontWeight={"200"}
                >
                    Select from device
                </Text>
            </SelectButtonContainer>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*,video/*"
            />
        </>
    );
};

export default DragAndSelect;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 25%;
`;

const Line = styled.div<{ $isDarkMode: boolean }>`
  flex: 1;
  height: 1px;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#c1c1c1' : '#3e3e3e'};
`;

const OrText = styled.span`
  margin: 0 10px;
`;

const SelectButtonContainer = styled.div<{ $isDarkMode: boolean }>`
    border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff73' : 'black')}; 
    padding: 0.4rem 0.8rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
        transform: scale(1.04);
    }
    &:active {
        transform: scale(0.99);
    }
    background-color: #ffffff2b;
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const TextContainer = styled.div`
    display: flex;
`;

const IconAndTextContainer = styled.div`
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`;

const TopImageContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Icon1Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 0;
`;

const Icon = styled.img`
  width: 5rem;
  height: 5rem;
`;

const BorderIcon = styled.img`
  width: 5.3rem;
  height: 5.3rem;
`;

const BorderImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const BorderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon2Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const IconContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 9rem;
  height: 4rem;
`;
