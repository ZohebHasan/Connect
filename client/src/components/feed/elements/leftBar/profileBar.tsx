import React, { useState } from 'react';
import styled from 'styled-components';


import ProfileBarContainer from '../../containers/profileBarContainer';
import Text from '../../../ConnectUI_web/common/texts/static';
import Profiles from "./profiles"


const SidebarContainer: React.FC = () => {
    const [activeButtons, setActiveButtons] = useState({
        home: false,
        search: false,
        notifications: false,
        inbox: false,
        clips: false,
        trending: false,
        create: false
    });

    const toggleActive = (buttonKey: keyof typeof activeButtons) => {
        setActiveButtons({
            home: false,
            search: false,
            notifications: false,
            inbox: false,
            clips: false,
            trending: false,
            create: false,
            [buttonKey]: true
        });
    };


    return (
        <ProfileBarContainer>
            <ProfileTextContainer>
                <Text variant={"transparent"}
                    size={"1.7rem"}
                    fontWeight={"200"}
                >
                    Profiles
                </Text>
            </ProfileTextContainer>
            <ProfilesContainer>
                <ProfilesWrapper>
                    <Profiles
                        activeButtons={activeButtons}
                        toggleActive={toggleActive}
                    />
                </ProfilesWrapper>
            </ProfilesContainer>
            <EmptySpace>
            </EmptySpace>
        </ProfileBarContainer>
    );
};

export default SidebarContainer;


const ProfilesWrapper = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: red;
  // width: 100%;
`

const ProfileTextContainer = styled.div`
    display: flex;
    flex: 1.5;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    // background-color: blue;
`
const ProfilesContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;  // Changed from center to flex-start to align children from top to bottom
    max-height: 100%;
    width: 100%;
    overflow-y: auto;
    // background-color: pink;
`

const EmptySpace = styled.div`
  flex: 2;
  // background-color: red;
  width: 100%;
`