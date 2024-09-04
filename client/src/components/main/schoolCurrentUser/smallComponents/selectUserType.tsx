import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useSchoolProfile } from '../../../../contexts/schoolProfile/school';

import Text from '../../../ConnectUI_web/common/texts/static';
import LeftToRightText from '../../../ConnectUI_web/common/texts/animated/leftToRight';
import SearchCampusInput from './searchCampus/searchSchoolBox';

import DefaultOrgIconDark from "../../../assets/orgIconDark.png";
import DefaultOrgIconLight from "../../../assets/orgIconLight.png";

import VerifiedIcon from "../../../assets/verified.png";

import LeftDark from "../../../assets/leftDarkArrow.png";
import LeftLight from "../../../assets/leftLightArrow.png";

import Button from '../../../ConnectUI_web/common/buttons/button1';

const AddSchoolData: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <SearchSchoolComponent />
    );
};

export default AddSchoolData;

const DisplayErrorMessages = () => {
    const {connectionError } = useSchoolProfile();


    let errorMessage = null;

    if (connectionError) {
        errorMessage = <ErrorMessage>Something went wrong, please reload and try again</ErrorMessage>;
    }
    return (
        <>
            {errorMessage}
        </>
    );
}

const VerifiedBadge: React.FC<{ type: 'org' | 'user' }> = ({ type }) => {
    return (
        <VerifiedBadgeContainer>
            <StyledLogo src={VerifiedIcon} alt="Logo" $type={type} />
        </VerifiedBadgeContainer>
    );
};

const VerifiedBadgeContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const StyledLogo = styled.img<{ $type: 'org' | 'user' }>`
    width: ${(props) => (props.$type === 'user' ? '1.6rem' : '1.5rem')};
    height: auto;
`;

const SearchSchoolComponent: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const {handleEmailSetFalse,  handleUniversityEmailDelete, schoolProfile, userType, handleUserTypeChange, handleUserTypeSubmission, universityName, connectionError } = useSchoolProfile();

    const isVerified = true;

    const userTypes: Array<'Student' | 'Faculty' | 'Alumni' | 'Staff'> = ['Student', 'Faculty', 'Alumni', 'Staff'];

    const handleUserTypeClick = (selectedUserType: 'Student' | 'Faculty' | 'Alumni' | 'Staff') => {
        handleUserTypeChange(selectedUserType);
    };

    const handleSubmission = () => {
        if(userType !== '') {
            handleUserTypeSubmission();
        }
    }

    return (
        <SearchCampusContainer>
            <BackButtonContainer>
                <Wrapper onClick={handleUniversityEmailDelete}>
                    <LeftIcon src={isDarkMode ? LeftDark : LeftLight} />
                    <Text variant={"normal"}
                        size={"1.4rem"}
                        fontWeight={"300"}
                    >
                        Change my school email
                    </Text>
                </Wrapper>
            </BackButtonContainer>
            <HeaderContainer>
                <ActionText>
                    <Text size={"2.7rem"} fontWeight={"300"} variant={"transparent"}>
                        Almost there!
                    </Text>
                </ActionText>
                <SchoolText>
                    <Text size={"2.7rem"} fontWeight={"300"} variant={"school"}>
                        School
                    </Text>
                </SchoolText>
            </HeaderContainer>
            <SchoolContainer>
                <SchoolWrapper>
                    <LogoContainer>
                        <Logo src={isDarkMode ? DefaultOrgIconDark : DefaultOrgIconLight} />
                    </LogoContainer>
                    <OrgName>
                        <Text variant="normal" size="1.5rem" fontWeight="300">
                            {universityName ? universityName : schoolProfile?.campus.name}
                        </Text>
                        {isVerified && <VerifiedBadge type='org' />}
                    </OrgName>
                </SchoolWrapper>
            </SchoolContainer>
            <BodyContainer>
                <TitleContainer>
                    <LeftToRightText size="1.3rem">
                        Please select the user type
                    </LeftToRightText>
                </TitleContainer>
                <SearchBoxContainer>
                    <SearchTitle>
                        <Text size={"1.2rem"} fontWeight={"200"} variant={"normal"}>
                            I am a...
                        </Text>
                    </SearchTitle>
                    <UserTypeButtons>
                        {userTypes.map((userTypeOption) => (
                            <UserTypeContainer
                                key={userTypeOption}
                                $isDarkMode={isDarkMode}
                                $isActive={userType === userTypeOption}
                                onClick={() => handleUserTypeClick(userTypeOption)}
                            >
                                <Text size={"1.2rem"} fontWeight={"200"} variant={"normal"}>
                                    {userTypeOption}
                                </Text>
                            </UserTypeContainer>
                        ))}
                    </UserTypeButtons>
                </SearchBoxContainer>
            </BodyContainer>
            <DisplayErrorMessages/>
            <BottomContainer>
                <NextButtonContainer>
                    <NextButton $isDarkMode={isDarkMode} onClick={handleSubmission}  $isDisabled={userType === ''}>
                        <Text size={"1.2rem"} fontWeight={"200"} variant={"normal"}>
                            Confirm
                        </Text>
                    </NextButton>
                </NextButtonContainer>
            </BottomContainer>
        </SearchCampusContainer>
    );
};

const SearchTitle = styled.div``;


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
    margin-top: 1rem;
    color: red;
    font-size: 14px;
    animation: ${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both; 
    /* background-color: red;; */
`

const UserTypeButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 3rem;
    margin-top: 2%;
`;

const UserTypeContainer = styled.div<{ $isDarkMode: boolean, $isActive: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border: 1px solid ${({ $isDarkMode, $isActive }) => ($isActive ? '#a260e8' : ($isDarkMode ? 'white' : 'black'))};
    padding: 1rem 0rem;
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
    background-color: ${({ $isDarkMode, $isActive }) =>
        $isActive ? ($isDarkMode ? '#565454' : '#d0d0d0') : 'transparent'};    
    transition: transform 0.2s ease-in-out, background-color 0.3s ease, border 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        background-color: ${({ $isDarkMode }) => $isDarkMode ? '#444444' : '#d0d0d0'};
    }

    &:active {
        transform: scale(1.00);
    }
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;

    &:hover {
        opacity: 0.7;
        transform: scale(1.03);
    }

    &:active {
        transform: scale(1);
    }
`;

const LeftIcon = styled.img`
    width: 1.5rem;
`;

const BackButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const LogoContainer = styled.div``;

const OrgName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const Logo = styled.img`
  width: 3rem;
  height: auto;
  border-radius: 50%;
`;

const SchoolWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.7rem;
`;

const SchoolContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 1%;
`;


const BaseButton = styled.div<{ $isDarkMode: boolean; $isDisabled?: boolean }>`
    border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff73' : 'black')}; 
    padding: 0.4rem 0.8rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};

    background-color: ${({ $isDisabled }) => ($isDisabled ? 'transparent' : '#ffffff2b')};
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.2s ease-in-out, opacity 0.3s ease-in-out;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};

    &:hover {
        color: ${({ $isDarkMode, $isDisabled }) => !$isDisabled && ($isDarkMode ? 'white' : 'black')};
        background-color: ${({ $isDarkMode, $isDisabled }) => !$isDisabled && ($isDarkMode ? '#565454' : '#a0a0a0')}; 
        opacity: ${({ $isDisabled }) => !$isDisabled && 0.8};
        transform: ${({ $isDisabled }) => !$isDisabled && 'scale(1.02)'}; 
    }

    &:active {
        background-color: ${({ $isDarkMode, $isDisabled }) => !$isDisabled && ($isDarkMode ? '#919191' : '#595858')};
        transform: ${({ $isDisabled }) => !$isDisabled && 'scale(1.00)'};
    }
`;

const DeleteProfileButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DeleteProfileButton = styled(BaseButton)`
    width: 50%;
`;

const NextButton = styled(BaseButton)`
     width: 50%;
`;

const NextButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 8%;
`;

const SearchBoxContainer = styled.div`
    margin-top: 3%;
`;

const TitleContainer = styled.div`
    display: flex;
    gap: 0.4rem;
`;

const BodyContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 5%;
    flex-direction: column;
`;

const SchoolText = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ActionText = styled.div`
    flex: 1;
`;

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SearchCampusContainer = styled.div`
    margin-top: 12%;
    width: 85%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

