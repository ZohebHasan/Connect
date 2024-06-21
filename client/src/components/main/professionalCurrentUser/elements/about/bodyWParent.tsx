import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';
import VerifiedIcon from '../../../../assets/verified.png';
import Pixel from '../../../elements/posts/bodies/pixel';

import JobIconDark from '../../../../assets/jobDark.png';
import JobIconLight from '../../../../assets/jobLight.png';

import EducationIconDark from '../../../../assets/educationDark.png';
import EducationIconLight from '../../../../assets/educationLight.png';

import LeadershipIconDark from '../../../../assets/controlDark.png';
import LeadershipIconLight from '../../../../assets/controlLight.png';

import CertificationIconDark from '../../../../assets/certificationDark.png';
import CertificationIconLight from '../../../../assets/certificationLight.png';

import AwardIconDark from '../../../../assets/awardDark.png';
import AwardIconLight from '../../../../assets/awardLight.png';

import Header from './header';

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

interface EducationInfo extends CommonInfo {}

interface ExperienceInfo extends CommonInfo {}

interface ProjectInfo extends CommonInfo {
  role?: string;
  association?: Association;
  projectLink?: string;
  collaborators?: { id: number; src: string }[];
  skills?: string[];
}

interface ResearchAndPubInfo extends CommonInfo {
  role?: string;
  association?: Association;
  researchLink?: string;
  collaborators?: { id: number; src: string }[];
  skills?: string[];
}




interface Association {
  logo: string;
  name: string;
  link: string;
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
    return type === 'certification' || type === 'award' ? '0.85rem' : '0.75rem';
  };

  return (
    <Container>
      <Header HeaderType={headerType} />

      <OrganizationList>
        {organizations.map((org, index) => (
          <Organization key={index}>
            <Top>
              <TopWrapper>
                <LogoContainer>
                  <Logo src={org.organizationLogo} />
                </LogoContainer>
                <OrgNameContainer>
                  <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                    {org.organizationName}
                  </Text>
                  {org.isVerified && <VerifiedBadge />}
                </OrgNameContainer>
              </TopWrapper>
            </Top>

            <Musk>
              <IconColumn>
                <VerticalLineCompanies />
              </IconColumn>
                
              <InfoList>
                {org.infoList.map((item, itemIndex) => (
                  <Info key={itemIndex}>
                    <IconColumn>
                      <OrganizationIcon src={getIcon()} />
                      <VerticalLine />
                    </IconColumn>
                    <InfoDetails>
                      <InfoTitle>
                        <Text variant={"normal"} size={"1rem"} fontWeight={"400"}>
                          {item.title}
                        </Text>
                        {item.timeType && (
                          <>
                            <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                              •
                            </Text>
                            <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                              {item.timeType}
                            </Text>
                          </>
                        )}
                      </InfoTitle>
                      {item.department && (
                        <InfoRow>
                          <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
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
                        <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                          •
                        </Text>
                        <Text variant={"normal"} size={"0.9rem"} fontWeight={"300"}>
                          {item.description}
                        </Text>
                      </Description>
                      {item.media && (
                        <MediaSection>
                          <MediaWrapper>
                            <Pixel media={item.media} />
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
  width: 85%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  justify-content: center;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const TopWrapper = styled.div`
  flex: 1;
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
  width: 2.7rem;
  height: 2.7rem;
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
  width: 50%;
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
  width: 1.3rem;
  height: 1.3rem;
  margin-top: 0.2rem;
`;
