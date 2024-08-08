import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

import LeftIconDark from "../../assets/leftDark.png";
import LeftIconLight from "../../assets/leftLight.png";

import LeftPersonal from "../../assets/leftPersonal.png";
import LeftSchool from "../../assets/leftSchool.png";
import LeftProfessional from "../../assets/leftProfessional.png";

import { useProfile } from '../../../contexts/profiles/profilesContext';

const LeftButton: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const { isActivePersonal, isActiveProfessional, isActiveSchool, handleProfileChange } = useProfile();

    const handleClick = () => {
        if (isActivePersonal) {
            handleProfileChange("professional");
        } else if (isActiveProfessional) {
            handleProfileChange("school");
        } else if (isActiveSchool) {
            handleProfileChange("personal");
        }
    };

    const getIcon = () => {
        if (isActivePersonal) {
            return LeftProfessional;
        } else if (isActiveProfessional) {
            return LeftSchool;
        } else if (isActiveSchool) {
            return LeftPersonal;
        } else {
            return isDarkMode ? LeftIconDark : LeftIconLight;
        }
    };

    return (
        <LeftButtonContainer
            isDarkMode={isDarkMode}
            onClick={handleClick}
        >
            <Icon src={getIcon()} />
        </LeftButtonContainer>
    );
};

export default LeftButton;

const LeftButtonContainer = styled.div<{ isDarkMode: boolean }>`
    position: fixed;
    left: 22%; 
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
