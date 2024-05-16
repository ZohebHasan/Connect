import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/Language/Language';
import Text from '../../ConnectUI_web/common/texts/static';
import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';
import Logo from "../../ConnectUI_web/common/logo/logo";

import ProfilePhotos from './profilePhotos';
import ControlFeatures from "./controlFeatures"

const SidebarContainer: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    
  



    return (


        <AccountCenter to = "#" $isDarkMode = {isDarkMode}>
            <AccountCenterWrapper>
                <LogoContainer>
                    <LogoContainerWrapper>
                        <LogoWrapper>
                            <Logo size={1.1} />
                        </LogoWrapper>

                        <AccTitleContainer>
                            <Text variant={"normal"}
                                size={"1.1rem"}
                                fontWeight={"500"}
                            >
                                User Control Center
                            </Text>
                        </AccTitleContainer>
                    </LogoContainerWrapper>
                    <ProfileAvatarsContainer>
                        <ProfilePhotos
                            childSize={1.5}
                            parentSize={2}
                        />
                    </ProfileAvatarsContainer>
                    
                </LogoContainer>
                <DetailsContainer>
                    <Text variant={"transparent"}
                        size={"0.8rem"}
                        fontWeight={"300"}
                    >
                        Manage and control your personal information, 
                        profiles, account and earnings from Connect.
                    </Text>
                </DetailsContainer>
                <FeaturesContainer>
                    <ControlFeatures />
                </FeaturesContainer>


            </AccountCenterWrapper>
        </AccountCenter>

    );
};

export default SidebarContainer;

const ProfileAvatarsContainer = styled.div`
    display: flex;
    flex: 0.7;
    align-items: center;
    justify-content: center;
    // margin: 0rem 0.5rem;
    height:75%;
    width: 100%;
    // background-color:blue;
    
`

const LogoContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2.7;
    align-items: flex-start;
    justify-content: center;
    // background-color: pink;
`

const FeaturesContainer = styled.div`
    display: flex;
    flex: 1.5;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    // background-color: orange;
    // height: 100%;    
`

const LogoContainer = styled.div`
  display: flex;
  flex: 0.8;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
//   background-color: red;
`

const LogoWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    // background-color: blue;
    flex: 1.3;
`
const AccTitleContainer = styled.div`
    display: flex;
    align-items: center;
    // background-color: pink;
    flex: 1;
`


const AccountCenterWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    // background-color: pink;
    width: 85%;
    align-items: flex-start;
    justify-content: center;
`

const DetailsContainer = styled.div`
  display: flex;
  flex: 0.6;
//   background-color: blue;
`




const AccountCenter = styled(Link)<{$isDarkMode: boolean}>`
  display: flex;
  flex: 2;
  width: 90%;
//   min-height: 18.5rem;
//   height: 100%;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  background-color: grey;
  border-radius: 1rem;
  margin-top: 0.5rem;
  
  text-decoration: none; 

  transition: transform 0.2s ease-in-out, background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 1;
  &:link, &:visited { 
    color: inherit; /* Inherits color from parent, preventing blue color */
  }
  &:hover {
    background-color: ${({ $isDarkMode }) => $isDarkMode ? '#333' : '#eee'};
    opacity: 0.7;
    transform: scale(1.05);
    text-decoration: none; 
}

 &:active {
    background-color: ${({ $isDarkMode }) => $isDarkMode ? '#555' : '#ccc'}; 
    transform: scale(1.00);
    color: inherit; 
}

`

