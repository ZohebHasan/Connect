import React from 'react';
import styled from 'styled-components';
import Text from '../../../ConnectUI_web/common/texts/static';

import VerifiedIcon from "../../assets/verified.png";
import DemoJob from "../../dummies/Connect.jpg"


const UserProfile: React.FC = () => {
    const isVarified: boolean = true;
    const jobTitle = "Software Engineer Intern";
    const userName = "zoheb.hasan";
    return (
        <>
            <RecommendedPeopleContainer>
                <UserProfileContainer>
                    <ProfileAvatarsContainer>
                        <StyledImage src = {DemoJob}/>
                    </ProfileAvatarsContainer>

                    <UserNameContainer>
                        <UserInfo>
                            <JobTitle>
                                <Text size={"1rem"} fontWeight={"300"}>
                                    {jobTitle}
                                </Text>

                            </JobTitle>

                            <UserInfoContainer>
                                <UserName>
                                    <Text size={"0.8rem"} fontWeight={"300"} variant={"transparent"}>
                                        Connect
                                    </Text>
                                    {isVarified && <VerifiedBadge />}
                                </UserName>
                                <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                    •
                                </Text>
                                <Text size={"0.75rem"} fontWeight={"300"} variant={"transparent"}>
                                    New York
                                </Text>

                            </UserInfoContainer>
                            <Text variant={'transparent'} size={'0.8rem'} fontWeight="300">
                                Summer 2024
                            </Text>



                        </UserInfo>

                    </UserNameContainer>

                </UserProfileContainer>


                <ButtonContainer >
                    <Text size={"0.95rem"} fontWeight={"450"} variant={"normal"}>
                        Apply
                    </Text>
                </ButtonContainer>

            </RecommendedPeopleContainer>
        </>
    );
};

export default UserProfile;

const StyledImage = styled.img`
    width: 3rem;
    height: auto;
    border-radius: 50%;
`

const RecommendedPeopleContainer = styled.div`
    display: flex;
    flex-direction: row;
    
    
`

const UserName = styled.div`
    display: flex;
    gap: 0.3rem;
`

const JobTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    
`

const ButtonContainer = styled.div`
    opacity: 0.9;
    display: flex;
    cursor: pointer; // Adds pointer cursor to indicate it's clickable

    flex: 1;
    align-items: center;
    justify-content: flex-end;

    transition: transform 0.2s ease-in-out, color 0.3s, opacity 0.3s ease-in-out;

    &:hover {
    transition: color 0.3s, background-color 0.3s, opacity 0.3s ease-in-out;
    opacity: 0.8;
    transform: scale(1.05); 
    }

    &:active {
    transition: color 0.2s, background-color 0.2s;
    transform: scale(1.00);
    }
    
`

const VerifiedBadge: React.FC = () => (
    <VerifiedBadgeContainer>
        <StyledLogo src={VerifiedIcon} alt="Logo" />
    </VerifiedBadgeContainer>
);

const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width: 100%;
    gap: 0.3rem;
`;

const VerifiedBadgeContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;

`;

const StyledLogo = styled.img`
    width: 1rem;
    height: 1rem;
`;

const ProfileAvatarsContainer = styled.div`
    display: flex;
    flex: 0.9;
    align-items: center;
    justify-content: center;
    /* margin: 0rem 0.2rem; */
    height: 85%;
    width: 100%;
    /* background-color: pink; */
`;

const UserNameContainer = styled.div`
    display: flex;
    flex: 4;
    flex-direction: row;
    justify-content: center;
    gap: 0.3rem;
    margin-left: 0.5rem;
    /* background-color: green; */
`;

const UserProfileContainer = styled.div`
    flex: 4;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 100%; */
    height: 4rem;
    /* background-color: pink; */

`;
