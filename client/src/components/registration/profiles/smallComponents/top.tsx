import React, {useState} from 'react';
import styled, { keyframes, css } from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

import Profiles from './profiles';

import Text from '../../../ConnectUI_web/common/texts/static';


function ProfilesText() {
    return (
        <TextContainer>
            <Text size={"3rem"} variant={"normal"} fontWeight={"300"}>
                Please select your desired
            </Text>
            <Text size={"3rem"} variant={"transparent"} fontWeight={"400"}>
                profiles.
            </Text>
        </TextContainer>
    );
}

const TextContainer = styled.div`
    flex: 0.5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 3%;
    gap: 15px;
`

type ProfileType = 'professional' | 'personal' | 'school';

interface TopProps {
    selectedProfile: {
      professional: boolean;
      personal: boolean;
      school: boolean;
    };
    notSelectedError: boolean;
    handleSelected: (profileType: ProfileType) => void; 
}

const Top: React.FC<TopProps> = ({ selectedProfile, notSelectedError, handleSelected }) => {
    const {isDarkMode} = useDarkMode();

    return(
            <TopContainer>
                <ProfilesText/>
                <ProfilesContainer $isActive = {notSelectedError}>
                    <Profiles 
                        selectedProfile={selectedProfile}
                        handleSelected = {handleSelected}
                    />
                </ProfilesContainer>
                <ErrorMessage $isActive={notSelectedError}>
                        At least one profile needs to be selected.
                </ErrorMessage>
            </TopContainer>
    );
  }

export default Top;

const TopContainer = styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;   
    /* background-color: pink; */
`
const ProfilesContainer = styled.div<{$isActive: boolean}>`
  flex: 3;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5%;
  animation: ${({ $isActive }) => $isActive ? css`${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both` : 'none'};
`


const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  60% { transform: translateX(10px); }
  70% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  90% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;


const ErrorMessage = styled.p<{$isActive: boolean}> `
  color: red;
  font-size: 18px;
  visibility: ${({ $isActive }) => $isActive ? 'visible' : 'hidden'};
`;



