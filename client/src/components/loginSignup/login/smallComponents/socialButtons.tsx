import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { useLanguage } from "../../../../contexts/Language/Language";
import { transLogin } from "../../../../translations/loginSignup/login/login";

import Text from "../../../ConnectUI_web/common/texts/static";

import MicrosoftLogo from "../assets/microsoft.png"
import AppleLogo from "../assets/appleLogoBlack.png"
import GoogleLogo from "../assets/google.png"

interface SocialLoginSignupButtonsProps{
    flex: number;
}

const SocialLoginSignupButtons: React.FC<SocialLoginSignupButtonsProps> = ({flex}) => {
    const { language } = useLanguage();

    let signInWith = "Sign in with";

    if (transLogin && transLogin[language]) {
        const { signInWith: signInWithVal } = transLogin[language];
        signInWith = signInWithVal;
    }

    return (
        <SocialButtons $flex = {flex}>
            <Text size={"17px"} variant={"normal"} fontWeight={"100"}>
                {signInWith}:
            </Text>
            <MicrosoftButton to="#">
                <MicrosoftImage src={MicrosoftLogo} alt="Microsoft" />
            </MicrosoftButton>
            <AppleButton to="#">
                <AppleImage src={AppleLogo} alt="Apple" />
            </AppleButton>
            <GoogleButton to="#">
                <GoogleImage src={GoogleLogo} alt="Google" />
            </GoogleButton>
        </SocialButtons>
    );
}

export default SocialLoginSignupButtons;

const SocialButtons = styled.div<{$flex: number}>`
  flex: ${({ $flex }) => $flex}; 
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  width: 15%;
  transition: transform 0.2s ease-in-out, background-color 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const MicrosoftButton = styled(StyledLink)`
  padding: 3px 17px;
  margin: 5px 3px;
  border-radius: 8px;
`;

const AppleButton = styled(StyledLink)`
  padding: 0px 20px;
  margin: 0px 3px;
  border-radius: 8px;
`;

const GoogleButton = styled(StyledLink)`
  padding: 3px 17px;
  margin: 5px 3px;
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
