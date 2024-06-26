import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';
import VerifiedIcon from '../../../../../assets/verified.png';
import Pixel from '../../../../elements/posts/bodies/pixel';

import JobIconDark from '../../../../../assets/jobDark.png';
import JobIconLight from '../../../../../assets/jobLight.png';

import EducationIconDark from '../../../../../assets/educationDark.png';
import EducationIconLight from '../../../../../assets/educationLight.png';

import LeadershipIconDark from '../../../../../assets/controlDark.png';
import LeadershipIconLight from '../../../../../assets/controlLight.png';

import CertificationIconDark from '../../../../../assets/certificationDark.png';
import CertificationIconLight from '../../../../../assets/certificationLight.png';

import AwardIconDark from '../../../../../assets/awardDark.png';
import AwardIconLight from '../../../../../assets/awardLight.png';

import Header from '../../common/header';
import TextBody from '../../common/textDescription';

interface Media {
  type: 'image' | 'video';
  url: string;
}

interface CommonInfo {
  title: string;
  timeType?: string;
  location?: string;
  duration: string;
  description: string;
  media?: Media[];
  department?: string;
}

interface Organization<T> {
  organizationName: string;
  organizationLogo: string;
  isVerified: boolean;
  infoList: T[];
}

interface AboutDataProps<T extends CommonInfo> {
  headerType: string;
  organizations: Organization<T>[];
}

const VerifiedBadge: React.FC = () => (
  <BadgeContainer>
    <BadgeImage src={VerifiedIcon} alt="Verified" />
  </BadgeContainer>
);

const AboutDataElement = <T extends CommonInfo>({ headerType, organizations }: AboutDataProps<T>) => {
  const { isDarkMode } = useDarkMode();

  const getIcon = () => {
    switch (headerType) {
      case 'education':
        return isDarkMode ? EducationIconDark : EducationIconLight;
      case 'experience':
        return isDarkMode ? JobIconDark : JobIconLight;
      case 'leadership':
        return isDarkMode ? LeadershipIconDark : LeadershipIconLight;
      case 'certification':
        return isDarkMode ? CertificationIconDark : CertificationIconLight;
      case 'award':
        return isDarkMode ? AwardIconDark : AwardIconLight;
      default:
        return isDarkMode ? JobIconDark : JobIconLight;
    }
  };

  const getFontSize = (type: string) => {
    return type === 'certification' || type === 'award' ? '0.90rem' : '0.80rem';
  };

  return (
    <Container>
      <Header HeaderType={headerType} display="fullScreen" />

      <OrganizationList>
        {organizations.map((org, index) => (
          <Organization key={index}>
            <Top>
              <TopWrapper>
                <LogoContainer>
                  <Logo src={org.organizationLogo} />
                </LogoContainer>
                <OrgNameContainer>
                  <Text variant={"normal"} size={"1.4rem"} fontWeight={"400"}>
                    {org.organizationName}
                  </Text>
                  {org.isVerified && <VerifiedBadge />}
                </OrgNameContainer>
              </TopWrapper>
            </Top>

            <Musk>
              <CompanyIconColumn>
                <VerticalLineCompanies />
              </CompanyIconColumn>

              <InfoList>
                {org.infoList.map((item, itemIndex) => (
                  <Info key={itemIndex}>
                    <IconColumn>
                      <OrganizationIcon src={getIcon()} />
                      <VerticalLine />
                    </IconColumn>
                    <InfoDetails>
                      <InfoTitle>
                        <Text variant={"normal"} size={"1.2rem"} fontWeight={"400"}>
                          {item.title}
                        </Text>
                        {item.timeType && (
                          <>
                            <Text variant={"transparent"} size={"1.5rem"} fontWeight={"300"}>
                              •
                            </Text>
                            <Text variant={"transparent"} size={"1.05rem"} fontWeight={"300"}>
                              {item.timeType}
                            </Text>
                          </>
                        )}
                      </InfoTitle>
                      {item.department && (
                        <InfoRow>
                          <Text variant={"transparent"} size={"0.90rem"} fontWeight={"300"}>
                            {item.department}
                          </Text>
                        </InfoRow>
                      )}
                      <InfoRow>
                        <Text variant={"transparent"} size={getFontSize(headerType)} fontWeight={"300"}>
                          {item.location}
                        </Text>
                        <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                          •
                        </Text>
                        <Text variant={"transparent"} size={getFontSize(headerType)} fontWeight={"300"}>
                          {item.duration}
                        </Text>
                      </InfoRow>
                      <Description>
                        <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                          •
                        </Text>
                        <TextBody textBody= {item.description} display= {"fullScreen"}/>

                      </Description>
                      {item.media && (
                        <MediaSection>
                          <MediaWrapper>
                            {headerType === 'certification' ? (
                              <CertificateIcon src={item.media[0].url} />
                            ) : (
                              <Pixel media={item.media} />
                            )}
                          </MediaWrapper>
                        </MediaSection>
                      )}
                    </InfoDetails>
                  </Info>
                ))}
              </InfoList>
            </Musk>
          </Organization>
        ))}
      </OrganizationList>
    </Container>
  );
};

export default AboutDataElement;

const CompanyIconColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3.2rem;
  position: relative;
`;

const CertificateIcon = styled.img`
  width: 70%;
  height: auto;
  margin-bottom: 1rem;
  object-fit: contain;
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const BadgeImage = styled.img`
  width: 1.3rem;
  height: 1.3rem;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const OrganizationList = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: flex-start;
  justify-content: center;
`;

const Organization = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1.00);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const LogoContainer = styled.div``;

const Logo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const OrgNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const Musk = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const IconColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3.2rem;
  height: 100%;
`;

const VerticalLineCompanies = styled.div`
  width: 1px;
  background-color: #ccc;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
`;

const VerticalLine = styled.div`
  width: 1px;
  background-color: #ccc;
  height: 85%;
  margin-top: 0.7rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.7rem;
`;

const InfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
`;

const InfoTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Description = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const MediaWrapper = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: flex-start;
`;

const MediaSection = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  align-items: center;
  justify-content: flex-start;
`;

const OrganizationIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.2rem;
`;
