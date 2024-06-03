import React, { useState} from 'react';
import styled from 'styled-components';


import Text from '../../../ConnectUI_web/common/texts/static';
import ProfilePhotos from './profilePhotos';

import VerifiedIcon from "../../assets/verified.png"



const VerifiedBadge: React.FC = () =>{
    const isVarified: boolean = true;
    return (
        <>
            <VerifiedBadgeContainer>
                <StyledLogo src={VerifiedIcon} alt="Logo" /> 
            </VerifiedBadgeContainer>     
        </>
    )

}

const UserProfile: React.FC= () => {
  const isVarified: boolean = true;
  const fullName = "Zoheb Hasan"
  const userName = "zoheb.hasan"
    return (
        <>
        <UserProfileContainer>
            <ProfileAvatarsContainer>
                <ProfilePhotos/>
            </ProfileAvatarsContainer>
            <UserNameContainer>
                <UserInfo>
                    <FullNameContainer>
                        <Text size={"1.1rem"} fontWeight={"300"}>
                            {fullName}
                        </Text>
                        {isVarified ? <VerifiedBadge/> : <></>} 
                    </FullNameContainer>
                  
                    <Text size={"0.85rem"} fontWeight={"300"} variant= {"transparent"}>
                         @{userName}
                    </Text> 
                </UserInfo>
            </UserNameContainer>
        </UserProfileContainer>   
        </>
    );
};

export default UserProfile;

const FullNameContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width: 100%;
    gap: 0.3rem;
`
const VerifiedBadgeContainer = styled.div`
    display: flex;
    // flex: 1;
    align-items: flex-start;
    // justify-content: center;
    // width: 100%;
    // height: 100%;
    // background-color: pink;
`

const UserInfo = styled.div`
    display: Flex;

    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 0.3rem;
    // background-color: red;
`

const StyledLogo = styled.img`
    width: 1.6rem;
    height: 1.6rem;

`;

const ProfileAvatarsContainer = styled.div`
    display: flex;
    flex: 1.2;
    align-items: center;
    justify-content: center;
    margin: 0rem 0.5rem;
    height:85%;
    width: 100%;
    // background-color:blue;
    
`

const UserNameContainer = styled.div`
    display: flex;
    flex: 3;
    flex-direction: row;
    // align-items: center;
    justify-content: center;
    gap: 0.3rem;
    // background-color: red;
    margin-left: 0.5rem;
`

const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    // background-color: green;
    width: 100%;
    height: 100%;
`

