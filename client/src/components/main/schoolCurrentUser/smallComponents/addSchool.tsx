import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useSchoolProfile } from '../../../../contexts/schoolProfile/school';

import Text from '../../../ConnectUI_web/common/texts/static';
import LeftToRightText from '../../../ConnectUI_web/common/texts/animated/leftToRight';
import SearchCampusInput from './searchCampus/searchSchoolBox';

import DefaultOrgIconDark from "../../../assets/orgIconDark.png"
import DefaultOrgIconLight from "../../../assets/orgIconLight.png"

import Button from '../../../ConnectUI_web/common/buttons/button1';

const AddSchoolData: React.FC = () => {
    return (
        <SearchSchoolComponent />
    );
};

export default AddSchoolData;



const DisplayErrorMessages = () => {
    const {  universityError, connectionError} = useSchoolProfile();

  
    let errorMessage = null;
  
    if (universityError) {
      errorMessage = <ErrorMessage>Please select your university</ErrorMessage>;
    }
    else if (connectionError) {
      errorMessage = <ErrorMessage>Something went wrong, please try again</ErrorMessage>;
    }
   
  
    return (
      <>
        {errorMessage}
      </>
    );
}

const SearchSchoolComponent: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const [searchText, setSearchText] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const { handleUniversitySelection, handleUniversityNameChange, universityName , submitUniversity, universityError, connectionError} = useSchoolProfile();

    // Dummy list of universities
    const universities = [
        'Stanford University',
        'St. Johns University'
    ];

    const filteredUniversities = universities.filter(uni =>
        uni.toLowerCase().startsWith(searchText.toLowerCase()) // Sequential filtering logic
    );

    const handleSearchTextChange = (value: string) => {
        setSearchText(value);
        handleUniversityNameChange(value);
        setShowSearchResults(value.length > 0);
    };

    const handleUniversityClick = (universityName: string) => {
        setSearchText(universityName);
        setShowSearchResults(false);
    };

    return (
        <>
            <SearchCampusContainer>
                <HeaderContainer>
                    <ActionText>
                        <Text size={"2.7rem"} fontWeight={"300"} variant={"transparent"}>
                            Actions required
                        </Text>
                    </ActionText>
                    <SchoolText>
                        <Text size={"2.7rem"} fontWeight={"300"} variant={"school"}>
                            School
                        </Text>
                    </SchoolText>
                </HeaderContainer>
                <BodyContainer>
                    <TitleContainer>
                        <Text size={"1.2rem"} fontWeight={"200"} variant={"normal"}>
                            To ensure data safety for our young students, Connect requires users to verify their school credentials to activate their school profile.
                        </Text>
                    </TitleContainer>
                    <SearchBoxContainer>
                        <SearchTitle>
                            <LeftToRightText size="1.3rem">
                                Please select your university
                            </LeftToRightText>
                        </SearchTitle>
                        <SearchBox>
                            <SearchCampusInput
                                id="search_in_course"
                                label={"Search University here"}
                                value={searchText}
                                onChange={handleSearchTextChange}
                                width="100%"
                                isSearchBox={true}
                            />
                        </SearchBox>
                    </SearchBoxContainer>
                </BodyContainer>
                {showSearchResults && (
                    <SearchResults $isDarkMode={isDarkMode}>
                        <UniversityListContainer>
                            {filteredUniversities.length > 0 ? (
                                filteredUniversities.map((uni) => (
                                    <UniversityItem
                                        key={uni}
                                        $isDarkMode={isDarkMode}
                                        onClick={() => handleUniversityClick(uni)}
                                    >
                                        <LogoContainer>
                                            <Logo src={isDarkMode ? DefaultOrgIconDark : DefaultOrgIconLight} $type = {"searchBox"}/>
                                        </LogoContainer>
                                        <OrgName>
                                            <Text variant="normal" size="1.2rem" fontWeight="300">
                                                {uni}
                                            </Text>
                                        </OrgName>
                                    </UniversityItem>
                                ))
                            ) : (
                                <UniversityItem
                                    $isDarkMode={isDarkMode}
                                    onClick={() => handleUniversityClick(searchText)}
                                >
                                    <LogoContainer>
                                        <Logo src={isDarkMode ? DefaultOrgIconDark : DefaultOrgIconLight} $type = {"searchBox"}/>
                                    </LogoContainer>
                                    <OrgName>
                                        <Text variant="normal" size="1.2rem" fontWeight="300">
                                            Add "{universityName}"
                                        </Text>
                                    </OrgName>
                                </UniversityItem>
                            )}
                        </UniversityListContainer>
                    </SearchResults>
                )}
                {universityName &&
                    <>
                        <SelectedUniversityContainer>
                            <Text size={"1.5rem"} fontWeight={"200"} variant={"normal"}>
                                Selected University:
                            </Text>
                            <UniversityContainer>
                                <LogoContainer>
                                    <Logo src={isDarkMode ? DefaultOrgIconDark : DefaultOrgIconLight} $type = {"display"}/>
                                </LogoContainer>
                                <OrgName>
                                    <Text variant="normal" size="1.8rem" fontWeight="300">
                                        {universityName}
                                    </Text>
                                </OrgName>
                            </UniversityContainer>

                        </SelectedUniversityContainer>
                    </>
                }
                 <DisplayErrorMessages />
                <BottomContainer>
                    <NextButtonContainer>
                        <NextButton $isDarkMode={isDarkMode} onClick={submitUniversity}>
                            <Text size={"1.2rem"} fontWeight={"200"} variant={"normal"}>
                               Confirm
                            </Text>
                        </NextButton>
                    </NextButtonContainer>
                </BottomContainer>
            </SearchCampusContainer>
        </>
    );
}

const LogoContainer = styled.div``;


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


const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    animation: ${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both; 
`

const UniversityContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
`

const SelectedUniversityContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 2%;
`

const OrgName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const Logo = styled.img<{ $type: 'display' | 'searchBox' }>`
  width: ${({ $type }) => ($type === 'searchBox' ? '2rem' : '3rem')};
  height: auto;
  border-radius: 50%;
`;

const UniversityItem = styled.div<{ $isDarkMode: boolean }>`
    padding: 8px 18px; 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.7rem;
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease; 
    background-color: transparent;

    &:hover, &:focus {
    background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(226, 226, 226, 0.3)' : 'rgba(226, 226, 226, 0.6)'}; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
    }

    &:active {
    background-color: #e0e0e0; 
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); 
    transform: translateY(1px); 
    }
`

const UniversityListContainer = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }
`

const BaseButton = styled.div<{ $isDarkMode: boolean }>`
    border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff73' : 'black')}; 
    padding: 0.4rem 0.8rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    cursor: pointer;

    background-color: #ffffff2b;
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.2s ease-in-out, opacity 0.3s ease-in-out;

    &:hover {
        color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#565454' : '#a0a0a0'}; 
        opacity: 0.8;
        transform: scale(1.02); 
    }

    &:active {
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#919191' : '#595858'};
        transform: scale(1.00);
    }
`;

const SearchResults = styled.div<{ $isDarkMode: boolean }>`
    position: absolute;
    width: 80%;
    height: 30%;
    bottom: 12.5%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgb(49, 49, 49)' : 'rgb(222, 222, 222)'};
    color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
    padding: 10px;
`

const NextButton = styled(BaseButton)`
     width: 50%;
`;

const NextButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 8%;
`

const SearchBox = styled.div`
    margin-top: 2%;
`
const SearchTitle = styled.div``

const SearchBoxContainer = styled.div`
    margin-top: 3%;
`

const TitleContainer = styled.div`
    display: flex;
`

const BodyContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 5%;
    flex-direction: column;
`

const SchoolText = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const ActionText = styled.div`
    flex: 1;
`

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const SearchCampusContainer = styled.div`
    margin-top: 8%;
    width: 85%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
