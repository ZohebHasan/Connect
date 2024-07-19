import React from 'react';
import styled from 'styled-components';
import { useCreateBar, Media } from '../../../../../../../../../contexts/leftBar/createBarContext';
import { useDarkMode } from '../../../../../../../../../contexts/DarkMode/DarkMode';

import AddDark from "../../../../../../../../assets/addThinDark.png";
import AddLight from "../../../../../../../../assets/addThinLight.png";

const UploadPhotos: React.FC = () => {
    const { profiles, addMediaToPersonalPost } = useCreateBar();
    const personalProfile = profiles.personal;
    const { isDarkMode } = useDarkMode();

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newPhotos: Media[] = Array.from(files).map(file => ({
                type: 'image',
                url: URL.createObjectURL(file),
            }));
            addMediaToPersonalPost(newPhotos);
            event.target.value = '';  // Reset the input value to allow the same file to be selected again
        }
    };

    return (
        <Container>
            <UploadButtonContainer>
                <UploadButton $isDarkMode={isDarkMode}>
                    <AddIcon src={isDarkMode ? AddDark : AddLight} />
                    <UploadInput type="file" accept="image/*" multiple onChange={handleUpload} />
                </UploadButton>
            </UploadButtonContainer>
            <PhotosList>
                {personalProfile.postType?.media?.map((photo, index) => (
                    <PhotoItem key={index} $isDarkMode={isDarkMode}>
                        <Photo src={photo.url} alt={`Uploaded ${index}`} />
                    </PhotoItem>
                ))}
            </PhotosList>
        </Container>
    );
};

export default UploadPhotos;

const AddIcon = styled.img`
    width: 2rem;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-top: 1rem;
`;

const UploadButtonContainer = styled.div`
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 1;
`;

const UploadButton = styled.label<{$isDarkMode: boolean}>`
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? '#4e4e4e9e' : '#c7c7c780'};

    &:hover {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#6e6e6e9e' : '#9c9c9c80'};
        transform: scale(1.05);
    }

    &:active {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#9393939e' : '#6e6e6e80'};
        transform: scale(1);
    }
`;

const UploadInput = styled.input`
    display: none;
`;

const PhotosList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
`;

const PhotoItem = styled.div<{$isDarkMode: boolean}>`
    width: 5rem;
    height: 5rem;
    margin: 5px;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? '#000' : '#fff'};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Photo = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;
