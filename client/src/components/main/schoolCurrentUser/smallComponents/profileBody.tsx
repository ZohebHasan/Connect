import React from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import ProfileBodyContainer from '../../../ConnectUI_web/templetes/bodyTemplete';

import DarkLightToggle from '../../../ConnectUI_web/common/darkLightToggle/darkLightToggle';

import OptionLight from "../../../assets/storyOptionsLight.png";
import OptionDark from "../../../assets/storyOptionsDark.png";

import ProfileInfo from "../elements/profileInfo/profileInfo";
import PostFilter from "../elements/nav/schoolNav";

import Courses from "../elements/courses/courseList"
import ClubsAndOrgs from "../elements/clubsAndOrgs/clubsAndOrgsList"

import CampusPosts from "../elements/campus/campusPosts"

import LeftButton from '../../smallComponents/leftButton';
import RightButton from '../../smallComponents/rightButton';

const ProfileBody: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const location = useLocation();
    const { username } = useParams<{ username: string }>();

    const renderContent = () => {
        switch (location.pathname) {
            case `/school/${username}`:
                return <Courses />
            case `/school/${username}/courses`:
                return <Courses />
            case `/school/${username}/clubsAndOrgs`:
                return <ClubsAndOrgs />
            case `/school/${username}/campus`:
                return <CampusPosts />
            default:
                return <></>
        }
    };

    return (
        <>
            <ProfileBodyContainer flexDirection="column" flex={5.5}>
                <LeftButton />
                <RightButton />
                <ProfileInfo />
                <PostFilter />
                {renderContent()}
            </ProfileBodyContainer>
        </>
    );
};

export default ProfileBody;

const OptionIcon = styled.img`
    width: 1.7rem;
    height: 1.7rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.10);
    }
    &:active {
        transform: scale(1.00);
    }
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const ProfileHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 95%;
    margin-top: 1rem;
    align-items: center;
    justify-content: flex-end;
    gap: 0.8rem;
`;
