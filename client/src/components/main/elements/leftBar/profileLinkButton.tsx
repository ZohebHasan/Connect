import React from 'react';
import styled from 'styled-components';
import Text from '../../../ConnectUI_web/common/texts/static';
import ProfilePhotos from './profilePhotos';
import VerifiedIcon from "../../../assets/verified.png";
import { useConnectUser } from '../../../../contexts/ConnectUser/connectUserProvider'; // Import the user context

const VerifiedBadge: React.FC = () => {
  return (
    <VerifiedBadgeContainer>
      <StyledLogo src={VerifiedIcon} alt="Verified Badge" />
    </VerifiedBadgeContainer>
  );
};

const UserProfile: React.FC = () => {
  const { user, loading } = useConnectUser();

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching user data
  }

  if (!user) {
    return <div>Error loading user data</div>; // Handle case where user data is not available
  }

  const { fullName, username, isVerified } = user;

  return (
    <UserProfileContainer>
      <ProfileAvatarsContainer>
        <ProfilePhotos />
      </ProfileAvatarsContainer>
      <UserNameContainer>
        <UserInfo>
          <FullNameContainer>
            <Text size={"1.1rem"} fontWeight={"300"}>
              {fullName}
            </Text>
            {isVerified && <VerifiedBadge />}
          </FullNameContainer>
          <Text size={"0.85rem"} fontWeight={"300"} variant={"transparent"}>
            @{username}
          </Text>
        </UserInfo>
      </UserNameContainer>
    </UserProfileContainer>
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
  gap: 0.3rem;
`;

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
  height: 85%;
  width: 100%;
`;

const UserNameContainer = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  justify-content: center;
  gap: 0.3rem;
  margin-left: 0.5rem;
`;

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;
