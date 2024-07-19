import React, { useState } from 'react';
import styled from 'styled-components';


import ProfileBarContainer from './profileBarContainer';
import Text from '../../../../../../ConnectUI_web/common/texts/static';
import ProfileList from "./profiles"


const SidebarContainer: React.FC = () => {



    return (
        <ProfileBarContainer>
            <ProfileTextContainer>
                <Text variant={"transparent"}
                    size={"1.7rem"}
                    fontWeight={"200"}
                >
                    Post as:
                </Text>
            </ProfileTextContainer>
            <ProfilesContainer>
                <ProfilesWrapper>
                    <ProfileList/>
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