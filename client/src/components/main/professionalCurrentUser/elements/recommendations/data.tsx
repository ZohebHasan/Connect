import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';
import Header from '../common/header';

import VerifiedIcon from '../../../../assets/verified.png';
import Pixel from "../../../elements/posts/bodies/pixel";
import { Media as PixelMedia } from "../../../elements/posts/mediaType";

interface Media {
  type: 'image' | 'video';
  url: string;
}

interface Recommender {
  recommenderName?: string;
  recommenderUserName: string;
  recommenderPosition?: string;
  recommenderCompany?: string;
  profileUrl: string;
  profilePhoto: string;
  isVerified: boolean;
}

interface RecommendationInfo {
  recommender: Recommender;
  text?: string;
  media?: Media[];
  recTime: string;
  recType?: 'strongly' | 'formally';
  description: string;
  relation: string;
  relationStatus: 'current' | 'former';
}

interface RecProps {
  recs: RecommendationInfo[];
}

const RecElement: React.FC<RecProps> = ({ recs }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <RecContainer>
      {/* <Header HeaderType='recommendation'/> */}
      <Recs>
        {recs.map((item, index) => (
          <React.Fragment key={index}>
            <Rec>
              <UserContainer>
                <UserWrapper>
                  <Border>
                    <InnerBorder $isDarkMode={isDarkMode}>
                      <Story src={item.recommender.profilePhoto} />
                    </InnerBorder>
                  </Border>

                  <User>
                    <UserTop>
                      <UserName>
                        <FullNameContainer>
                          <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                            {item.recommender.recommenderName}
                          </Text>

                          {item.recommender.isVerified ? <VerifiedBadge /> : null}
                        </FullNameContainer>
                        <RecommendationTypeContainer>
                          {item.recType && (
                            <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                              {item.recType}
                            </Text>
                          )}
                          <Text variant={"normal"} size={"1.1rem"} fontWeight={"400"}>
                            recommended
                          </Text>
                        </RecommendationTypeContainer>

                        <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                          •
                        </Text>
                        <UserNameContainer>
                          <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                            @{item.recommender.recommenderUserName}
                          </Text>
                        </UserNameContainer>
                      </UserName>
                    </UserTop>
                    <UserInfo>
                      <CompanyNameContainer>
                        <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                          {item.recommender.recommenderPosition}
                        </Text>
                        <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                          at
                        </Text>
                        <Text variant={"normal"} size={"0.85rem"} fontWeight={"300"}>
                          {item.recommender.recommenderCompany}
                        </Text>
                      </CompanyNameContainer>

                      <Text variant={"transparent"} size={"1rem"} fontWeight={"300"}>
                        •
                      </Text>
                      <Text variant={"transparent"} size={"0.85rem"} fontWeight={"300"}>
                        {item.recTime}
                      </Text>
                    </UserInfo>
                    <RelationContainer>
                      <Text variant={"transparent"} size={"0.8rem"} fontWeight={"300"}>
                        {item.recommender.recommenderName?.split(' ')[0]} {item.relationStatus === 'current' ? 'is' : 'was'} Zoheb's {item.relation}
                      </Text>
                    </RelationContainer>

                    <UserDescription>
                      <Text variant={"transparent"} size={"0.9rem"} fontWeight={"300"}>
                        •
                      </Text>
                      <Text variant={"normal"} size={"0.9rem"} fontWeight={"300"}>
                        {item.text}
                      </Text>
                    </UserDescription>
                    <UserMedia>
                      <UserMediaWrapper>
                        <Pixel media={item.media as PixelMedia[]} />
                      </UserMediaWrapper>
                    </UserMedia>
                  </User>
                </UserWrapper>
              </UserContainer>
            </Rec>
            {index < recs.length - 1 && <Divider $isDarkMode={isDarkMode} />}
          </React.Fragment>
        ))}
      </Recs>
    </RecContainer>
  );
};

export default RecElement;

const Divider = styled.hr<{ $isDarkMode: boolean }>`
  width: 100%;
  border: 0;
  border-top: 0.5px solid ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  margin-bottom: 1rem;
`;

const VerifiedBadge: React.FC = () => {
  return (
    <VerifiedBadgeContainer>
      <StyledLogo src={VerifiedIcon} alt="Logo" />
    </VerifiedBadgeContainer>
  );
};

const CompanyNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

const VerifiedBadgeContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledLogo = styled.img`
  width: 1.3rem;
  height: 1.3rem;
`;

const RelationContainer = styled.div``;

const UserNameContainer = styled.div`
  display: flex;
`;

const RecommendationTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const FullNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.1rem;
`;

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
  width: 90%;
  flex-direction: column;
  justify-content: flex-start;
`;

const UserMedia = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  align-items: center;
  justify-content: flex-start;
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

const UserDescription = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const AboutInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 1rem;
`;
