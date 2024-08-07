import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

import RightIconDark from "../../assets/rightDark.png";
import RightIconLight from "../../assets/rightLight.png";

import RightPersonal from "../../assets/rightPersonal.png";
import RightSchool from "../../assets/rightSchool.png";
import RightProfessional from "../../assets/rightProfessional.png";

import { useProfile } from '../../../contexts/profiles/profilesContext';

const RightButton: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { isActivePersonal, isActiveProfessional, isActiveSchool, handleProfileChange } = useProfile();

    const handleClick = () => {
        if (isActivePersonal) {
            handleProfileChange("school");
        } else if (isActiveSchool) {
            handleProfileChange("professional");
        } else if (isActiveProfessional) {
            handleProfileChange("personal");
        }
    };

    const getIcon = () => {
        if (isActivePersonal) {
            return RightSchool;
        } else if (isActiveSchool) {
            return RightProfessional;
        } else if (isActiveProfessional) {
            return RightPersonal;
        } else {
            return isDarkMode ? RightIconDark : RightIconLight;
        }
    };

    return (
        <RightButtonContainer
            isDarkMode={isDarkMode}
            onClick={handleClick}
        >
            <Icon src={getIcon()} />
        </RightButtonContainer>
    );
};

export default RightButton;

const RightButtonContainer = styled.div<{ isDarkMode: boolean }>`
    position: fixed;
    right: 2%; 
    top: 50%;
    transform: translateY(-50%);
    background: ${({ isDarkMode }) => isDarkMode ? 'rgba(118, 118, 118, 0.665)' : 'rgba(141, 141, 141, 0.238)'};
    padding: 0.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.8;
    &:hover {
        opacity: 0.7;
        transform: translateY(-50%) scale(1.05);
    }
    &:active {
        transform: translateY(-50%) scale(0.96);
    }
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const Icon = styled.img`
    width: 1.8rem;
    height: auto;
`;
