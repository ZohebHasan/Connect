import React, { useState } from 'react';
import styled from 'styled-components';

import Text from '../../../ConnectUI_web/common/texts/static';
import Toggle from "../../../ConnectUI_web/common/buttons/toggle";

const Features: React.FC = () => {
  const [dataProtectionMode, setDataProtectionMode] = useState(true);
  const [endtoendEncryption, setEndtoEndEncryption] = useState(true);
  const [censorMode, setCensorMode] = useState(false);
  const [restrictedMode, setRestrictedMode] = useState(false);

  return (
    <FeaturesList>
      <FeatureContainerWrapper>
        
        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size="25px">
                Data Protection Mode
              </Text>
              <Text variant={"transparent"} fontWeight={"300"} size="18px">
                (Recommended for most users)
              </Text>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={dataProtectionMode} toggleOn={() => setDataProtectionMode(!dataProtectionMode)} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size="16px">
            Connect's flagship feature. Prevents anyone from taking screenshots, download or copy your data. 
          </Text>
        </FeatureContainer>


        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size="25px">
                End-to-End encryption
              </Text>
              <Text variant={"transparent"} fontWeight={"300"} size="18px">
                (Recommended for most users)
              </Text>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={endtoendEncryption} toggleOn={() => setEndtoEndEncryption(!endtoendEncryption)} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size="16px">
            Connect's flagship security feature. Encrypts your entire virtual 
            existence (messages, photos, videos, etc) which can only be decrypted by your community. 
          </Text>
        </FeatureContainer>

        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size="25px">
                Censor Mode
              </Text>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={censorMode} toggleOn={() => setCensorMode(!censorMode)} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size="16px">
            Enabling Censor mode allows you see content only that are fully censored. Connect allows 
            user to fully utilize their freedom of speech.
          </Text>
        </FeatureContainer>


        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size="25px">
                Restricted Mode
              </Text>
              <BetaContainer>
                <Text size={"15px"} fontWeight="300"> Beta</Text>
              </BetaContainer>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={restrictedMode} toggleOn={() => setRestrictedMode(!restrictedMode)} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size="16px">
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
  gap: 40px;
`

const FeatureContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
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
  gap: 10px;
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
  border: 1px solid rgb(174, 60, 200); 
  border-radius: 10px;
  padding: 3px 7px;
`;