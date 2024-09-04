import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

// Define the loading animation
const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Create a mixin for the loading effect with dark mode support
const loadingEffect = css<{ $isDarkMode: boolean }>`
  background: ${({ $isDarkMode }) => $isDarkMode
    ? 'linear-gradient(90deg, #afafaf 0%, grey 50%, #bdbdbd 100%)'
    : 'linear-gradient(90deg, #3a3a3a 0%, grey 50%, #303030 100%)'};
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.5s ease-in-out infinite;
`;

const ProfileBody: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <>
            <ProfileInfoContainer>
                <Top>
                    <UserPhotoContainer>
                        <UserPhotoWrapper>
                            <Border $isDarkMode={isDarkMode} />
                        </UserPhotoWrapper>
                    </UserPhotoContainer>
                    <UserInfo>
                        <FullNameContainer>
                            <FullNameLoading $isDarkMode={isDarkMode} />
                            <UserNameLoading $isDarkMode={isDarkMode} />
                        </FullNameContainer>
                        <Profession>
                            <UserTypeLoading $isDarkMode={isDarkMode} />
                            <MajorDataLoading $isDarkMode={isDarkMode} />
                        </Profession>
                        <Location>
                            <DegreeLevelLoading $isDarkMode={isDarkMode} />
                            <ClassStandingLoading $isDarkMode={isDarkMode} />
                        </Location>
                    </UserInfo>
                    <ProfileTypeContainer>
                        <OptionIconContainer>
                            <OptionButtonLoading $isDarkMode={isDarkMode} />
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
                                    <FollowDataLoading $isDarkMode={isDarkMode} />
                                </DataContainer>

                                <DataContainer>
                                    <FollowDataLoading $isDarkMode={isDarkMode} />
                                </DataContainer>
                                <DataContainer>
                                    <FollowDataLoading $isDarkMode={isDarkMode} />
                                </DataContainer>
                            </PostFollowInfo>
                            <BioLoading $isDarkMode={isDarkMode} />
                        </UserNameBioContainer>
                        <UserInfoContainer>
                            <UserInfoWrapper>
                                <Info>
                                    <AssociationContent >
                                        <LogoContainer>
                                            <CampusLogoLoading $isDarkMode={isDarkMode} />
                                        </LogoContainer>
                                        <OrgName>
                                            <CampusNameLoading $isDarkMode={isDarkMode} />
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

// Define all the styled components with the loading effect applied
const CampusNameLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    width: 17rem;
    height: 1.5rem;
    background-color: grey;
    border-radius: 15px;
    ${loadingEffect}
`;

const CampusLogoLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    background-color: grey;
    ${loadingEffect}
`;

const BioLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    width: 20rem;
    height: 1.5rem;
    background-color: grey;
    border-radius: 15px;
    ${loadingEffect}
`;

const FollowDataLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    width: 7rem;
    height: 1.8rem;
    border-radius: 15px;
    background-color: grey;
    ${loadingEffect}
`;

const OptionButtonLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    width: 0.5rem;
    height: 2rem;
    background-color: grey;
    border-radius: 15px;
    margin-right: 0.5rem;
    ${loadingEffect}
`;

const ClassStandingLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    width: 9rem;
    background-color: grey;
    height: 1.3rem;
    border-radius: 15px;
    ${loadingEffect}
`;

const DegreeLevelLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    width: 13rem;
    height: 1.3rem;
    border-radius: 15px;
    background-color: grey;
    ${loadingEffect}
`;

const MajorDataLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    background-color: grey;
    width: 8rem;
    height: 1.3rem;
    border-radius: 15px;
    ${loadingEffect}
`;

const UserTypeLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    width: 6rem;
    background-color: grey;
    height: 1.3rem;
    border-radius: 15px;
    ${loadingEffect}
`;

const UserNameLoading = styled.div<{ $isDarkMode: boolean }>`
    opacity: 0.4;
    width: 9rem;
    background-color: grey;
    height: 1.5rem;
    border-radius: 15px;
    ${loadingEffect}
`;

const FullNameLoading = styled.div<{ $isDarkMode: boolean }>`
     opacity: 0.4;
    width: 12rem;
    height: 2rem;
    border-radius: 15px;
    background-color:grey;
    ${loadingEffect}
`;

const BottomWrapper = styled.div`
    width: 95%;
    display: flex;
    flex-direction:row;
`

const TextContainer = styled.div`
    opacity: 0.4;
    flex: 2;
`

const OptionIconContainer = styled.div`
    flex: 1;
    height: 100%;
    width: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
`

const ProfileTypeContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;  
`

const OrgName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const LogoContainer = styled.div``;

const AssociationContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
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
`

const Location = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: 0.3rem;
`

const Profession = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-top: 0.4rem;
`

const FullNameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    gap: 0.5rem;
`

const UserInfo = styled.div`
    flex: 2;
    display: Flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`

const UserNameBioContainer = styled.div`
    display: flex;
    width: 95%;
    flex-direction: column;
    gap: 1rem;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const DataContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ProfileInfoContainer = styled.div`
    display: flex;
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
`

const UserPhotoContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const PostFollowInfo = styled.div`
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
`

const Border = styled.div<{ $isDarkMode: boolean }>` 
  opacity: 0.4;
  padding: 1.8px;
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'grey' : '#d3d3d3'};
  ${loadingEffect}
`;