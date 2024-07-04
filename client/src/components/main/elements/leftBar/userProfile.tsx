import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Profiles from "./profileLinkButton"
import { Link, Navigate } from 'react-router-dom';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import ProfilesButton from "./profileBarButton"

import { useProfile } from '../../../../contexts/profiles/profilesContext';

const UserProfile: React.FC = () => {

    const {isActivePersonal, isActiveProfessional, isActiveSchool, } = useProfile();

    const {isDarkMode} = useDarkMode();
    const navigate = useNavigate();


    const handleProfileNav = () =>{
        if(isActivePersonal){
            navigate('/currentUser/personal');
        }
        else if(isActiveProfessional){
            navigate('/currentUser/professional');
        }
        else{
            navigate('/currentUser/school');

        }
    }


    return (
        <>
            <UserProfileContainer>
                <ProfilesContainer onClick={handleProfileNav} $isDarkMode = {isDarkMode}>
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

const ProfilesContainer = styled.div<{$isDarkMode: boolean}>`
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
    position: relative;
    z-index: 4;

    &:link, &:visited { 
        color: inherit; /* Inherits color from parent, preventing blue color */
    }

    &:hover {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#565454' : '#a0a0a0'};
        opacity: 0.8;
        transform: scale(1.05);
        text-decoration: none; 
    }
    
    &:active {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#919191' : '#595858'};
        transform: scale(1.00);
        color: inherit; 
    }


`;


