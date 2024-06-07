import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import ProfileBodyContainer from '../../../ConnectUI_web/templetes/bodyTemplete';

import DarkLightToggle from '../../../ConnectUI_web/common/darkLightToggle/darkLightToggle';

import OptionLight from "../../../assets/storyOptionsLight.png";
import OptionDark from "../../../assets/storyOptionsDark.png";

import ProfileInfo from "../elements/profileInfo/profileInfo";
import PostFilter from "../elements/profileFilter/profileFilter";




const ProfileBody: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const location = useLocation();

    const renderContent = () => {
        switch (location.pathname) {
            case "/currentUser/professional":
                return <></>
            case "/currentUser/professional/posts":
                return <></>
            case "/currentUser/personal/savedJobs":
                return <></>
            default:
                return <></>
        }
    };

    return (
        <>
            <ProfileBodyContainer flexDirection="column" flex={5.5}>
                <ProfileHeaderContainer>
                    <DarkLightToggle />
                    <OptionIcon src={isDarkMode ? OptionDark : OptionLight} />
                </ProfileHeaderContainer>
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