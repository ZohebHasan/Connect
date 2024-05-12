import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

import Text from '../../../ConnectUI_web/common/texts/static';


type ProfileType = 'professional' | 'personal' | 'school';

interface TopProps {
    selectedProfile: {
      professional: boolean;
      personal: boolean;
      school: boolean;
    };
    handleSelected: (profileType: ProfileType) => void; 
}

const Profiles: React.FC<TopProps> = ({ selectedProfile, handleSelected }) => {
    const {isDarkMode} = useDarkMode();

    return(
            <>
                <ProfessionalContainer
                        $isDarkMode = {isDarkMode}
                        isSelected={selectedProfile.professional}
                        onClick={() => handleSelected('professional')}
                        
                        >
                    <TitleContainer>
                        <Text variant = {"professional"} size = {"2.1em"} fontWeight= {"300"}> 
                            Professional 
                        </Text>
                    </TitleContainer>
                    <DescriptionContainer>
                        <DescriptionWrapper>
                        <TextWrapper>
                            <Text variant={"transparent"} size={"1.1em"} fontWeight={"200"}>
                                Connect to your community on a professional level in just a second.
                            </Text>
                        </TextWrapper>
                        <TextWrapper>
                            <Text variant={"transparent"} size={"1.1em"} fontWeight={"200"}>
                                Post & Find Jobs in every industry, Faster than ever.
                            </Text>
                        </TextWrapper>
                        <TextWrapper>
                            <Text variant={"transparent"} size={"1.1em"} fontWeight={"200"}>
                                Share your research, skills, achievements, and experiences globally.
                            </Text>
                        </TextWrapper>


                        </DescriptionWrapper>
                    </DescriptionContainer>               
                </ProfessionalContainer>


                <PersonalContainer
                        $isDarkMode = {isDarkMode}
                        isSelected={selectedProfile.personal}
                        onClick={() => handleSelected('personal')}
                        > 
                    <TitleContainer>
                        <Text variant = {"personal"} size = {"3em"} fontWeight= {"350"}> 
                            Personal
                        </Text>
                    </TitleContainer>
                    <DescriptionContainer>
                        <DescriptionWrapper>   
                        <TextWrapper>
                            <Text variant={"transparent"} size={"1.1em"} fontWeight={"200"}>
                                Connect to your community on a personal level, in just a second.
                            </Text>
                        </TextWrapper>
                        <TextWrapper>
                            <Text variant={"transparent"} size={"1.1em"} fontWeight={"200"}>
                                Post and share photos, clips and chirps with your community.
                            </Text>
                        </TextWrapper>
                        <TextWrapper>
                            <Text variant={"transparent"} size={"1.1em"} fontWeight={"200"}>
                                Customize your feed, see more contents you love and less of what you don't.
                            </Text>
                        </TextWrapper>
                   
                        </DescriptionWrapper>
                    </DescriptionContainer>
                </PersonalContainer>


                <SchoolContainer 
                    $isDarkMode = {isDarkMode}
                    isSelected={selectedProfile.school}
                    onClick={() => handleSelected('school')}
                    > 
                    <TitleContainer>
                        <Text variant = {"school"} size = {"2.1em"} fontWeight= {"300"}> 
                            School
                        </Text>
                    </TitleContainer>
                    <DescriptionContainer>
                        <DescriptionWrapper>
                            <TextWrapper>
                                <Text variant = {"transparent"} size = {"1.1em"} fontWeight= {"200"}> 
                                    Connect to your school community on an academic level. 
                                </Text>
                            </TextWrapper>
                            <TextWrapper>
                                <Text variant = {"transparent"} size = {"1.1em"} fontWeight= {"200"}> 
                                    Join and create individual class and club forums.
                                </Text>
                            </TextWrapper>
                            <TextWrapper>
                                <Text variant = {"transparent"} size = {"1.1em"} fontWeight= {"200"}> 
                                    Share your courses, connect with people from a different major. 
                                </Text>
                            </TextWrapper>
                            
                        </DescriptionWrapper>
                    </DescriptionContainer>
                </SchoolContainer>
             </>
    );
  }

export default Profiles;


const TitleContainer = styled.div`
  display: flex;
  flex:1;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const DescriptionContainer = styled.div`
    display: flex;
    flex: 2.5;
    // flex-direction: column;
    align-items: center;
    justify-content:center;
    width: 100%;
`

const DescriptionWrapper = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15%;
`
const TextWrapper = styled.div`
  diplay: flex:
  justify-content:flex-start;
  width:100%;
`

const CommonStyle = styled.div <{$isDarkMode: boolean}>`
    display: flex; 
    flex-direction: column;
    // gap: 10%;
    align-items: center;
    justify-content: center;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(156, 156, 156, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
    color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
    border-radius: 15px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out, background-color 0.3s ease;
    &:hover {
        transform: scale(1.05);
      }
      &:active {
        transform: scale(1.00);
      }
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background-color 0.3s ease, border 0.3s ease; // Added border transition
`


const ProfessionalContainer = styled(CommonStyle)<{$isDarkMode: boolean, isSelected: boolean}>`
    width: 100%;
    height: 70%;

    border: ${({ isSelected, $isDarkMode }) => 
            isSelected ? `3px solid ${$isDarkMode ? '#519fd2' : '#68c3ff'}` 
                       : `0.1px solid ${$isDarkMode ? '#519fd2' : '#68c3ff'}`};
    border-top: ${({ isSelected, $isDarkMode }) => 
            isSelected ? `17px solid ${$isDarkMode ? '#519fd2' : '#68c3ff'}` 
                       : `0.1px solid ${$isDarkMode ? '#519fd2' : '#68c3ff'}`};
    border-radius: ${({ isSelected }) => 
            isSelected ? '30px 30px 15px 15px' 
                       : '15px'};
`;


const PersonalContainer = styled(CommonStyle)<{$isDarkMode: boolean, isSelected: boolean}>`
    width: 100%;
    height: 90%;


    border: ${({ isSelected, $isDarkMode }) => 
        isSelected ? `3px solid ${$isDarkMode ? '#da74c9' : '#fc6dbc'}` 
                : `0.1px solid ${$isDarkMode ? '#da74c9' : '#fc6dbc'}`};
    border-top: ${({ isSelected, $isDarkMode }) => 
        isSelected ? `17px solid ${$isDarkMode ? '#da74c9' : '#fc6dbc'}` 
                : `0.1px solid ${$isDarkMode ? '#da74c9' : '#fc6dbc'}`};
    border-radius: ${({ isSelected }) => 
        isSelected ? '30px 30px 15px 15px' 
                : '15px'};
`

const SchoolContainer = styled(CommonStyle)<{$isDarkMode: boolean, isSelected: boolean}>`
    width: 100%;
    height: 70%;

    border: ${({ isSelected, $isDarkMode }) => 
        isSelected ? `3px solid ${$isDarkMode ? '#b89ae3' : '#a075dd'}` 
                : `0.1px solid ${$isDarkMode ? '#b89ae3' : '#a075dd'}`};
    border-top: ${({ isSelected, $isDarkMode }) => 
        isSelected ? `17px solid ${$isDarkMode ? '#b89ae3' : '#a075dd'}` 
                : `0.1px solid ${$isDarkMode ? '#b89ae3' : '#a075dd'}`};
    border-radius: ${({ isSelected }) => 
        isSelected ? '30px 30px 15px 15px' 
                : '15px'};
    
`

