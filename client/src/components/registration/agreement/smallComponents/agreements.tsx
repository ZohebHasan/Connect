import React from 'react';
import styled from 'styled-components';

import Text from '../../../ConnectUI_web/common/texts/static';

const Agreements: React.FC = () => {
  return (
    <AgreementList>
      <AgreementListWrapper>
        
        <AgreementContainer>
          <Text variant="normal" fontWeight={"400"} size={"1.5rem"}>
            1. Data Control
          </Text>
          <TextContainer>
            <Text variant="transparent" fontWeight={"200"} size={"0.9375 rem"}>
              I understand that I will store and have 100% control over my personal information.
            </Text>
          </TextContainer>
        </AgreementContainer>


        <AgreementContainer>
          <Text variant="normal" fontWeight={"400"} size={"1.5rem"}>
            2. User Independence
          </Text>
          <TextContainer>
            <Text variant="transparent" fontWeight={"200"} size={"0.9375 rem"}>
              I understand my uncensored content will only be seen by people if they want to.
            </Text>
          </TextContainer>
        </AgreementContainer>


        <AgreementContainer>
          <Text variant="normal" fontWeight={"400"} size={"1.5rem"}>
            3. Data Protection
          </Text>
          <TextContainer>
            <Text variant="transparent" fontWeight={"200"} size={"0.9375 rem"}>
              I understand I will not be able to download or copy other user's information if they have data protection turned on.
            </Text>
          </TextContainer>
        </AgreementContainer>


        <AgreementContainer>
          <Text variant="normal" fontWeight={"400"} size={"1.5rem"}>
            4. Child Safety
          </Text>
          <TextContainer>
            <Text variant="transparent" fontWeight={"200"} size={"0.9375 rem"}>
              I understand that my interactions with a user under 13 years old will strictly be moderated, such as comments, messages.
            </Text>
          </TextContainer>
        </AgreementContainer>

      </AgreementListWrapper>
    </AgreementList>
  );
};

export default Agreements;



const AgreementList = styled.div`
    flex: 1.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    list-style-type: none;  
    padding: 0;
    margin-left: 15px;
    gap: 30px;
    margin-top: 3%;

`;

const AgreementListWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3.5rem;
  
  @media (max-width: 1280px) { 
    gap: 2rem;
  }

  @media (max-width: 1440px) { 
    gap: 2rem;
  }
`

const AgreementContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 3px;
`

const TextContainer = styled.div`
    margin-left: 2.2%;
`
