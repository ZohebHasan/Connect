import React, { useState } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

import AddStoryDark from "../../../../assets/addStoryDark.png";
import AddStoryLight from "../../../../assets/addStoryLight.png";


import EditLight from "../../../../assets/editLightPencil.png"
import EditDark from "../../../../assets/editDarkPencil.png"

import VerifiedIcon from "../../../../assets/verified.png"

import DefaultSchoolDark from "../../../../assets/schoolUserDark.png";
import DefaultSchoolLight from "../../../../assets/schoolUserLight.png";

import DefaultOrgIconDark from "../../../../assets/orgIconDark.png"
import DefaultOrgIconLight from "../../../../assets/orgIconLight.png"

import OptionLight from "../../../../assets/storyOptionsLight.png";
import OptionDark from "../../../../assets/storyOptionsDark.png";

import { useConnectUser } from '../../../../../contexts/ConnectUser/connectUserProvider';
import { useSchoolProfile } from '../../../../../contexts/schoolProfile/school';

const VerifiedBadge: React.FC<{ type: 'org' | 'user' }> = ({ type }) => {

    return (
        <>
            <VerifiedBadgeContainer>
                <StyledLogo src={VerifiedIcon} alt="Logo" $type={type} />
            </VerifiedBadgeContainer>
        </>
    )

}

const ProfileBody: React.FC = () => {

    const { isDarkMode } = useDarkMode();
    const { user } = useConnectUser();
    const { schoolProfile } = useSchoolProfile();

    const hasProfilePhoto = Boolean(schoolProfile?.profilePhoto);
    const renderAdditionalInfo = () => {
        switch (schoolProfile?.userType) {
            case 'Student':
                return (
                    <>
                        <Profession>
                            <Text size={"1.2rem"} fontWeight={"300"} variant={"normal"}>
                                {schoolProfile?.userType}
                            </Text>
                            <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                •
                            </Text>
                            {schoolProfile?.studentData?.major ? (
                                <Text size={"1.2rem"} fontWeight={"300"} variant={"normal"}>
                                    {schoolProfile?.studentData?.major}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1.2rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your major
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Profession>
                        <Location>
                            {schoolProfile?.studentData?.degree ? (
                                <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                    {schoolProfile?.studentData?.degree}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your degree level
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}

                            <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                                •
                            </Text>
                            {schoolProfile?.studentData?.year ? (
                                <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                    {schoolProfile?.studentData?.year}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your class standing
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Location>
                    </>
                );
            case 'Faculty':
                return (
                    <>
                        <Profession>
                            <Text size={"1.2rem"} fontWeight={"300"} variant={"normal"}>
                                {schoolProfile?.userType}
                            </Text>
                            <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                •
                            </Text>
                            {schoolProfile?.facultyData?.discipline ? (
                                <Text size={"1.2rem"} fontWeight={"300"} variant={"normal"}>
                                    {schoolProfile?.facultyData?.discipline}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1.2rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your discipline
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Profession>
                        <Location>
                            {schoolProfile?.facultyData?.position ? (
                                <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                    {schoolProfile?.facultyData?.position}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your position
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Location>
                        <Location>
                            {schoolProfile?.facultyData?.office ? (
                                <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                    {schoolProfile?.facultyData?.office}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your office
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Location>
                    </>
                );
            case 'Alumni':
                return (
                    <>
                        <Profession>
                            <Text size={"1.2rem"} fontWeight={"300"} variant={"normal"}>
                                {schoolProfile?.userType}
                            </Text>
                            <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                •
                            </Text>
                            {schoolProfile?.alumniData?.major ? (
                                <Text size={"1.2rem"} fontWeight={"300"} variant={"normal"}>
                                    {schoolProfile?.alumniData?.major}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1.2rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your major
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Profession>
                        <Location>
                            {schoolProfile?.alumniData?.graduationYear ? (
                                <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                    Year of {schoolProfile?.alumniData?.graduationYear}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your graduation year
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Location>
                    </>
                );
            case 'Staff':
                return (
                    <>
                        <Profession>
                            <Text size={"1.2rem"} fontWeight={"300"} variant={"normal"}>
                                {schoolProfile?.userType}
                            </Text>
                            <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                •
                            </Text>
                            {schoolProfile?.staffData?.department ? (
                                <Text size={"1.2rem"} fontWeight={"300"} variant={"normal"}>
                                    {schoolProfile?.staffData?.department}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1.2rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your department
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Profession>
                        <Location>
                            {schoolProfile?.staffData?.position ? (
                                <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                    {schoolProfile?.staffData?.position}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your position
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Location>
                        <Location>
                            {schoolProfile?.staffData?.office ? (
                                <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                    {schoolProfile?.staffData?.office}
                                </Text>
                            ) : (
                                <AddLocationWrapper>
                                    <AddLocationButton>
                                        <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your office
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"location"} />
                                    </AddLocationButton>
                                </AddLocationWrapper>
                            )}
                        </Location>
                    </>
                );
            default:
                return null;
        }
    };


    return (
        <>
            <ProfileInfoContainer>
                <Top>
                    <UserPhotoContainer>
                        <UserPhotoWrapper>
                            <Border>
                                <InnerBorder $isDarkMode={isDarkMode}>
                                    <Story src={hasProfilePhoto ? schoolProfile?.profilePhoto : isDarkMode ? DefaultSchoolDark : DefaultSchoolLight} />
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
                            {user?.isVerified ? <VerifiedBadge type='user' /> : <></>}
                            <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                {user?.pronouns}
                            </Text>
                            <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                •
                            </Text>
                            <UserName>
                                <Text size={"1rem"} fontWeight={"300"} variant={"transparent"}>
                                    @{user?.username}
                                </Text>
                            </UserName>
                        </FullNameContainer>
                        {renderAdditionalInfo()}
                    </UserInfo>
                    <ProfileTypeContainer>
                        <OptionIconContainer>
                            <OptionIcon src={isDarkMode ? OptionDark : OptionLight} />
                        </OptionIconContainer>
                        <TextContainer>
                            <Text size={"2rem"} fontWeight={"300"} variant={"school"}>
                                School
                            </Text>
                        </TextContainer>
                    </ProfileTypeContainer>
                </Top>

                <Bottom>
                    <BottomWrapper>
                        <UserNameBioContainer>
                            <PostFollowInfo>
                                <DataContainer>
                                    <FollowersButton>
                                        <Text variant={"normal"} size={"1.2rem"} fontWeight={"300"}>
                                            {schoolProfile?.followers.length} Followers
                                        </Text>
                                    </FollowersButton>
                                </DataContainer>

                                <DataContainer>
                                    <FollowingButton>
                                        <Text variant={"normal"} size={"1.2rem"} fontWeight={"300"}>
                                            {schoolProfile?.following.length} Following
                                        </Text>
                                    </FollowingButton>
                                </DataContainer>
                                <DataContainer>
                                    <FollowingButton>
                                        <Text variant={"normal"} size={"1.2rem"} fontWeight={"300"}>
                                            {schoolProfile?.courses?.length} Courses
                                        </Text>
                                    </FollowingButton>
                                </DataContainer>
                            </PostFollowInfo>

                            {schoolProfile?.bio ? (
                                <BioContainer>
                                    <Text size={"1.1rem"} fontWeight={"300"} variant={"transparent"}>
                                        {schoolProfile?.bio}
                                    </Text>
                                </BioContainer>
                            ) : (
                                <AddBioButtonWrapper>
                                    <AddBioButton>
                                        <Text size={"1.1rem"} fontWeight={"300"} variant={"transparent"}>
                                            Add your bio
                                        </Text>
                                        <EditIcon src={isDarkMode ? EditDark : EditLight} type={"bio"} />
                                    </AddBioButton>
                                </AddBioButtonWrapper>
                            )}
                        </UserNameBioContainer>
                        <UserInfoContainer>
                            <UserInfoWrapper>
                                <Info>
                                    <AssociationContent $clickable={!!schoolProfile?.campus.school}>
                                        <LogoContainer>
                                            <Logo src={schoolProfile?.campus.profilePhoto ? schoolProfile?.campus.profilePhoto : isDarkMode ? DefaultOrgIconDark : DefaultOrgIconLight} />
                                        </LogoContainer>
                                        <OrgName>
                                            <Text variant="normal" size="1.4rem" fontWeight="300">
                                                {schoolProfile?.campus.name}
                                            </Text>
                                            {schoolProfile?.campus.isVerified && <VerifiedBadge type='org' />}
                                        </OrgName>
                                    </AssociationContent>
                                </Info>

                            </UserInfoWrapper>
                        </UserInfoContainer>
                    </BottomWrapper>
                </Bottom>

            </ProfileInfoContainer>
        </>
    );
};

export default ProfileBody;

const AddLocationButton = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items:flex-start;
    cursor: pointer;
    &:hover {
        transform: scale(1.01);
    }
    &:active {
        transform: scale(0.98);
    }
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`

const AddLocationWrapper = styled.div`
    display: flex;
`

const getWidthByType = (type: 'location' | 'status' | 'bio' | 'schoolAndWork') => {
    switch (type) {
        case 'location':
            return '0.7rem';
        case 'status':
        case 'bio':
        case 'schoolAndWork':
            return '0.7rem'
        default:
            return '1rem';
    }
};

const EditIcon = styled.img<{ type: 'location' | 'status' | 'bio' | 'schoolAndWork' }>`
    width: ${(props) => getWidthByType(props.type)};
    height: auto;
    opacity: 0.7;
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

const AddBioButtonWrapper = styled.div`
    display: flex;
`;

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

const BottomWrapper = styled.div`
    width: 95%;
    display: flex;
    flex-direction:row;
`

const TextContainer = styled.div`
    flex: 2;
`

const OptionIconContainer = styled.div`
    flex: 1;
    /* background-color: red; */
    height: 100%;
    width: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
`

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
    /* background-color: blue; */
    height: 100%;
    width: 100%;  
`

const OrgName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const LogoContainer = styled.div``;

const Logo = styled.img`
  width: 3rem;
  height: auto;
  border-radius: 50%;
`;

const AssociationContent = styled.div<{ $clickable?: boolean; }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  
  ${({ $clickable }) =>
        $clickable &&
        `
    &:hover {
      opacity: 0.7;
      transform: scale(1.02);
    }
    &:active {
      transform: scale(1.00);
    }
  `}
  
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const DotIcon = styled.img`
    width: 1.3rem;
`

const Icon = styled.img<{ $type: 'education' | 'job' }>`
    width: ${(props) => (props.$type === 'job' ? '1.8rem' : '1.7rem')};
    margin-left: ${(props) => (props.$type === 'job' ? '0.5rem' : '0rem')};
`;

const UserInfoWrapper = styled.div`
    width: 70%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
`



const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.3rem;

    
`

const UserInfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    /* background-color: pink; */
`

const Location = styled.div`
    display: flex;
    gap: 0.3rem;
`

const Profession = styled.div`
    display: flex;
    gap: 0.3rem;
    align-items: center;
`


const UserName = styled.div`
    display: flex;
    
`

const BioContainer = styled.div`
    
`

const StyledLogo = styled.img<{ $type: 'org' | 'user' }>`
    width: ${(props) => (props.$type === 'user' ? '1.6rem' : '1.5rem')};
    height: auto;

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
  z-index: 2;
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
    flex-direction: row;
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
    margin-top: 8%;
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
  background: linear-gradient(to right, #EA8D8D, #A890FE);
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



