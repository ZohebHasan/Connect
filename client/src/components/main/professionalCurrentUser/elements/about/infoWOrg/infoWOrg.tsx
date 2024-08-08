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

import RightArrowDark from '../../../../../assets/rightArrowDark.png';
import RightArrowLight from '../../../../../assets/rightArrowLight.png';

import AddIconDark from "../../../../../assets/createDarkActive.png"
import AddIconLight from "../../../../../assets/createLightActive.png"

import Header from '../../common/header';
import TextBody from '../../common/textDescription';

import OrgIconDark from "../../../../../assets/orgIconDark.png"
import OrgIconLight from "../../../../../assets/orgIconLight.png"

// import { useAboutInfoContext } from '../../../../../../contexts/professionalProfile/aboutContext';

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

// Define the Org interface
interface Org {
  company?: string; // This will hold the ObjectId as a string
  name?: string;
  isVerified?: boolean;
  profilePhoto?: string;
}

// Define the OrgWithInfo interface
interface OrgWithInfo {
  organization: Org;
  infoList: CommonInfo[];
}

interface AboutDataProps {
  headerType: string;
  organizations: OrgWithInfo[];
}

const VerifiedBadge: React.FC = () => (
  <BadgeContainer>
    <BadgeImage src={VerifiedIcon} alt="Verified" />
  </BadgeContainer>
);

const AboutDataElement: React.FC<AboutDataProps> = ({ headerType, organizations }) => {
  const { isDarkMode } = useDarkMode();
  // const { setActiveType, toggleDataBar } = useAboutInfoContext();

  const getIcon = () => {
    switch (headerType) {
      case 'education':
        return { icon: isDarkMode ? EducationIconDark : EducationIconLight, type: 'education' as const };
      case 'experience':
        return { icon: isDarkMode ? JobIconDark : JobIconLight, type: 'job' as const };
      case 'leadership':
        return { icon: isDarkMode ? LeadershipIconDark : LeadershipIconLight, type: 'job' as const };
      case 'certification':
        return { icon: isDarkMode ? CertificationIconDark : CertificationIconLight, type: 'job' as const };
      case 'award':
        return { icon: isDarkMode ? AwardIconDark : AwardIconLight, type: 'job' as const };
      default:
        return { icon: isDarkMode ? JobIconDark : JobIconLight, type: 'job' as const };
    }
  };

  const getAddText = () => {
    switch (headerType) {
      case 'job':
        return 'experiences';
      case 'education':
        return 'education';
      case 'project':
        return 'projects';
      case 'research':
        return 'research & Publications';
      case 'leadership':
        return 'leadership & Extracurricular Activities';
      case 'skill':
        return 'skills & Expertise';
      case 'recommendation':
        return 'recommendations';
      case 'certification':
        return 'certifications';
      case 'award':
        return 'awards';
      default:
        return 'experiences';
    }
  };

  const getFontSize = (type: string) => {
    return type === 'certification' || type === 'award' ? '0.85rem' : '0.75rem';
  };

  const totalInfos = organizations.reduce((sum, org) => sum + org.infoList.length, 0);

  if (organizations.length === 0 || organizations[0].infoList.length === 0) {
    return <>
      <Container>
        <Header HeaderType={headerType} display={"notFullScreen"} />

        <IconContainer>
          <AddInfoWrapper>
            <AddIcon src={isDarkMode ? AddIconDark : AddIconLight} $isDarkMode={isDarkMode} />
            <Text variant={"transparent"} size={"1rem"} fontWeight={"400"}>
              Add {getAddText()}
            </Text>
          </AddInfoWrapper>
        </IconContainer>
      </Container>
    </>
  }

  const firstOrganization = organizations[0];
  const firstInfo = firstOrganization.infoList[0];

  const { icon, type } = getIcon();

  const getSeeAllText = () => {
    switch (headerType) {
      case 'education':
        return `${totalInfos} educations`;
      case 'experience':
        return `${totalInfos} experiences`;
      case 'leadership':
        return `${totalInfos} leadership roles`;
      case 'certification':
        return `${totalInfos} certifications`;
      case 'award':
        return `${totalInfos} awards`;
      default:
        return `${totalInfos} items`;
    }
  };

  // const handleShowAllClick = () => {
  //   setActiveType(headerType);
  //   toggleDataBar();
  // };

  const isClickable = !!firstOrganization.organization.company;

  return (
    <Container>
      <Header HeaderType={headerType} display={"notFullScreen"} />

      <OrganizationList>
        <Organization>
          <Top>
            <TopWrapper $isClickable = {isClickable}>
              <LogoContainer>
                <Logo src={firstOrganization.organization.profilePhoto ? firstOrganization.organization.profilePhoto : isDarkMode ? OrgIconDark : OrgIconLight } />
              </LogoContainer>
              <OrgNameContainer>
                <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                  {firstOrganization.organization.name}
                </Text>
                {firstOrganization.organization.isVerified && <VerifiedBadge />}
              </OrgNameContainer>
            </TopWrapper>
          </Top>

          <Musk>
            <IconColumn>
              <VerticalLineCompanies />
            </IconColumn>

            <InfoList>
              <Info>
                <IconColumn>
                  <OrganizationIcon src={icon} $type={type} />
                  <VerticalLine />
                </IconColumn>
                <InfoDetails>
                  <InfoTitle>
                    <Text variant={"normal"} size={"1rem"} fontWeight={"400"}>
                      {firstInfo.title}
                    </Text>
                    {firstInfo.timeType && (
                      <>
                        <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                          •
                        </Text>
                        <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                          {firstInfo.timeType}
                        </Text>
                      </>
                    )}
                  </InfoTitle>
                  {firstInfo.department && (
                    <InfoRow>
                      <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                        {firstInfo.department}
                      </Text>
                    </InfoRow>
                  )}
                  <InfoRow>
                    <Text variant={"transparent"} size={getFontSize(headerType)} fontWeight={"300"}>
                      {firstInfo.location}
                    </Text>
                    <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                      •
                    </Text>
                    <Text variant={"transparent"} size={getFontSize(headerType)} fontWeight={"300"}>
                      {firstInfo.duration}
                    </Text>
                  </InfoRow>
                  <Description>
                    <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                      •
                    </Text>
                    <TextBody textBody={firstInfo.description} display={'notFullScreen'} />
                  </Description>
                  {firstInfo.media ? (
                    <MediaSection>
                      <MediaWrapper>
                        {headerType === 'certification' ? (
                          <CertificateIcon src={firstInfo.media[0].url} />
                        ) : (
                          <Pixel media={firstInfo.media} />
                        )}
                      </MediaWrapper>
                    </MediaSection>
                  ) : null}
                </InfoDetails>
              </Info>
            </InfoList>
          </Musk>
        </Organization>
      </OrganizationList>
      {totalInfos > 1 && (
        // <ShowAllContainer onClick={handleShowAllClick}>
        <ShowAllContainer>
          <Text variant={"normal"} size={"1rem"} fontWeight={"500"}>
            See all {getSeeAllText()}
          </Text>
          <ArrowIcon src={isDarkMode ? RightArrowDark : RightArrowLight} />
        </ShowAllContainer>
      )}
    </Container>
  );
};

export default AboutDataElement;


const AddInfoWrapper = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.98);
    opacity: 0.6;
  }
`;

const AddIcon = styled.img<{ $isDarkMode: boolean }>`
  width: 1rem;
  padding: 0.3rem;
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
  border-radius: 3px;
`;

const IconContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;

`

const CertificateIcon = styled.img`
  width: 70%;
  height: auto;
  margin-bottom: 1rem;
  object-fit: contain;
`;

const ArrowIcon = styled.img`
  width: 1.4rem;
`;

const ShowAllContainer = styled.div`
  width: 100%;
  gap: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const TopWrapper = styled.div<{$isClickable: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.7rem;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  ${({ $isClickable }) =>
    $isClickable &&
    `
    &:hover {
      opacity: 0.7;
      transform: scale(1.02);
    }
    &:active {
      transform: scale(1.00);
    }
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
  `}
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

const OrganizationIcon = styled.img<{ $type: 'education' | 'job' }>`
  width: ${(props) => (props.$type === 'job' ? '1.8rem' : '2rem')};
  height: ${(props) => (props.$type === 'job' ? '1.8rem' : '2rem')};
  margin-top: 0.2rem;
`;

