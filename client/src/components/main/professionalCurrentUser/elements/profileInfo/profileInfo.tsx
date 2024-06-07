import React, { useState } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

import AddStoryDark from "../../../../assets/addStoryDark.png";
import AddStoryLight from "../../../../assets/addStoryLight.png";

import VerifiedIcon from "../../../../assets/verified.png"

import DummyProfessional from "../../../dummies/professional.jpeg"

const VerifiedBadge: React.FC = () => {
    const isVarified: boolean = true;
    return (
        <>
            <VerifiedBadgeContainer>
                <StyledLogo src={VerifiedIcon} alt="Logo" />
            </VerifiedBadgeContainer>
        </>
    )

}

const ProfileBody: React.FC = () => {
    const isVarified: boolean = true;
    const fullName = "Zoheb Hasan"
    const userName = "zoheb.hasan"
    const { isDarkMode } = useDarkMode();

    return (
        <>
            <ProfileInfoContainer>
                <Top>
                    <UserPhotoContainer>
                        <UserPhotoWrapper>
                            <Border >
                                <InnerBorder $isDarkMode={isDarkMode}>
                                    <Story src={DummyProfessional} />
                                </InnerBorder>
                            </Border>
                            <AddBorder $isDarkMode={isDarkMode}>
                                <AddIcon src={isDarkMode ? AddStoryDark : AddStoryLight} />
                            </AddBorder>
                        </UserPhotoWrapper>
                    </UserPhotoContainer>
                    <UserInfo>
                        <FullNameContainer>
                            <Text size={"1.7rem"} fontWeight={"300"}>
                                {fullName}
                            </Text>
                            {isVarified ? <VerifiedBadge /> : <></>}
                            <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                (He/His)
                            </Text>
                            <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                •
                            </Text>
                            <UserName>
                                <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                    @{userName}
                                </Text>
                            </UserName>
                        </FullNameContainer>

                        <Profession>
                            <Text size={"1.2rem"} fontWeight={"300"} variant={"normal"}>
                                Software Engineer at Connect
                            </Text>
                        </Profession>
                        <Location>
                            <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                Stony Brook, New York, United States
                            </Text>
                        </Location>

                    </UserInfo>
                    <ProfileTypeContainer>
                        <Text size={"2rem"} fontWeight={"300"} variant={"professional"}>
                            Professional
                        </Text>
                    </ProfileTypeContainer>
                </Top>

                <Bottom>
                    <UserNameBioContainer>
                        <PostFollowInfo>
                            <DataContainer>
                                <FollowersButton>
                                    <Text variant={"normal"} size={"1.2rem"} fontWeight={"300"}>
                                        523 Followers
                                    </Text>
                                </FollowersButton>
                            </DataContainer>

                            <DataContainer>
                                <FollowingButton>
                                    <Text variant={"normal"} size={"1.2rem"} fontWeight={"300"}>
                                        234 Following
                                    </Text>
                                </FollowingButton>
                            </DataContainer>

                            {/* <DataContainer>
                                <Text variant={"transparent"} size={"1.2rem"} fontWeight={"300"}>
                                    24 Posts
                                </Text>
                            </DataContainer> */}
                        </PostFollowInfo>

                        <BioContainer>
                            <Text size={"1.1rem"} fontWeight={"300"} variant={"transparent"}>
                                Trying to do better things everyday, every way.
                            </Text>
                        </BioContainer>
                    </UserNameBioContainer>
                </Bottom>
            </ProfileInfoContainer>
        </>
    );
};

export default ProfileBody;

const Location = styled.div`
    display: flex;
`

const Profession = styled.div`
    display: flex;
`

const ProfileTypeContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    
`

const UserName = styled.div`
    display: flex;
    
`

const BioContainer = styled.div`
    
`

const StyledLogo = styled.img`
    width: 1.6rem;
    height: 1.6rem;

`;


const VerifiedBadgeContainer = styled.div`
    display: flex;
    // flex: 1;
    align-items: flex-start;
    // justify-content: center;
    // width: 100%;
    // height: 100%;
    // background-color: pink;
`

const FullNameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    /* width: 100%; */
    gap: 0.3rem;
`

const UserInfo = styled.div`
    flex: 2;
    display: Flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    /* height: 100%; */
    /* gap: 0.5rem; */
    // background-color: red;
`

const UserNameBioContainer = styled.div`
    /* background-color: red;   */
    display: flex;

    width: 95%;
    flex-direction: column;
    gap: 1rem;
`

const MemoryContainer = styled.div`
    background-color: pink;
    display: flex;
    flex: 1;
    width: 100%;
    
`

const AddIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const AddBorder = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${props => (props.$isDarkMode ? 'black' : 'white')};
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.10);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;




const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* background-color: green; */
    
`

const FollowingButton = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.04);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;

`

const FollowersButton = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.04);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`


const DataContainer = styled.div`
    /* flex: 1; */
    display: flex;
    align-items: center;
    justify-content: center;
    
`





const ProfileInfoContainer = styled.div`
    display: flex;
    /* background-color: blue; */
    width: 95%;
    flex-direction: column;
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    /* background-color: red; */
    /* gap: 0.5rem; */
    
`

const UserPhotoContainer = styled.div`
    flex: 1;
    /* background-color: orange; */
    display: flex;
    align-items: center;
    justify-content: center;
`

const PostFollowInfo = styled.div`
    /* flex: 3; */
    /* background-color: pink; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
`
const UserPhotoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    /* background-color: red; */
    
`

const Border = styled.div`
  background: linear-gradient(to right, #2E3192, #1BFFFF);
  padding: 1.8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const InnerBorder = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${props => (props.$isDarkMode ? 'black' : 'white')};
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; 
`;

const Story = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  flex-shrink: 0;
`;



