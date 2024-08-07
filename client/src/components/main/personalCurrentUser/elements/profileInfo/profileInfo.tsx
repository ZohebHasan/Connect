import React, { useState } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

import AddStoryDark from "../../../../assets/addStoryDark.png";
import AddStoryLight from "../../../../assets/addStoryLight.png";

import VerifiedIcon from "../../../../assets/verified.png"

import OptionLight from "../../../../assets/storyOptionsLight.png";
import OptionDark from "../../../../assets/storyOptionsDark.png";

import EditLight from "../../../../assets/editLightPencil.png"
import EditDark from "../../../../assets/editDarkPencil.png"

import { usePersonalContext } from '../../../../../contexts/personalProfile/personal';
import { useConnectUser } from '../../../../../contexts/ConnectUser/connectUserProvider';

import DefaultPersonalDark from "../../../../assets/personalDark.png"
import DefaultPersonalLight from "../../../../assets/personalLight.png"

const VerifiedBadge: React.FC = () => {
    return (
        <VerifiedBadgeContainer>
            <StyledLogo src={VerifiedIcon} alt="Logo" />
        </VerifiedBadgeContainer>
    )
}

const ProfileBody: React.FC = () => {
    const { personalProfile } = usePersonalContext();
    const { user } = useConnectUser();
    const { isDarkMode } = useDarkMode();

    const hasProfilePhoto = Boolean(personalProfile?.profilePhoto);

    return (
        <ProfileInfoContainer>
            <Top>
                <UserPhotoContainer>
                    <UserPhotoWrapper>
                        <Border>
                            <InnerBorder $isDarkMode={isDarkMode}>
                                <Story src={hasProfilePhoto ? personalProfile?.profilePhoto : isDarkMode ? DefaultPersonalDark : DefaultPersonalLight} />
                            </InnerBorder>
                            <AddOrEditPhotoBar $isDarkMode={isDarkMode} $hasProfilePhoto={hasProfilePhoto}>
                                <Wrapper>
                                    <Text size={"1.1rem"} fontWeight={"400"} variant="transparent">
                                        {hasProfilePhoto ? "Change your profile picture" : "Add your profile picture"}
                                    </Text>
                                </Wrapper>
                            </AddOrEditPhotoBar>
                        </Border>
                        <AddBorder $isDarkMode={isDarkMode}>
                            <AddIcon src={isDarkMode ? AddStoryDark : AddStoryLight} />
                        </AddBorder>
                    </UserPhotoWrapper>
                </UserPhotoContainer>
                <UserInfo>
                    <FullNameContainer>
                        <Text size={"1.7rem"} fontWeight={"300"}>
                            {user?.fullName}
                        </Text>
                        {user?.isVerified ? <VerifiedBadge /> : <></>}
                        <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                            {user?.pronouns}
                        </Text>
                    </FullNameContainer>
                    <UserName>
                        <Text size={"1.2rem"} fontWeight={"300"} variant={"transparent"}>
                            @{user?.username}
                        </Text>
                    </UserName>
                </UserInfo>
                <ProfileTypeContainer>
                    <OptionIconContainer>
                        <OptionIcon src={isDarkMode ? OptionDark : OptionLight} />
                    </OptionIconContainer>
                    <TextContainer>
                        <Text size={"2rem"} fontWeight={"300"} variant={"personal"}>
                            Personal
                        </Text>
                    </TextContainer>
                </ProfileTypeContainer>
            </Top>
            <Bottom>
                <UserNameBioContainer>
                    <PostFollowInfo>
                        <DataContainer>
                            <FollowersButton>
                                <Text variant={"normal"} size={"1.2rem"} fontWeight={"300"}>
                                    {personalProfile?.followers.length} Followers
                                </Text>
                            </FollowersButton>
                        </DataContainer>
                        <DataContainer>
                            <FollowingButton>
                                <Text variant={"normal"} size={"1.2rem"} fontWeight={"300"}>
                                    {personalProfile?.following.length} Following
                                </Text>
                            </FollowingButton>
                        </DataContainer>
                    </PostFollowInfo>
                    {personalProfile?.bio ? (
                        <BioContainer>
                            <Text size={"1.1rem"} fontWeight={"300"} variant={"transparent"}>
                                {personalProfile?.bio}
                            </Text>
                        </BioContainer>
                    ) : (
                        <AddBioButtonWrapper>
                            <AddBioButton>
                                <Text size={"1.1rem"} fontWeight={"300"} variant={"transparent"}>
                                    Add your bio
                                </Text>
                                <EditIcon src={isDarkMode ? EditDark : EditLight} />
                            </AddBioButton>
                        </AddBioButtonWrapper>
                    )}
                </UserNameBioContainer>
            </Bottom>
        </ProfileInfoContainer>
    );
};

export default ProfileBody;

const Wrapper = styled.div`
    width: 70%;
`;

const AddOrEditPhotoBar = styled.div<{ $isDarkMode: boolean; $hasProfilePhoto: boolean }>`
    z-index: 2;
    width: 12rem;
    height: 6rem;
    position: absolute;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(60, 60, 60, 0.819)' : 'rgba(179, 179, 179, 0.708)'};
    border-bottom-left-radius: 6rem;
    border-bottom-right-radius: 6rem;
    opacity: ${({ $hasProfilePhoto }) => $hasProfilePhoto ? 0 : 1}; // Always visible if no profile photo
    transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        opacity: 1;
        transform: scale(1.02);
    }
    &:active {
        transform: scale(1.01);
    }
`;

const EditIcon = styled.img`
    width: 1rem;
    opacity: 0.7;
`;

const AddBioButtonWrapper = styled.div`
    display: flex;
`;

const AddBioButton = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items:flex-start;
    cursor: pointer;
    &:hover {
        transform: scale(1.02);
    }
    &:active {
        transform: scale(0.97);
    }
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const TextContainer = styled.div`
    flex: 2;
`;

const OptionIconContainer = styled.div`
    flex: 1;
    height: 100%;
    width: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
`;

const OptionIcon = styled.img`
    width: 1.7rem;
    height: 1.7rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.10);
    }
    &:active {
        transform: scale(1.00);
    }
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const ProfileTypeContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;  
`;

const UserName = styled.div`
    display: flex;
`;

const BioContainer = styled.div``;

const StyledLogo = styled.img`
    width: 1.6rem;
    height: 1.6rem;
`;

const VerifiedBadgeContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const FullNameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    gap: 0.3rem;
`;

const UserInfo = styled.div`
    flex: 2;
    display: Flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`;

const UserNameBioContainer = styled.div`
    display: flex;
    width: 95%;
    flex-direction: column;
    gap: 1rem;
`;

const AddIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const AddBorder = styled.div<{ $isDarkMode: boolean }>`
  z-index: 2;
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
`;

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
`;

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
`;

const DataContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileInfoContainer = styled.div`
    display: flex;
    width: 95%;
    flex-direction: column;
    margin-top: 8%;
`;

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`;

const UserPhotoContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PostFollowInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
`;

const UserPhotoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Border = styled.div`
  background: linear-gradient(to right, #662D8C, #ED1E79);
  padding: 1.8px;
  border-radius: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  z-index: 1;
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
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.99);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;
