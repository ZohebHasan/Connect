import React, { useState } from 'react';
import styled from 'styled-components';
import Profiles from "./profiles"
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import ProfilesButton from "./profilesButton"

const UserProfile: React.FC = () => {
    const {isDarkMode} = useDarkMode();
    return (
        <>
            <UserProfileContainer>
                <ProfilesContainer to = "#" $isDarkMode = {isDarkMode}>
                    <Profiles />
                </ProfilesContainer>
                <ProfilesButton/>
            </UserProfileContainer>
        </>
    );
};

export default UserProfile;



const UserProfileContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 90%;
    align-items: center;
    justify-content: center;
    // background-color: red;
`

const ProfilesContainer = styled(Link)<{$isDarkMode: boolean}>`
    display: flex;
    flex: 6;
    height: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    border-radius: 0.5rem;
    color: inherit; 
    text-decoration: none; 
    background-color: transparent; 

    &:link, &:visited { 
        color: inherit; /* Inherits color from parent, preventing blue color */
    }

    &:hover {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#333' : '#eee'};
        opacity: 0.7;
        transform: scale(1.05);
        text-decoration: none; 
    }
    
    &:active {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#555' : '#ccc'};
        transform: scale(1.00);
        color: inherit; 
    }


`;

