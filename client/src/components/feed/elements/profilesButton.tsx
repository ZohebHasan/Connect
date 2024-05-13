import React, { useState } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';


import CloseLight from "../assets/closeProfilesLight.png"
import CloseDark from "../assets/closeProfilesDark.png"
import OpenLight from "../assets/openLight.png"
import OpenDark from "../assets/openDark.png"

import ProfilesListButton from "../containers/buttonLogo";

const UserProfile: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const [openProfiles, setOpenProfiles] = useState(false);

    const toggleOpenProfiles = () => {
        setOpenProfiles(prevOpenProfiles => !prevOpenProfiles);
    }

    return (
        <>
            <ProfileListButtonContainer
                $isDarkMode={isDarkMode}
                onClick={toggleOpenProfiles}
            >
                <ButtonWrapper>
                    <ProfilesListButton
                        darkModeLogo={OpenDark}
                        lightModeLogo={OpenLight}
                        activeDarkLogo={CloseDark}
                        activeLightLogo={CloseLight}
                        isActive={openProfiles}
                        size={1.5}
                    />
                </ButtonWrapper>
            </ProfileListButtonContainer>
        </>
    );
};

export default UserProfile;

const ProfileListButtonContainer = styled.div<{ $isDarkMode: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: 100%;
    height: 100%; 
    border-radius: 0.5rem;
    margin: 0.2rem;

    &:hover {
        color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#333' : '#eee'};
        opacity: 0.7;
        transform: scale(1.05); 
    }
    
    &:active {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#555' : '#ccc'};
        transform: scale(1.00);
    }
    transition: transform 0.2s ease-in-out, color 0.3s, opacity 0.3s ease-in-out;
    // background-color: cyan;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; 
`;

