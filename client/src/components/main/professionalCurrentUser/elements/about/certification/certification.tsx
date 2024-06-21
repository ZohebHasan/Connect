import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';


import CertificationIconDark from "../../../../../assets/certificationDark.png";
import CertificationIconLight from "../../../../../assets/certificationLight.png";


import ConnectLogo from "../../../../dummies/Connect.jpg";

import Header from "../header";
import VerifiedIcon from "../../../../../assets/verified.png";

import dummyPhoto1 from '../../../../dummies/dummyPhotoPortrait1.png';
import dummyPhoto2 from '../../../../dummies/dummyPhotoPortrait2.png';
import dummyPhoto3 from '../../../../dummies/dummyPhotoPortrait3.png';
import dummyPhoto4 from '../../../../dummies/dummyPhotoPortrait4.png';
import dummyVideo from '../../../../dummies/dummyVideoPortrait.mp4';

import Pixel from "../../../../elements/posts/bodies/pixel";
import { Media as PixelMedia } from "../../../../elements/posts/mediaType"; // Adjust the import path as necessary

interface Media {
  type: 'image' | 'video';
  url: string;
}

const VerifiedBadge: React.FC = () => {
  return (
    <VerifiedBadgeContainer>
      <StyledLogo src={VerifiedIcon} alt="Logo" />
    </VerifiedBadgeContainer>
  );
};

const VerifiedBadgeContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledLogo = styled.img`
  width: 1.3rem;
  height: 1.3rem;
`;

const CertificationElement: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const isVerified = true;

  const dummyMedia: PixelMedia[] = [
    { type: 'image', url: dummyPhoto1 },
    { type: 'image', url: dummyPhoto2 },
    { type: 'image', url: dummyPhoto3 },
    { type: 'image', url: dummyPhoto4 },
    { type: 'video', url: dummyVideo },
  ];

  return (
    <CertificationContainer>
      <Header HeaderType='certification'/>
      <Certifications>
        <Certification>

          <CertificationTop>
            <CompanyContainer>
              <CompanyLogoContainer>
                <CompanyLogo src={ConnectLogo} />
              </CompanyLogoContainer>
              <CompanyNameContainer>
                <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                  Stony Brook University
                </Text>
                {isVerified ? <VerifiedBadge /> : <></>}
              </CompanyNameContainer>
            </CompanyContainer>
          </CertificationTop>

          <Musk>
            <StringIconContainer>
              <VerticalLineCompanies />
            </StringIconContainer>
            <CerificateContainer>
              <CerificateWrapper>
                <StringIconContainer>
                  <CertificationIcon src={isDarkMode ? CertificationIconDark : CertificationIconLight} />
                  <VerticalLine />
                </StringIconContainer>
                <Cerificate>
                  <CerificateTop>
                    <CerificateName>
                      <Text variant={"normal"} size={"1rem"} fontWeight={"400"}>
                        Hazing Prevention 101 Course - College Edition 2022
                      </Text>
                    </CerificateName>
                  </CerificateTop>
                  <CerificateInfo>
                    <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                      Aug 2022
                    </Text>
                  </CerificateInfo>
                  <CerificateDescription>
                    <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                      •
                    </Text>
                    <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                      Got an Certification for being an idiot and
                      Designed and created an end-to-end encrypted platform and coded 24/7
                      like an idiot collaborating with his idiot friends just like himself.
                    </Text>
                  </CerificateDescription>
                  <CerificateMedia>
                    <CerificateMediaWrapper>
                      <Pixel media={dummyMedia} />
                    </CerificateMediaWrapper>
                  </CerificateMedia>
                </Cerificate>
              </CerificateWrapper>

            </CerificateContainer>
          </Musk>
        </Certification>
      </Certifications>
    </CertificationContainer>
  );
};

export default CertificationElement;

const CerificateMediaWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: flex-start;
  /* gap: 0.5rem; */
  
`

const CerificateMedia = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  align-items: center;
  justify-content: flex-start;
 
`;

const Musk = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CertificationIcon = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  margin-top: 0.2rem;
`;

const StringIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3.2rem;
  height: 100%;
`;

const VerticalLineCompanies = styled.div`
  width: 1px;
  background-color: #ccc;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.7rem;
`;

const VerticalLine = styled.div`
  width: 1px;
  background-color: #ccc;
  height: 80%;
  margin-top: 0.7rem;
`;

const CerificateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.7rem;
`;

const CerificateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CerificateInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
`;

const CerificateName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const CerificateTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Cerificate = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const CertificationTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const CerificateDescription = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const CompanyNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const CompanyLogo = styled.img`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
`;

const CompanyLogoContainer = styled.div``;

const CompanyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
`;

const Certification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const Certifications = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: flex-start;
  justify-content: center;
`;

const CertificationContainer = styled.div`
  display: flex;
  width: 85%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AboutInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 1rem;
`;
