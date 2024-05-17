import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LogoNav from "../containers/buttonLogo";
import Text from '../../ConnectUI_web/common/texts/static';

import HomeDarkActive from "../assets/homeDarkActive.png";
import HomeLightActive from "../assets/homeLightActive.png";
import HomeLight from "../assets/homeLight.png";
import HomeDark from "../assets/homeDark.png";

import SearchDarkActive from "../assets/searchDarkActive.png";
import SearchLightActive from "../assets/searchLightActive.png";
import SearchLight from "../assets/searchLight.png";
import SearchDark from "../assets/searchDark.png";

import NotificationDarkActive from "../assets/notificationDarkActive.png";
import NotificationLightActive from "../assets/notificationLightActive.png";
import NotificationLight from "../assets/notificationLight.png";
import NotificationDark from "../assets/notificationDark.png";

import InboxDarkActive from "../assets/inboxDarkActive.png";
import InboxLightActive from "../assets/inboxLightActive.png";
import InboxLight from "../assets/inboxLight.png";
import InboxDark from "../assets/inboxDark.png";

import ClipsDarkActive from "../assets/clipsDarkActive.png";
import ClipsLightActive from "../assets/clipsLightActive.png";
import ClipsLight from "../assets/clipsLight.png";
import ClipsDark from "../assets/clipsDark.png";

import TrendingDarkActive from "../assets/trendingDarkActive.png";
import TrendingLightActive from "../assets/trendingLightActive.png";
import TrendingLight from "../assets/trendingLight.png";
import TrendingDark from "../assets/trendingDark.png";



import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';

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
                            darkModeLogo={HomeDark}
                            lightModeLogo={HomeLight}
                            activeDarkLogo={HomeDarkActive}
                            activeLightLogo={HomeLightActive}
                            isActive={activeButtons.home}
                        />
                        <Text size={"1.2rem"} fontWeight={"300"}>Home</Text>  
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>

            <ButtonLink to="#" $isDarkMode={isDarkMode} onClick={() => toggleActive('search')}>
                <ButtonWrapper>
                    <LogoContainer>
                        <LogoNav
                            darkModeLogo={SearchDark}
                            lightModeLogo={SearchLight}
                            activeDarkLogo={SearchDarkActive}
                            activeLightLogo={SearchLightActive}
                            isActive={activeButtons.search}
                        />
                        <Text size={"1.2rem"} fontWeight={"300"}>Search</Text>  
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>
            <ButtonLink to="#" $isDarkMode={isDarkMode} onClick={() => toggleActive('notifications')}>
                <ButtonWrapper>
                    <LogoContainer>
                        <LogoNav
                            darkModeLogo={NotificationDark}
                            lightModeLogo={NotificationLight}
                            activeDarkLogo={NotificationDarkActive}
                            activeLightLogo={NotificationLightActive}
                            isActive={activeButtons.notifications}
                        />
                        <Text size={"1.2rem"} fontWeight={"300"}>Notifications</Text>  
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>
            <ButtonLink to="#" $isDarkMode={isDarkMode} onClick={() => toggleActive('inbox')}>
                <ButtonWrapper>
                    <LogoContainer>
                        <LogoNav
                            darkModeLogo={InboxDark}
                            lightModeLogo={InboxLight}
                            activeDarkLogo={InboxDarkActive}
                            activeLightLogo={InboxLightActive}
                            isActive={activeButtons.inbox}
                        />
                         <Text size={"1.2rem"} fontWeight={"300"}>Inbox</Text>  
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>
            <ButtonLink to="#" $isDarkMode={isDarkMode} onClick={() => toggleActive('clips')}>
                <ButtonWrapper>
                    <LogoContainer>
                        <LogoNav
                            darkModeLogo={ClipsDark}
                            lightModeLogo={ClipsLight}
                            activeDarkLogo={ClipsDarkActive}
                            activeLightLogo={ClipsLightActive}
                            isActive={activeButtons.clips}
                        />
                         <Text size={"1.2rem"} fontWeight={"300"}>Clips</Text>  
                    </LogoContainer>
                </ButtonWrapper>
            </ButtonLink>

            <ButtonLink to="#" $isDarkMode={isDarkMode} onClick={() => toggleActive('trending')}>
                <ButtonWrapper>
                    <LogoContainer>
                        <LogoNav
                            darkModeLogo={TrendingDark}
                            lightModeLogo={TrendingLight}
                            activeDarkLogo={TrendingDarkActive}
                            activeLightLogo={TrendingLightActive}
                            isActive={activeButtons.trending}
                        />
                        <Text size={"1.2rem"} fontWeight={"300"}>Trending</Text>  
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
    width: 50%;
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
      background-color: ${({ $isDarkMode }) => $isDarkMode ? '#333' : '#eee'};  // subtle background change on hover
      transition: color 0.3s, background-color 0.3s, opacity 0.3s ease-in-out;
      opacity: 0.7;
      transform: scale(1.05); 
    }
  
    &:active {
      background-color: ${({ $isDarkMode }) => $isDarkMode ? '#555' : '#ccc'};  // deeper background on click
      transition: color 0.2s, background-color 0.2s;
      transform: scale(1.00);
    }
  
`;






