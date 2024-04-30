import React, { useState } from 'react';
import styled from 'styled-components';

import Text from '../../../ConnectUI_web/common/texts/static';
import Toggle from "../../../ConnectUI_web/common/buttons/toggle";

const Features: React.FC = () => {
  const [dataProtectionMode, setDataProtectionMode] = useState(true);
  const [censorMode, setCensorMode] = useState(false);
  const [restrictedMode, setRestrictedMode] = useState(false);

  return (
    <FeaturesList>
      <FeatureContainerWrapper>

        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size="30px">
                Data Protection Mode
              </Text>
              <Text variant={"transparent"} fontWeight={"300"} size="20px">
                (Recommended for most users)
              </Text>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={dataProtectionMode} toggleOn={() => setDataProtectionMode(!dataProtectionMode)} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size="17px">
            Connect's flagship feature. With this feature enabled, NO one on the internet can screenshot, copy
            or download your personal information—including photos, videos, and personal
            messages. When we say no one, we really mean NO ONE.
          </Text>
        </FeatureContainer>


        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size="30px">
                Censor Mode
              </Text>
            </FeatureTextContainer>
            <FeatureToggleContainer>
              <Toggle isOn={censorMode} toggleOn={() => setCensorMode(!censorMode)} />
            </FeatureToggleContainer>
          </Feature>
          <Text variant="transparent" fontWeight={"300"} size="17px">
            Enabling censor mode allows you to only see censored contents in your feed. Not everyone find uncensored
            contents interesting. Can be disabled anytime from settings.
          </Text>
        </FeatureContainer>


        <FeatureContainer>
          <Feature>
            <FeatureTextContainer>
              <Text variant="normal" fontWeight={"400"} size="30px">
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
          <Text variant="transparent" fontWeight={"300"} size="17px">
            Restricted Mode blocks you from receiving any hate speech, inappropriate
            Photos regardless of the context. This model was originally designed for
            Users under 13 years old but can be used by anyone in Connect.
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