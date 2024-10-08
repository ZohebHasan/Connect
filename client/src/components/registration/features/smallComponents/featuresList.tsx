import React, { useState } from 'react';
import styled from 'styled-components';

import Text from '../../../ConnectUI_web/common/texts/static';
import Toggle from "../../../ConnectUI_web/common/buttons/toggle";

import { useSignup } from '../../../../contexts/signup/signupContext';

const Features: React.FC = () => {

  const [dataProtectionMode, setDataProtectionMode] = useState(true);
  const [endtoendEncryption, setEndtoEndEncryption] = useState(true);
  const [censorMode, setCensorMode] = useState(false);
  const [restrictedMode, setRestrictedMode] = useState(false);

  const {
    dataProtection,
    profileEncryption,
    contentMonetization,
    censor,
    restricted,

    handleDataProtectionChange,
    handleProfileEncryptionChange,
    handleContentMonetizationChange,
    handleCensorChange,
    handleRestrictedChange,

  } = useSignup();

  return (
    <FeaturesList>
      <FeatureContainerWrapper>
        
        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size= {"1.5rem"}>
                Data Protection Mode
              </Text>
              <Text variant={"transparent"} fontWeight={"500"} size={"0.9375 rem"}>
                (Recommended)
              </Text>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={dataProtection} toggleOn={handleDataProtectionChange} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size= {"0.9375 rem"}>
            Connect's flagship feature. Prevents anyone from taking screenshots, download or copy your data. 
          </Text>
        </FeatureContainer>


        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size = {"1.5rem"}>
                Profile encryption
              </Text>
              <Text variant={"transparent"} fontWeight={"500"} size={"0.9375 rem"}>
                (Recommended)
              </Text>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={profileEncryption} toggleOn={handleProfileEncryptionChange} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size={"0.9375 rem"}>
            End-to-End encryption. Encrypts your entire virtual 
            existence (messages, photos, videos, etc) which can only be decrypted by your followers. 
          </Text>
        </FeatureContainer>

        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size = {"1.5rem"}>
                Content Monitization
              </Text>
              <Text variant={"transparent"} fontWeight={"500"} size={"0.9375 rem"}>
                (Recommended)
              </Text>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={contentMonetization} toggleOn={handleContentMonetizationChange} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size={"0.9375 rem"}>
              Allows you to monitize every content you upload regardless of it's nature and make some extra
              cash.
          </Text>
        </FeatureContainer>


        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size =  {"1.5rem"}>
                Censor Mode
              </Text>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={censor} toggleOn={handleCensorChange} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size={"0.9375 rem"}>
            Enabling Censor mode allows you see content only that are fully censored. Connect allows 
            user to fully utilize their freedom of speech.
          </Text>
        </FeatureContainer>




        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size =  {"1.5rem"}>
                Restricted Mode
              </Text>
              <BetaContainer>
                <Text size={"0.9375 rem"} fontWeight="400"> Beta</Text>
              </BetaContainer>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={restricted} toggleOn={handleRestrictedChange} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size={"0.9375 rem"}>
            Prevents everyone from sending, commenting inappropriate content, 
            messages regardless of the context.
          </Text>
        </FeatureContainer>


      </FeatureContainerWrapper>
    </FeaturesList>
  );
};

export default Features;

const FeaturesList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
   
`;

const FeatureContainerWrapper = styled.div`
  width: 93%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2.5rem;
  
  @media (max-width: 1280px) { 
    gap: 2rem;
  }

  @media (max-width: 1440px) { 
    gap: 1.3rem;
  }
`

const FeatureContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.1rem;
`


const Feature = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align items: center;
`

const FeatureTextContainer = styled.div`
  display: flex;
  flex: 3;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
`
const FeatureToggleContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-right: 2%;
`


const BetaContainer = styled.div`
  color:rgb(174, 60, 200); 
  border: 0.12rem solid rgb(174, 60, 200); 
  border-radius: 0.5rem;
  padding: 0.1rem 0.3rem;
`;