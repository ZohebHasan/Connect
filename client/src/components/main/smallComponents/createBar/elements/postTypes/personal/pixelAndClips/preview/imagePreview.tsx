import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useCreateBar } from '../../../../../../../../../contexts/leftBar/createBarContext';
import { useDarkMode } from '../../../../../../../../../contexts/DarkMode/DarkMode';

import CropDark from "../../../../../../../../assets/cropDark.png";
import CropLight from "../../../../../../../../assets/cropLight.png";

import ZoomDark from "../../../../../../../../assets/zoomDark.png";
import ZoomLight from "../../../../../../../../assets/zoomLight.png";

import EditDark from "../../../../../../../../assets/editDark.png";
import EditLight from "../../../../../../../../assets/editLight.png";

import ListDark from "../../../../../../../../assets/listDark.png"
import ListLight from "../../../../../../../../assets/listLight.png"

const ImagePreview: React.FC = () => {
    const { profiles } = useCreateBar();
    const { isDarkMode } = useDarkMode();
    const personalProfile = profiles.personal;

    // Get the first image if available
    const imageUrl = personalProfile.postType?.media?.[0]?.url || '';

    return (
        <>
            <ImageContainer $isDarkMode={isDarkMode}>
                {imageUrl && <Image src={imageUrl} alt="Uploaded Preview" />}
            </ImageContainer>

            <CropButtonContainer $isDarkMode={isDarkMode}>
                <CropIcon src={isDarkMode ? CropDark : CropLight} />
                <ButtonText>Crop</ButtonText>
            </CropButtonContainer>
            <ZoomButtonContainer $isDarkMode={isDarkMode}>
                <ZoomIcon src={isDarkMode ? ZoomDark : ZoomLight} />
                <ButtonText>Zoom</ButtonText>
            </ZoomButtonContainer>
            <EditButtonContainer $isDarkMode={isDarkMode}>
                <EditIcon src={isDarkMode ? EditDark : EditLight} />
                <ButtonText>Edit</ButtonText>
            </EditButtonContainer>
            {/* <AddMoreContainer $isDarkMode={isDarkMode}>
                <AddMoreIcon src = {isDarkMode? ListDark : ListLight}/>
                <ButtonText>Add more + </ButtonText>
            </AddMoreContainer> */}
        </>
    );
};

export default ImagePreview;

const AddMoreIcon = styled.img`
    width: 1.5rem;
`

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const ButtonText = styled.span`
    margin-left: 0.5rem;
    white-space: nowrap;
    display: none;
`;

const IconButtonContainer = styled.div<{ $isDarkMode: boolean }>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? '#4e4e4e9e' : '#c7c7c780'};  // subtle background change on hover
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#6e6e6e9e' : '#9c9c9c80'};  // subtle background change on hover

        transform: scale(1.05);

        span {
            display: inline;
            animation: ${fadeIn} 0.3s forwards;
        }
    }

    &:active {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#9393939e' : '#6e6e6e80'};  // subtle background change on hover
        transform: scale(1);
    }
`;


const EditIcon = styled.img`
    width: 1.5rem;
`;

const ZoomIcon = styled.img`
    width: 1.5rem;
`;

const CropIcon = styled.img`
    width: 1.5rem;
`;

const Image = styled.img`
    max-width: 100%;
    height: auto;
`;

const ImageContainer = styled.div<{ $isDarkMode: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
    overflow: hidden;
`;

const EditButtonContainer = styled(IconButtonContainer)`
    right: 2%;
    bottom: 2%;
`;

const ZoomButtonContainer = styled(IconButtonContainer)`
    right: 2%;
    bottom: 10%;
`;

const CropButtonContainer = styled(IconButtonContainer)`
    right: 2%;
    bottom: 18%;
`;

const AddMoreContainer = styled(IconButtonContainer)`
    bottom: 2%;
    left: 2%;
`;
