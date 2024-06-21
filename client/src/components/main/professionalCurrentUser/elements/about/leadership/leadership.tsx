import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';
import LeadershipIconDark from "../../../../../assets/controlDark.png";
import LeadershipIconLight from "../../../../../assets/controlLight.png";
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

const ExperienceElement: React.FC = () => {
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
    <ExperienceContainer>
      <Header HeaderType='leadership'/>
      <Experiences>
        <Experience>

          <ExperienceTop>
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
          </ExperienceTop>

          <Musk>
            <StringIconContainer>
              <VerticalLineCompanies />
            </StringIconContainer>
            <RoleContainer>
              <RoleWrapper>
                <StringIconContainer>
                  <LeadershipIcon src={isDarkMode ? LeadershipIconDark : LeadershipIconLight} />
                  <VerticalLine />
                </StringIconContainer>
                <Role>
                  <RoleTop>
                    <RoleName>
                      <Text variant={"normal"} size={"1rem"} fontWeight={"400"}>
                        Vice President
                      </Text>

                    </RoleName>
                  </RoleTop>
                  <RoleInfo>
                    <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                      Benedict Hall Council
                    </Text>
                  </RoleInfo>
                  <RoleInfo>
                    <Text variant={"transparent"} size={"0.75rem"} fontWeight={"300"}>
                      New York, New York, United States
                    </Text>
                    <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                      •
                    </Text>
                    <Text variant={"transparent"} size={"0.75rem"} fontWeight={"300"}>
                      Jan 2024 - Present (5 months)
                    </Text>
                  </RoleInfo>
                  <RoleDescription>
                    <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                      •
                    </Text>
                    <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                      Designed and created an end-to-end encrypted platform and coded 24/7
                      like an idiot collaborating with his idiot friends just like himself.
                    </Text>
                  </RoleDescription>
                  <RoleMedia>
                    <RoleMediaWrapper>
                      <Pixel media={dummyMedia} />
                    </RoleMediaWrapper>
                  </RoleMedia>
                </Role>
              </RoleWrapper>
            </RoleContainer>
          </Musk>
        </Experience>
      </Experiences>
    </ExperienceContainer>
  );
};

export default ExperienceElement;

const RoleMediaWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: flex-start;
  /* gap: 0.5rem; */
  
`

const RoleMedia = styled.div`
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

const LeadershipIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
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

const RoleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.7rem;
`;

const RoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
`;

const RoleName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const RoleTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Role = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const ExperienceTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const RoleDescription = styled.div`
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

const Experience = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const Experiences = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: flex-start;
  justify-content: center;
`;

const ExperienceContainer = styled.div`
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
