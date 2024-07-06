import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

import LeftIconDark from "../../assets/leftDark.png";
import LeftIconLight from "../../assets/leftLight.png";

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

    return (
        <LeftButtonContainer
            isActivePersonal={isActivePersonal}
            isActiveProfessional={isActiveProfessional}
            isActiveSchool={isActiveSchool}
            onClick={handleClick}
        >
            <Icon src={isDarkMode ? LeftIconDark : LeftIconLight} />
        </LeftButtonContainer>
    );
};

export default LeftButton;

const LeftButtonContainer = styled.div<{
    isActivePersonal: boolean;
    isActiveProfessional: boolean;
    isActiveSchool: boolean;
}>`
    position: fixed;
    left: 22%; 
    top: 50%;
    transform: translateY(-50%);
    background: ${({ isActivePersonal, isActiveProfessional, isActiveSchool }) => 
        isActivePersonal ? 'linear-gradient(to right, #2E3192, #1BFFFF)' :
        isActiveProfessional ? 'linear-gradient(to right, #EA8D8D, #A890FE)' :
        isActiveSchool ? 'linear-gradient(to right, #662D8C, #ED1E79)' : 'red'};
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
    width: 1.2rem;
    height: auto;
`;
