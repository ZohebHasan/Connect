import React from 'react';
import styled from 'styled-components';
import Text from '../../../ConnectUI_web/common/texts/static';
import UserPhoto from './userPhotos';
import VerifiedIcon from "../../assets/verified.png";

interface UserProfileProps {
    suggestedProfile: 'personal' | 'professional' | 'school';
}

const UserProfile: React.FC<UserProfileProps> = ({ suggestedProfile }) => {
    const isVarified: boolean = true;
    const fullName = "Zoheb Hasan";
    const userName = "zoheb.hasan";
    return (
        <>
            <RecommendedPeopleContainer>


                <UserProfileContainer>

                    <ProfileAvatarsContainer>
                        <UserPhoto suggestedProfile={suggestedProfile} parentSize={2.2} childSize={1.3} />
                    </ProfileAvatarsContainer>

                    <UserNameContainer>
                        <UserInfo>
                            {suggestedProfile === "personal" ? (
                                <>
                                    <UserInfoContainer>
                                       
                                            <Text size={"1rem"} fontWeight={"300"} variant={"normal"}>
                                                {userName}
                                            </Text>
                                            {isVarified && <VerifiedBadge />}
                                      
                                    </UserInfoContainer>

                                </>
                            ) : (
                                <>
                                    <UserInfoContainer>
                                        <FullName>
                                            <Text size={"1rem"} fontWeight={"300"}>
                                                {fullName}
                                            </Text>
                                            {isVarified && <VerifiedBadge />}
                                        </FullName>

                                        <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                            •
                                        </Text>
                                        <UserName>
                                            <Text size={"0.8rem"} fontWeight={"300"} variant={"transparent"}>
                                                @{userName}
                                            </Text>
                                        </UserName>

                                    </UserInfoContainer>
                                    <Text size={"0.75rem"} fontWeight={"300"} variant={"transparent"}>
                                        {suggestedProfile === "professional" ? "Software Enginneer at Connect"
                                            : "Computer Science at Stony Brook University"}
                                    </Text>
                                </>
                            )}
                        </UserInfo>

                    </UserNameContainer>

                </UserProfileContainer>

                {/* {suggestedProfile === "personal" ?
                    <ButtonContainer >
                        <Text size={"0.95rem"} fontWeight={"500"} variant={suggestedProfile}>
                            Follow
                        </Text>
                    </ButtonContainer>
                    : suggestedProfile === "professional" ?
                        <ButtonContainer>
                              <Text size={"0.95rem"} fontWeight={"500"} variant={suggestedProfile}>
                            Connect
                        </Text>
                        </ButtonContainer> : <ButtonContainer>
                        <Text size={"0.95rem"} fontWeight={"500"} variant={suggestedProfile}>
                            Connect
                        </Text>
                        </ButtonContainer>

                } */}
                <ButtonContainer >
                    <Text size={"0.95rem"} fontWeight={"450"} variant={"normal"}>
                        Follow
                    </Text>
                </ButtonContainer>

            </RecommendedPeopleContainer>
        </>
    );
};

export default UserProfile;



const RecommendedPeopleContainer = styled.div`
    display: flex;
    flex-direction: row;
    
`

const UserName = styled.div`
    display: flex;
    
`

const FullName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.3rem;
    
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
    width: 1.2rem;
    height: 1.2rem;
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
