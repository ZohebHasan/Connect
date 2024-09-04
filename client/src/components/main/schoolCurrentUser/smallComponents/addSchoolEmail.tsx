import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useSchoolProfile } from '../../../../contexts/schoolProfile/school';

import Text from '../../../ConnectUI_web/common/texts/static';
import LeftToRightText from '../../../ConnectUI_web/common/texts/animated/leftToRight';
import SearchCampusInput from './searchCampus/searchSchoolBox';

import DefaultOrgIconDark from "../../../assets/orgIconDark.png"
import DefaultOrgIconLight from "../../../assets/orgIconLight.png"

import VerifiedIcon from "../../../assets/verified.png"

import LeftDark from "../../../assets/leftDarkArrow.png"
import LeftLight from "../../../assets/leftLightArrow.png"



import Button from '../../../ConnectUI_web/common/buttons/button1';

const AddSchoolData: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <SearchSchoolComponent />
    );
};

export default AddSchoolData;

const VerifiedBadge: React.FC<{ type: 'org' | 'user' }> = ({ type }) => {

    return (
        <>
            <VerifiedBadgeContainer>
                <StyledLogo src={VerifiedIcon} alt="Logo" $type={type} />
            </VerifiedBadgeContainer>
        </>
    )
}

const VerifiedBadgeContainer = styled.div`
    display: flex;
    // flex: 1;
    align-items: flex-start;
    // justify-content: center;
    // width: 100%;
    // height: 100%;
    // background-color: pink;
`

const StyledLogo = styled.img<{ $type: 'org' | 'user' }>`
    width: ${(props) => (props.$type === 'user' ? '1.6rem' : '1.5rem')};
    height: auto;

`;

const DisplayErrorMessages = () => {
    const { userExistsError,notEduEmailError, schoolEmailEmptyError, schoolEmailError, connectionError, setUniversitySelectionFalse } = useSchoolProfile();


    let errorMessage = null;

    if (connectionError) {
        errorMessage = <ErrorMessage>Something went wrong, please try again</ErrorMessage>;
    }
    else if (userExistsError) {
        errorMessage = <ErrorMessage>Email already in use</ErrorMessage>;
    }
    else if (schoolEmailEmptyError) {
        errorMessage = <ErrorMessage>School email field is empty</ErrorMessage>;
    }
    else if (schoolEmailError) {
        errorMessage = <ErrorMessage>Invalid email</ErrorMessage>;
    }
    else if (notEduEmailError) {
        errorMessage = <ErrorMessage>Please provide a university-issued '.edu' email (e.g., user@university.edu)</ErrorMessage>;
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
    const { handleEmailSet, handleUniversityDelete, setUniversitySelectionFalse, schoolProfile, schoolEmail, handleEmailChange, handleUniversityMailSubmit, universityName } = useSchoolProfile();

    const isVerified = true;

    const handleSearchTextChange = (value: string) => {
        setSearchText(value);
    };
    return (
        <SearchCampusContainer>
            <BackButtonContainer>
                <Wrapper onClick={setUniversitySelectionFalse}>
                    <LeftIcon src={isDarkMode ? LeftDark : LeftLight} />
                    <Text variant={"normal"}
                        size={"1.4rem"}
                        fontWeight={"300"}
                    >
                        Change my school
                    </Text>
                </Wrapper>
            </BackButtonContainer>
            <HeaderContainer>
                <ActionText>
                    <Text size={"2.7rem"} fontWeight={"300"} variant={"transparent"}>
                        School email required
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
                        {/* {isVerified && <VerifiedBadge type='org' />} */}
                    </OrgName>
                </SchoolWrapper>
            </SchoolContainer>
            <BodyContainer>
                <TitleContainer>
                    <Text size={"1.2rem"} fontWeight={"200"} variant={"normal"}>
                        Before connecting to
                    </Text>
                    <Text size={"1.2rem"} fontWeight={"400"} variant={"normal"}>
                        {universityName ? universityName : schoolProfile?.campus.name},
                    </Text>
                    <Text size={"1.2rem"} fontWeight={"200"} variant={"normal"}>
                        we need to verify your university credentials.
                    </Text>
                </TitleContainer>
                <SearchBoxContainer>
                    <SearchTitle>
                        <LeftToRightText size="1.3rem">
                            {`Please enter your ${universityName ? universityName : schoolProfile?.campus.name} email address`}
                        </LeftToRightText>
                    </SearchTitle>
                    <SearchBox>
                        <SearchCampusInput
                            id="search_in_course"
                            label={"Enter your university email, e.g., user@university.edu"}
                            value={schoolEmail}
                            onChange={handleEmailChange}
                            width="100%"
                            isSearchBox={false}
                        />
                    </SearchBox>
                </SearchBoxContainer>
            </BodyContainer>
            <DisplayErrorMessages />
            <BottomContainer>
                <NextButtonContainer>
                    <NextButton $isDarkMode={isDarkMode} onClick={handleUniversityMailSubmit}>
                        <Text size={"1.2rem"} fontWeight={"200"} variant={"normal"}>
                            Confirm
                        </Text>
                    </NextButton>
                </NextButtonContainer>
            </BottomContainer>

        </SearchCampusContainer>
    );
}


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
`

const LeftIcon = styled.img`
    width: 1.5rem;
`

const BackButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

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
`

const SchoolContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 1%;

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


const DeleteProfileButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: blue; */
`


// DeleteProfileButton extending the BaseButton
const DeleteProfileButton = styled(BaseButton)`
    width: 70%;
`;





// NextButton extending the BaseButton
const NextButton = styled(BaseButton)`
     width: 50%;
`;



const NextButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: yellow; */
`



const BottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    /* background-color: red; */
    width: 100%;
    margin-top: 8%;
  
`

const SearchBox = styled.div`
    margin-top: 2%;
`
const SearchTitle = styled.div`
    
`

const SearchBoxContainer = styled.div`
    margin-top: 3%;
`

const TitleContainer = styled.div`
    display: flex;
    gap: 0.4rem
    /* background-color: red; */
`

const BodyContainer = styled.div`
    display: flex;
    width: 100%;
    /* background-color: red; */
    margin-top: 5%;
    flex-direction: column;
`

const SchoolText = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    /* background-color: pink; */
    justify-content: flex-end;
`
const ActionText = styled.div`
    flex: 1;
`

const HeaderContainer = styled.div`
    /* background-color: red; */
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* background-color: blue; */
`

const SearchCampusContainer = styled.div`
    margin-top: 12%;
    /* height: 100%; */
    width: 85%;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* background-color: red; */
`
