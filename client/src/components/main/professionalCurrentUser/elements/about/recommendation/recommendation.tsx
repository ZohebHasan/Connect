import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import ConnectLogo from "../../../../dummies/Connect.jpg";

import Header from "../header";
import VerifiedIcon from "../../../../../assets/verified.png";

import dummyPhoto1 from '../../../../dummies/dummyPhotoPortrait1.png';
import dummyPhoto2 from '../../../../dummies/dummyPhotoPortrait2.png';
import dummyPhoto3 from '../../../../dummies/dummyPhotoPortrait3.png';
import dummyPhoto4 from '../../../../dummies/dummyPhotoPortrait4.png';
import dummyVideo from '../../../../dummies/dummyVideoPortrait.mp4';

import Priyanka from '../../../../dummies/Priyanka.jpeg';


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

const RecElement: React.FC = () => {
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
    <RecContainer>
      <Header HeaderType='recommendation'/>
      <Recs>
        <Rec>
          <UserContainer>
            <UserWrapper>
              <StringIconContainer>
                <Border>
                  <InnerBorder $isDarkMode={isDarkMode}>
                    <Story src={Priyanka} />
                  </InnerBorder>
                </Border>
                <VerticalLine />
              </StringIconContainer>
              <User>
                <UserTop>
                  <UserName>
                    <FullNameContainer>
                      <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                        Kamrul Hassan
                      </Text>

                      {isVerified ? <VerifiedBadge /> : <></>}
                    </FullNameContainer>
                    <RecommendationContainer >
                      <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                        strongly
                      </Text>
                      <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                        recommended.
                      </Text>

                    </RecommendationContainer >

                    <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                      •
                    </Text>

                    <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                      @kamhassan
                    </Text>
                  </UserName>
                </UserTop>
                <UserInfo>
                  <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                    Software Engineer at Connect
                  </Text>

                  {/* <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                    @kamhassan
                  </Text> */}
                  <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                    •
                  </Text>
                  <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                    Jan 2024
                  </Text>
                </UserInfo>
                {/* <UserInfo> */}
                <Text variant={"transparent"} size={"0.8rem"} fontWeight={"300"}>
                  Kamrul was Zoheb's collegue
                </Text>
                {/* </UserInfo> */}
                <UserDescription>
                  <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                    •
                  </Text>
                  <Text variant={"normal"} size={"0.9rem"} fontWeight={"300"}>
                    Zoheb is an absolute idiot and half the time he doesn't know what he wants to do until he does.
                    A literal moron. Never ever recruit this asshole.
                  </Text>
                </UserDescription>
                <UserMedia>
                  <UserMediaWrapper>
                    <Pixel media={dummyMedia} />
                  </UserMediaWrapper>
                </UserMedia>
              </User>
            </UserWrapper>
          </UserContainer>
        </Rec>
      </Recs>
    </RecContainer>
  );
};

export default RecElement;

const RecommendationContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`

const FullNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.1rem;
  
`

const Story = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const InnerBorder = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${props => (props.$isDarkMode ? 'black' : 'white')};
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; 
`;

const Border = styled.div`
  background: linear-gradient(to right, #2E3192, #1BFFFF);
  padding: 1.8px;
  border-radius: 50%;
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



const UserMediaWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: flex-start;
  /* gap: 0.5rem; */
  
`

const UserMedia = styled.div`
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

const JobIcon = styled.img`
  width: 3rem;
  height: 3rem;
  margin-top: 0.2rem;
  border-radius: 50%;
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

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.7rem;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
`;

const UserName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const UserTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const RecTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.8rem;
`;

const UserDescription = styled.div`
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

const Rec = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const Recs = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: flex-start;
  justify-content: center;
`;

const RecContainer = styled.div`
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
