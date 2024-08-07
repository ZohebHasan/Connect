import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Profiles from "./profileLinkButton";
import ProfilesButton from "./profileBarButton";
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useProfile } from '../../../../contexts/profiles/profilesContext';
import { useConnectUser } from '../../../../contexts/ConnectUser/connectUserProvider';

const UserProfile: React.FC = () => {
    const { activeProfile, isActivePersonal, isActiveProfessional, isActiveSchool } = useProfile();
    const { user } = useConnectUser();
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();

    const handleProfileNav = () => {
        if (activeProfile && user) {
            navigate(`/${activeProfile}/${user.username}`);
        } else if (isActivePersonal && user) {
            navigate(`/personal/${user.username}`);
        } else if (isActiveProfessional && user) {
            navigate(`/professional/${user.username}`);
        } else if (isActiveSchool && user) {
            navigate(`/school/${user.username}`);
        }
    };

    return (
        <>
            <UserProfileContainer>
                <ProfilesContainer onClick={handleProfileNav} $isDarkMode={isDarkMode}>
                    <Profiles />
                </ProfilesContainer>
                <ProfilesButton />
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
`;

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
        color: inherit;
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
