import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SelectLogo from "../../containers/buttonLogo";
import Text from '../../../ConnectUI_web/common/texts/static';

import SelectedDark from "../../assets/selectedDark.png";
import SelectedLight from "../../assets/selectedLight.png"
import NotSelectedLight from "../../assets/notSelectedLight.png"
import NotSelectedDark from "../../assets/notSelectedDark.png"

import PersonalPhoto from "../../dummies/personal.jpeg";
import ProfessionalPhoto from "../../dummies/professional.jpeg";
import SchoolPhoto from "../../dummies/school.jpeg";


import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useProfile } from '../../../../contexts/feed/profiles/profilesContext';


type ButtonKey = 'home' | 'search' | 'notifications' | 'inbox' | 'trending' | 'clips';


interface LeftBarButtonsProps {
    activeButtons: {
        home: boolean;
        search: boolean;
        notifications: boolean;
        inbox: boolean;
        trending: boolean;
        clips: boolean;
    };
    toggleActive: (buttonKey: ButtonKey) => void;
}


const LeftBarButtons: React.FC<LeftBarButtonsProps> = ({ activeButtons, toggleActive }) => {
    const { isDarkMode } = useDarkMode();

    const {isActivePersonal, isActiveProfessional, isActiveSchool, handleProfileChange} = useProfile();

    return (
        <>

            <ButtonLink  $isDarkMode={isDarkMode} onClick={() => handleProfileChange('personal')}>
                <ButtonWrapper>
                    <LogoContainer>

                        <Border profileType={"personal"}>
                            <Photo
                                src={PersonalPhoto}
                            />
                        </Border>
                        <Text size={"1.1rem"} variant={"personal"} fontWeight={"300"}>Personal</Text>
                        <SelectLogoContainer>
                            <SelectLogo
                                darkModeLogo={NotSelectedDark}
                                lightModeLogo={NotSelectedLight}
                                activeDarkLogo={SelectedDark}
                                activeLightLogo={SelectedLight}
                                isActive={isActivePersonal}
                                size={1.5}
                            />
                        </SelectLogoContainer>
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>

            <ButtonLink $isDarkMode={isDarkMode} onClick={() => handleProfileChange("school")}>
                <ButtonWrapper>
                    <LogoContainer>
                        <Border profileType={"school"}>
                            <Photo
                                src={SchoolPhoto}
                            />
                        </Border>
                        <Text size={"1.1rem"} variant={"school"} fontWeight={"300"}>School</Text>
                        <SelectLogoContainer>
                            <SelectLogo
                                darkModeLogo={NotSelectedDark}
                                lightModeLogo={NotSelectedLight}
                                activeDarkLogo={SelectedDark}
                                activeLightLogo={SelectedLight}
                                isActive={isActiveSchool}
                                size={1.5}
                            />
                        </SelectLogoContainer>
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>
            <ButtonLink  $isDarkMode={isDarkMode} onClick={() => handleProfileChange("professional")}>
                <ButtonWrapper>
                    <LogoContainer>
                        <Border profileType={'professional'}>
                            <Photo
                                src={ProfessionalPhoto}
                            />
                        </Border>
                        <Text size={"1.1rem"} variant={"professional"} fontWeight={"300"}>Professional</Text>
                        <SelectLogoContainer>
                            <SelectLogo
                                darkModeLogo={NotSelectedDark}
                                lightModeLogo={NotSelectedLight}
                                activeDarkLogo={SelectedDark}
                                activeLightLogo={SelectedLight}
                                isActive={isActiveProfessional}
                                size={1.5}
                            />
                        </SelectLogoContainer>
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>



        </>
    );
};

export default LeftBarButtons;

const SelectLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`


interface BorderProps {
    profileType: 'personal' | 'professional' | 'school';
}

const getBackgroundGradient = (profileType: string) => {
    switch (profileType) {
        case 'personal':
            return 'linear-gradient(to right, #662D8C, #ED1E79)';
        case 'professional':
            return 'linear-gradient(to right, #2E3192, #1BFFFF)';
        case 'school':
            return 'linear-gradient(to right, #EA8D8D, #A890FE)';
        default:
            return '';
    }
};


const Border = styled.div<BorderProps>`
    background: ${({ profileType }) => getBackgroundGradient(profileType)};
    padding: 2px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;



const Photo = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
`



const ButtonWrapper = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`


const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 0.7rem;

`;



const ButtonLink = styled.button<{ $isDarkMode: boolean }>`
  flex: 1;
  margin: 0.5rem 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  border-radius: 0.5rem;
  text-decoration: none; // Removes underline from all links
  color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
  background: none; // Removes the background
  border: none;
  padding: 0; // Removes default padding
  cursor: pointer; // Adds pointer cursor to indicate it's clickable
  font: inherit; // Inherit font styles from parent
  font-size: inherit; // Inherit font size from parent
  outline: none; // Removes the default outline

  transition: transform 0.2s ease-in-out, color 0.3s, opacity 0.3s ease-in-out;

  &:hover {
    color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#6c6c6c' : '#a2a2a2')};  // subtle background change on hover
    transition: color 0.3s, background-color 0.3s, opacity 0.3s ease-in-out;
    opacity: 0.8;
    transform: scale(1.05); 
  }

  &:active {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#919191' : '#595858')};  // deeper background on click
    transition: color 0.2s, background-color 0.2s;
    transform: scale(1.00);
  }
`;


