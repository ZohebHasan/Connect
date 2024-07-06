import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';


import CloseLight from "../../../assets/closeProfilesLight.png"
import CloseDark from "../../../assets/closeProfilesDark.png"
import OpenLight from "../../../assets/openLight.png"
import OpenDark from "../../../assets/openDark.png"

import ProfilesListButton from "../../containers/buttonLogo";
import { useProfile } from '../../../../contexts/profiles/profilesContext';

const UserProfile: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { isProfilesbarOpen, toggleProfilesbar, addProtectedRef, removeProtectedRef } = useProfile();

    const optionBtnRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (optionBtnRef.current) {
          addProtectedRef(optionBtnRef);
        }
    
        return () => {
          if (optionBtnRef.current) {
            removeProtectedRef(optionBtnRef);
          }
        }; 
      }, [optionBtnRef, addProtectedRef, removeProtectedRef]);

    return (
        <>
            <ProfileListButtonContainer
                $isDarkMode={isDarkMode}
                onClick={toggleProfilesbar}
                ref = {optionBtnRef}
            >
                <ButtonWrapper>
                    <ProfilesListButton
                        darkModeLogo={OpenDark}
                        lightModeLogo={OpenLight}
                        activeDarkLogo={CloseDark}
                        activeLightLogo={CloseLight}
                        isActive={isProfilesbarOpen}
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
    position: relative;
    z-index: 4;

    &:hover {
        color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#565454' : '#a0a0a0'};
        opacity: 0.7;
        transform: scale(1.05); 
    }
    
    &:active {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#919191' : '#595858'};
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

