import React, { useState } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import { useNavigate } from 'react-router-dom';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import OptionIconDark from "../../../../../assets/optionHorizontalDark.png";
import OptionIconLight from "../../../../../assets/optionHorizontalLight.png";
import VerifiedIcon from "../../../../../assets/verified.png";

import ClubDark from "../../../../../assets/clubAndOrgDark.png";
import ClubLight from "../../../../../assets/clubAndOrgLight.png";

import SchoolDefaultDark from "../../../../../assets/schoolUserDark.png";
import SchoolDefaultLight from "../../../../../assets/schoolUserLight.png";

import { ClubAndOrg, Eboard, useOrgs } from '../../../../../../contexts/schoolProfile/clubAndOrgsContext';

interface HeaderProps {
  org: ClubAndOrg;
}

const Header: React.FC<HeaderProps> = ({ org }) => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { setActiveOrg } = useOrgs();
  const [isNeutralized, setIsNeutralized] = useState(false);

  const handleNavigation = () => {
    if (!isNeutralized) {
      const maskedOrgCode = org.orgCode.toLowerCase().replace(/\s+/g, '');
      setActiveOrg(org.orgCode);
      navigate(`./${maskedOrgCode}`);
    }
  };

  const handleNeutralize = (neutralize: boolean) => (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsNeutralized(neutralize);
  };

  const findMemberByTitle = (eBoard: Eboard[], position: string): Eboard | undefined => {
    return eBoard.find(member => member.position === position);
  };

  const president = findMemberByTitle(org.eBoard, 'President');
  const vicePresident = findMemberByTitle(org.eBoard, 'Vice-President');
  const remainingEboard = org.eBoard.filter(member => member.position !== 'President' && member.position !== 'Vice-President');

  return (
    <HeaderContainer
      $isDarkMode={isDarkMode}
      onClick={handleNavigation}
      $isNeutralized={isNeutralized}
    >
      <TopWrapper>
        <TitleContainer>

          <TitleWrapper>
            <Border $type={"org"}>
              <InnerBorder isDarkMode={isDarkMode} $type={"org"}>
                <UserIcon src={org.photoUrl ? org.photoUrl : isDarkMode ? ClubDark : ClubLight} $type={"org"} />
              </InnerBorder>
            </Border>
            <OrgCodeContainer>
              <Text variant={"normal"} size={"2rem"} fontWeight={"400"}>
                {org.orgName}
              </Text>
            </OrgCodeContainer>
          </TitleWrapper>
        </TitleContainer>
        <OptionIconContainer>
          <OptionWrapper>
            <OptionIcon src={isDarkMode ? OptionIconDark : OptionIconLight} />
          </OptionWrapper>
        </OptionIconContainer>
      </TopWrapper>

      <BottomWrapper>
        <DataContainer>
          <InstructorContainer>
            <Text variant={"normal"} size={"0.9rem"} fontWeight={"500"}>
              President:
            </Text>
            {president && (
              <AssociationContent
                onMouseEnter={handleNeutralize(true)}
                onMouseLeave={handleNeutralize(false)}
                onClick={handleNeutralize(true)}
                $isDarkMode={isDarkMode}
              >
                <Border $type={"leader"}>
                  <InnerBorder isDarkMode={isDarkMode} $type={"leader"}>
                    <UserIcon src={president.user.profilePhoto ? president.user.profilePhoto : isDarkMode ? SchoolDefaultDark : SchoolDefaultLight } $type={"leader"} />
                  </InnerBorder>
                </Border>
                <NameContainer>
                  <FullName>
                    <Text variant="normal" size="0.85rem" fontWeight="350">
                      {president.user.name}
                    </Text>
                    {president.user.isVerified && <VerifiedBadge type='org' />}
                  </FullName>
                  <Text variant={"transparent"} size="0.8rem" fontWeight="350">
                    @{president.user.userName}
                  </Text>
                </NameContainer>
              </AssociationContent>
            )}
          </InstructorContainer>

          <InstructorContainer>
            <Text variant={"normal"} size={"0.9rem"} fontWeight={"500"}>
              Vice-President:
            </Text>
            {vicePresident && (
              <AssociationContent
                onMouseEnter={handleNeutralize(true)}
                onMouseLeave={handleNeutralize(false)}
                onClick={handleNeutralize(true)}
                $isDarkMode={isDarkMode}
              >
                <Border $type={"leader"}>
                  <InnerBorder isDarkMode={isDarkMode} $type={"leader"}>
                    <UserIcon src={vicePresident.user.profilePhoto ? vicePresident.user.profilePhoto : isDarkMode ? SchoolDefaultDark : SchoolDefaultLight } $type={"leader"} />
                  </InnerBorder>
                </Border>
                <NameContainer>
                  <FullName>
                    <Text variant="normal" size="0.85rem" fontWeight="350">
                      {vicePresident.user.name}
                    </Text>
                    {vicePresident.user.isVerified && <VerifiedBadge type='org' />}
                  </FullName>
                  <Text variant={"transparent"} size="0.8rem" fontWeight="350">
                    @{vicePresident.user.userName}
                  </Text>
                </NameContainer>
              </AssociationContent>
            )}
          </InstructorContainer>

        </DataContainer>
      </BottomWrapper>

      <BottomWrapper>
        <DataContainer>


          <TAContainer>
            <Text variant={"normal"} size={"0.9rem"} fontWeight={"400"}>
              Executive Board:
            </Text>
            <CollaboratorList>
              {remainingEboard.slice(0, 3).map((member) => (
                <Collaborator key={member.user.userId}>
                  <ClickableWrapper
                    onMouseEnter={handleNeutralize(true)}
                    onMouseLeave={handleNeutralize(false)}
                    onClick={handleNeutralize(true)}
                  >
                    <Border $type={"eboard"}>
                      <InnerBorder isDarkMode={isDarkMode} $type={"eboard"}>
                        <UserIcon src={member.user.profilePhoto ? member.user.profilePhoto : isDarkMode ? SchoolDefaultDark : SchoolDefaultLight } $type={"eboard"} />
                      </InnerBorder>
                    </Border>
                  </ClickableWrapper>
                </Collaborator>
              ))}
              {remainingEboard.length > 3 && (
                <MoreCollaborators>
                  <TextWrapper>
                    <Text variant="normal" size="0.8rem" fontWeight="300">
                      and
                    </Text>
                    <OtherCollaborator
                      onMouseEnter={handleNeutralize(true)}
                      onMouseLeave={handleNeutralize(false)}
                      onClick={handleNeutralize(true)}
                    >
                      <Text variant="normal" size="0.8rem" fontWeight="300">
                        {remainingEboard.length - 3} other.
                      </Text>
                    </OtherCollaborator>
                  </TextWrapper>
                </MoreCollaborators>
              )}
            </CollaboratorList>
          </TAContainer>

        </DataContainer>
      </BottomWrapper>


    </HeaderContainer>
  );
};

export default Header;

const OrgCodeContainer = styled.div`
  flex: 3;
  /* background-color: red; */
`;

const NameContainer = styled.div``;

const OptionWrapper = styled.div`
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

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* width: 30%; */
  /* background-color: pink; */
  gap: 0.5rem;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
`;

const OptionIcon = styled.img`
  width: 2.1rem;
`;

const OptionIconContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* background-color: pink; */
`;

const ClickableWrapper = styled.div`
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

const OtherCollaborator = styled.div`
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

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

const MoreCollaborators = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

const UserIcon = styled.img<{ $type: "eboard" | "leader" | "org" }>`
  width: ${({ $type }) => ($type === "org" ? "2.5rem" : $type === "eboard" ? "1.6rem" : "1.8rem")};
  height: ${({ $type }) => ($type === "org" ? "2.5rem" : $type === "eboard" ? "1.6rem" : "1.8rem")};
  border-radius: 50%;
  flex-shrink: 0;
`;

const InnerBorder = styled.div<{ isDarkMode: boolean; $type: "eboard" | "leader" | "org" }>`
  background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
  padding: ${props => (props.$type === "org" ? "1.5px" : props.$type === "eboard" ? "1px" : "1.2px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

const Border = styled.div<{ $type: "eboard" | "leader" | "org" }>`
  background: linear-gradient(to right, #EA8D8D, #A890FE);
  padding: ${props => (props.$type === "org" ? "2px" : "1.5px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Collaborator = styled.div``;

const CollaboratorList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-top: 0.1rem;
`;

const VerifiedBadgeContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const VerifiedBadge: React.FC<{ type: 'org' | 'user' }> = ({ type }) => {
  return (
    <VerifiedBadgeContainer>
      <StyledLogo src={VerifiedIcon} alt="Logo" $type={type} />
    </VerifiedBadgeContainer>
  );
};

const StyledLogo = styled.img<{ $type: 'org' | 'user' }>`
  width: ${(props) => (props.$type === 'user' ? '1.6rem' : '1.2rem')};
  height: auto;
`;

const FullName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
`;

const AssociationContent = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  cursor: pointer;
   &:hover {
      color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
      background-color: ${({ $isDarkMode }) => $isDarkMode ? '#565454' : '#a0a0a0'};  // subtle background change on hover
      transition: color 0.3s, background-color 0.3s, opacity 0.3s ease-in-out;
      opacity: 0.8;
      transform: scale(1.05); 
    }
  
    &:active {
      background-color: ${({ $isDarkMode }) => $isDarkMode ? '#919191' : '#595858'};  // deeper background on click
      transition: color 0.2s, background-color 0.2s;
      transform: scale(1.00);
    }
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const TAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
`;

const InstructorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.3rem;
  width: 100%;
`;

const TitleContainer = styled.div`
  flex: 4;
`;

const HeaderContainer = styled.div<{ $isDarkMode: boolean; $isNeutralized: boolean }>`
  display: flex;
  width: 95%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 2px 15px ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(164, 164, 164, 0.2)' : 'rgba(0, 0, 0, 0.2)')};
  border: ${({ $isDarkMode }) =>
    $isDarkMode ? '1px solid rgba(248, 197, 255, 0.201)' : '1px solid rgba(60, 38, 63, 0.201)'};
  padding: 0.5rem 1rem;
  cursor: ${({ $isNeutralized }) => ($isNeutralized ? 'default' : 'pointer')};
  &:hover {
    opacity: ${({ $isNeutralized }) => ($isNeutralized ? '1' : '0.7')};
    transform: ${({ $isNeutralized }) => ($isNeutralized ? 'none' : 'scale(1.02)')};
  }
  &:active {
    transform: ${({ $isNeutralized }) => ($isNeutralized ? 'none' : 'scale(1.00)')};
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;
