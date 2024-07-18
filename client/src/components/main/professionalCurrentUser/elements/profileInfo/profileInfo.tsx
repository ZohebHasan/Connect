import React, { useState } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

import AddStoryDark from "../../../../assets/addStoryDark.png";
import AddStoryLight from "../../../../assets/addStoryLight.png";


import JobIconDark from '../../../../assets/jobDark.png';
import JobIconLight from '../../../../assets/jobLight.png';

import EducationIconDark from '../../../../assets/educationDark.png';
import EducationIconLight from '../../../../assets/educationLight.png';

import DotIconDark from '../../../../assets/dotDark.png';
import DotIconLight from '../../../../assets/dotLight.png';

import VerifiedIcon from "../../../../assets/verified.png"


import DummyCompany from "../../../dummies/Connect.jpg"
import DummyProfessional from "../../../dummies/professional.jpeg"

import OptionLight from "../../../../assets/storyOptionsLight.png";
import OptionDark from "../../../../assets/storyOptionsDark.png";

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
    const isVerified: boolean = true;
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
                            {isVerified ? <VerifiedBadge type='user' /> : <></>}
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
                        <OptionIconContainer>
                            <OptionIcon src={isDarkMode ? OptionDark : OptionLight} />
                        </OptionIconContainer>
                        <TextContainer>
                            <Text size={"2rem"} fontWeight={"300"} variant={"professional"}>
                                Professional
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
                                <DataContainer>
                                    <FollowingButton>
                                        <Text variant={"normal"} size={"1.2rem"} fontWeight={"300"}>
                                            234 Recommendations
                                        </Text>
                                    </FollowingButton>
                                </DataContainer>
                            </PostFollowInfo>

                            <BioContainer>
                                <Text size={"1.1rem"} fontWeight={"300"} variant={"transparent"}>
                                    Trying to do better things everyday, every way.
                                </Text>
                            </BioContainer>
                        </UserNameBioContainer>
                        <UserInfoContainer>
                            <UserInfoWrapper>
                                <Info>
                                    <Icon src={isDarkMode ? EducationIconDark : EducationIconLight} $type={'education'} />
                                    <DotIcon src={isDarkMode ? DotIconDark : DotIconLight} />
                                    <AssociationContent  >
                                        <LogoContainer>
                                            <Logo src={DummyCompany} />
                                        </LogoContainer>
                                        <OrgName>
                                            <Text variant="normal" size="0.9rem" fontWeight="400">
                                                Stony Brook University
                                            </Text>
                                            {isVerified && <VerifiedBadge type='org' />}
                                        </OrgName>
                                    </AssociationContent>

                                </Info>

                                <Info>
                                    <Icon src={isDarkMode ? JobIconDark : JobIconLight} $type={'job'} />
                                    <DotIcon src={isDarkMode ? DotIconDark : DotIconLight} />
                                    <AssociationContent  >
                                        <LogoContainer>
                                            <Logo src={DummyCompany} />
                                        </LogoContainer>
                                        <OrgName>
                                            <Text variant="normal" size="0.9rem" fontWeight="400">
                                                Connect
                                            </Text>
                                            {isVerified && <VerifiedBadge type='org' />}
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

const BottomWrapper = styled.div`
    width: 95%;
    display: flex;
    flex-direction:row;
`

const OrgName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const LogoContainer = styled.div``;

const Logo = styled.img`
  width: 1.7rem;
  height: auto;
  border-radius: 50%;
`;

const AssociationContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
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

const DotIcon = styled.img`
    width: 1.3rem;
`

const Icon = styled.img<{ $type: 'education' | 'job' }>`
    width: ${(props) => (props.$type === 'job' ? '1.4rem' : '1.7rem')};
    margin-left: ${(props) => (props.$type === 'job' ? '0.2rem' : '0rem')};
`;

const UserInfoWrapper = styled.div`
    width: 55%;
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
`

const Profession = styled.div`
    display: flex;
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

const UserName = styled.div`
    display: flex;
    
`

const BioContainer = styled.div`
    
`

const StyledLogo = styled.img<{ $type: 'org' | 'user' }>`
    width: ${(props) => (props.$type === 'user' ? '1.6rem' : '1.2rem')};
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

    width: 100%;
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



