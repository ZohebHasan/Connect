import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LogoNav from "../../containers/buttonLogo";
import Text from '../../../ConnectUI_web/common/texts/static';

import SettingsDarkActive from "../../../assets/settingsDarkActive.png";
import SettingsLightActive from "../../../assets/settingsLightActive.png";
import SettingsLight from "../../../assets/settingsLight.png";
import SettingsDark from "../../../assets/settingsDark.png";

import FocusDarkActive from "../../../assets/focusDarkActive.png";
import FocusLightActive from "../../../assets/focusLightActive.png";
import FocusLight from "../../../assets/focusLight.png";
import FocusDark from "../../../assets/focusDark.png";

import ProblemDarkActive from "../../../assets/problemDarkActive.png";
import ProblemLightActive from "../../../assets/problemLightActive.png";
import ProblemLight from "../../../assets/problemLight.png";
import ProblemDark from "../../../assets/problemDark.png";





import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

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

    return (
        <>

            <ButtonLink to="/home" $isDarkMode={isDarkMode} onClick={() => toggleActive('home')}>  
                <ButtonWrapper>
                    <LogoContainer>
                        <LogoNav
                            darkModeLogo={SettingsDark}
                            lightModeLogo={SettingsLight}
                            activeDarkLogo={SettingsDarkActive}
                            activeLightLogo={SettingsLightActive}
                            isActive={activeButtons.home}
                            size= {1.7}

                        />
                        <Text size={"1rem"} fontWeight={"300"}>Settings</Text>  
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>

            <ButtonLink to="#" $isDarkMode={isDarkMode} onClick={() => toggleActive('search')}>
                <ButtonWrapper>
                    <LogoContainer>
                        <LogoNav
                            darkModeLogo={FocusDark}
                            lightModeLogo={FocusLight}
                            activeDarkLogo={FocusDarkActive}
                            activeLightLogo={FocusLightActive}
                            isActive={activeButtons.search}
                            size= {1.7}

                        />
                        <Text size={"1rem"} fontWeight={"300"}>Focus Options</Text>  
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>
            <ButtonLink to="#" $isDarkMode={isDarkMode} onClick={() => toggleActive('notifications')}>
                <ButtonWrapper>
                    <LogoContainer>
                        <LogoNav
                            darkModeLogo={ProblemDark}
                            lightModeLogo={ProblemLight}
                            activeDarkLogo={ProblemDarkActive}
                            activeLightLogo={ProblemLightActive}
                            isActive={activeButtons.notifications}
                            size= {1.7}

                        />
                        <Text size={"1rem"} fontWeight={"300"}>Report an issue</Text>  
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>
            <ButtonLink to="#" $isDarkMode={isDarkMode} onClick={() => toggleActive('clips')}>
                <ButtonWrapper>
                    <LogoContainer>  
                         <Text size={"1.3rem"} fontWeight={"300"}>Sign out</Text>  
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>

          
        </>
    );
};

export default LeftBarButtons;

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


const ButtonLink = styled(Link) <{ $isDarkMode: boolean }>`
    flex: 1;
    margin: 0.5rem 0rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    border-radius: 0.5rem;
    text-decoration: none; // Removes underline from all links
    color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
  
   
    transition: transform 0.2s ease-in-out, color 0.3s, opacity 0.3s ease-in-out;

    &:hover {
      color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
      background-color: ${({ $isDarkMode }) => $isDarkMode ? '#6c6c6c' : '#a2a2a2'};  // subtle background change on hover
      transition: color 0.3s, background-color 0.3s, opacity 0.3s ease-in-out;
      opacity: 0.8;
      transform: scale(1.05); 
    }
  
    &:active {
      background-color: ${({ $isDarkMode }) => $isDarkMode ? '#919191' : '#595858'};  // deeper background on click
      transition: color 0.2s, background-color 0.2s;
      transform: scale(1.00);
    }
    // background-color: pink;
`;






