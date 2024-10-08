import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Text from "../../../ConnectUI_web/common/texts/static";
import MicrosoftLogo from "../assets/microsoft.png";
import AppleLogo from "../assets/appleLogoBlack.png";
import GoogleLogo from "../assets/google.png";

interface SocialLoginSignupButtonsProps {
  flex: number;
}

const SocialLoginSignupButtons: React.FC<SocialLoginSignupButtonsProps> = ({ flex }) => {

  const handleGoogleLogin = () => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = "907262819056-kohknc54tiiima4gdehjfc7r2k5fri9u.apps.googleusercontent.com";
    const redirectUri = 'http://localhost:3000/auth/google/callback';
    const scope = 'profile email';
    const responseType = 'code';
    const authUrl = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
    window.location.href = authUrl;
  };

  const handleMicrosoftLogin = () => {
    const microsoftAuthUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
    const clientId = "e7dda04b-ea85-414c-b401-0222e7ebc5b4";
    const redirectUri = 'http://localhost:3000/auth/microsoft/callback';
    const scope = 'openid profile email';
    const responseType = 'code';
    const authUrl = `${microsoftAuthUrl}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  };
  const handleAppleLogin = () => {
    const appleAuthUrl = 'https://appleid.apple.com/auth/authorize';
    const clientId = process.env.REACT_APP_APPLE_CLIENT_ID as string;
    const redirectUri = 'http://localhost:3000/auth/apple/callback';
    const scope = 'name email';
    const responseType = 'code id_token';
    const state = 'some-random-state';

    const authUrl = `${appleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;

    window.location.href = authUrl;
  };

  return (
    <SocialButtons $flex={flex}>
      <Text size={"17px"} variant={"normal"} fontWeight={"100"}>
        Sign up with:
      </Text>

      <MicrosoftButton onClick={handleMicrosoftLogin}>
        <MicrosoftImage src={MicrosoftLogo} alt="Microsoft" />
      </MicrosoftButton>

      <GoogleButton onClick={handleGoogleLogin}>
        <GoogleImage src={GoogleLogo} alt="Google" />
      </GoogleButton>

      <AppleButton onClick={handleAppleLogin}>
        <AppleImage src={AppleLogo} alt="Apple" />
      </AppleButton>
    </SocialButtons>
  );
};

export default SocialLoginSignupButtons;

const SocialButtons = styled.div<{ $flex: number }>`
  flex: ${({ $flex }) => $flex};
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;




const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  width: 23%;
  transition: transform 0.2s ease-in-out, background-color 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`
const MicrosoftButton = styled(StyledButton)`
  padding: 3px 17px;
  margin: 5px 3px;
  border-radius: 8px;
`;

const GoogleButton = styled(StyledButton)`
  padding: 3px 17px;
  margin: 5px 3px;
  border-radius: 8px;
`;
const AppleButton = styled(StyledButton)`
  padding: 0px 20px;
  margin: 0px 3px;
  border-radius: 8px;
`;

const MicrosoftImage = styled.img`
  width: 86px;
  height: 18px;
  padding: 6px 30px;
`;

const AppleImage = styled.img`
  width: 23px;
  height: auto;
  padding: 4px 0px;
`;

const GoogleImage = styled.img`
  width: 26px;
  height: 26px;
  padding: 2px 0px;
`;




const clientId = "927314664227-e5ukk88gdjem7f4mn8dkk6op0fjv6ej8.apps.googleusercontent.com";
