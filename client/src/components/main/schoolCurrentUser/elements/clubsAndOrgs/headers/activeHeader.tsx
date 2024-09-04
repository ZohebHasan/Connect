// import React, { useState, useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
// import Text from '../../../../../ConnectUI_web/common/texts/static';

// import CloseLight from "../../../../../assets/closeProfilesLight.png";
// import CloseDark from "../../../../../assets/closeProfilesDark.png";
// import OpenLight from "../../../../../assets/openLight.png";
// import OpenDark from "../../../../../assets/openDark.png";

// import VerifiedIcon from "../../../../../assets/verified.png";

// import IconButton from "../../../../containers/buttonLogo";

// import OptionIconDark from "../../../../../assets/optionHorizontalDark.png";
// import OptionIconLight from "../../../../../assets/optionHorizontalLight.png";

// import { useOrgs, Eboard, Org } from '../../../../../../contexts/schoolProfile/clubAndOrgsContext';

// export interface User {
//   name?: string;
//   userName?: string;
//   link: string;
//   photoUrl: string;
//   isVerified?: boolean;
// }

// const Header: React.FC = () => {
//   const { isDarkMode } = useDarkMode();
//   const { activeOrg, toggleOrgBar, isOrgBarOpen, addProtectedRef, removeProtectedRef } = useOrgs();
//   const orgBtnRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     if (orgBtnRef.current) {
//       addProtectedRef(orgBtnRef);
//     }

//     return () => {
//       if (orgBtnRef.current) {
//         removeProtectedRef(orgBtnRef);
//       }
//     };
//   }, [orgBtnRef, addProtectedRef, removeProtectedRef]);

//   const findMemberByTitle = (eBoard: Eboard[], title: string): Eboard | undefined => {
//     return eBoard.find((member: Eboard) => member.title === title);
//   };

//   const president = activeOrg ? findMemberByTitle(activeOrg.eBoard, 'President') : undefined;
//   const vicePresident = activeOrg ? findMemberByTitle(activeOrg.eBoard, 'Vice-President') : undefined;
//   const remainingEboard = activeOrg ? activeOrg.eBoard.filter((member: Eboard) => member.title !== 'President' && member.title !== 'Vice-President') : [];

//   return (
//     <HeaderContainer $isDarkMode={isDarkMode}>
//       <TopWrapper>
//         <TitleContainer>
//           <TitleWrapper>
//             <ButtonWrapper>
//               <ButtonContainer $isDarkMode={isDarkMode} onClick={toggleOrgBar} ref={orgBtnRef}>
//                 <IconButton
//                   darkModeLogo={CloseDark}
//                   lightModeLogo={CloseLight}
//                   activeDarkLogo={OpenDark}
//                   activeLightLogo={OpenLight}
//                   isActive={isOrgBarOpen}
//                   size={1.8}
//                 />
//               </ButtonContainer>
//             </ButtonWrapper>
//             <Border $type={"org"}>
//               <InnerBorder isDarkMode={isDarkMode} $type={"org"}>
//                 {activeOrg && <UserIcon src={activeOrg.photoUrl} $type={"org"} />}
//               </InnerBorder>
//             </Border>
//             <OrgCodeContainer>
//               <Text variant={"normal"} size={"2rem"} fontWeight={"400"}>
//                 {activeOrg && activeOrg.orgName}
//               </Text>
//             </OrgCodeContainer>

//           </TitleWrapper>
//         </TitleContainer>
//         <OptionIconContainer>
//           <OptionWrapper>
//             <OptionIcon src={isDarkMode ? OptionIconDark : OptionIconLight} />
//           </OptionWrapper>
//         </OptionIconContainer>
//       </TopWrapper>

//       <BottomWrapper>
//         <DataContainer>
//           <InstructorContainer>
//             <Text variant={"normal"} size={"0.9rem"} fontWeight={"500"}>
//               President:
//             </Text>
//             {president && (
//               <AssociationContent $isDarkMode={isDarkMode}>
//                 <Border $type={"leader"}>
//                   <InnerBorder isDarkMode={isDarkMode} $type={"leader"}>
//                     <UserIcon src={president.photoUrl} $type={"leader"} />
//                   </InnerBorder>
//                 </Border>
//                 <NameContainer>
//                   <FullName>
//                     <Text variant="normal" size="0.85rem" fontWeight="350">
//                       {president.name}
//                     </Text>
//                     {president.isVerified && <VerifiedBadge type='org' />}
//                   </FullName>
//                   <Text variant={"transparent"} size="0.8rem" fontWeight="350">
//                     @{president.userName}
//                   </Text>
//                 </NameContainer>
//               </AssociationContent>
//             )}
//           </InstructorContainer>

//           <InstructorContainer>
//             <Text variant={"normal"} size={"0.9rem"} fontWeight={"500"}>
//               Vice-President:
//             </Text>
//             {vicePresident && (
//               <AssociationContent $isDarkMode={isDarkMode}>
//                 <Border $type={"leader"}>
//                   <InnerBorder isDarkMode={isDarkMode} $type={"leader"}>
//                     <UserIcon src={vicePresident.photoUrl} $type={"leader"} />
//                   </InnerBorder>
//                 </Border>
//                 <NameContainer>
//                   <FullName>
//                     <Text variant="normal" size="0.85rem" fontWeight="350">
//                       {vicePresident.name}
//                     </Text>
//                     {vicePresident.isVerified && <VerifiedBadge type='org' />}
//                   </FullName>
//                   <Text variant={"transparent"} size="0.8rem" fontWeight="350">
//                     @{vicePresident.userName}
//                   </Text>
//                 </NameContainer>
//               </AssociationContent>
//             )}
//           </InstructorContainer>
//         </DataContainer>
//       </BottomWrapper>

//       <BottomWrapper>
//         <DataContainer>
//           <TAContainer>
//             <Text variant={"normal"} size={"0.9rem"} fontWeight={"400"}>
//               Executive Board:
//             </Text>
//             <CollaboratorList>
//               {remainingEboard.slice(0, 3).map((member: Eboard) => (
//                 <Collaborator key={member.userName}>
//                   <ClickableWrapper>
//                     <Border $type={"eboard"}>
//                       <InnerBorder isDarkMode={isDarkMode} $type={"eboard"}>
//                         <UserIcon src={member.photoUrl} $type={"eboard"} />
//                       </InnerBorder>
//                     </Border>
//                   </ClickableWrapper>
//                 </Collaborator>
//               ))}
//               {remainingEboard.length > 3 && (
//                 <MoreCollaborators>
//                   <TextWrapper>
//                     <Text variant="normal" size="0.8rem" fontWeight="300">
//                       and
//                     </Text>
//                     <OtherCollaborator>
//                       <Text variant="normal" size="0.8rem" fontWeight="300">
//                         {remainingEboard.length - 3} other.
//                       </Text>
//                     </OtherCollaborator>
//                   </TextWrapper>
//                 </MoreCollaborators>
//               )}
//             </CollaboratorList>
//           </TAContainer>
//         </DataContainer>
//       </BottomWrapper>
//     </HeaderContainer>
//   );
// };

// export default Header;

// const OrgCodeContainer = styled.div`
//   /* flex: 3; */
// `;

// const NameContainer = styled.div`
// `;

// const OptionWrapper = styled.div` 
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.7;
//     transform: scale(1.02);
//   }
//   &:active {
//     transform: scale(1.00);
//   }
//   transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
// `;

// const TitleWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   /* width: 30%; */
//     gap: 0.5rem;
// `;

// const TopWrapper = styled.div`
//   display: flex;
//   align-items: flex-start;
//   flex-direction: row;
//   width: 100%;
// `;

// const OptionIcon = styled.img`
//   width: 2.1rem;
// `;

// const OptionIconContainer = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const CreateIcon = styled.img`
//   width: 1.5rem;
// `;

// const Temp = styled.div`
//   display: flex;
//   flex-direction:row;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
//   gap: 0.8rem;
// `;

// const CreateButtonContainer = styled.div`
//   flex: 1;
//   width: 40%;
//   display: flex;
//   align-items: flex-end;
//   justify-content: flex-end;
// `;

// const CreateButton = styled.div`
//   display: flex;
//   align-items: flex-end;
//   justify-content: flex-end;
//   flex: 1;
// `;

// const BottomWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
// `;

// const ClickableWrapper = styled.div`
//   cursor: pointer;
//   &:hover {
//     opacity: 0.7;
//     transform: scale(1.02);
//   }
//   &:active {
//     transform: scale(1.00);
//   }
//   transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
// `;

// const OtherCollaborator = styled.div`
//   cursor: pointer;
//   &:hover {
//     opacity: 0.7;
//     transform: scale(1.02);
//   }
//   &:active {
//     transform: scale(1.00);
//   }
//   transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
// `;

// const TextWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 0.2rem;
// `;

// const MoreCollaborators = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 0.2rem;
// `;

// const Collaborator = styled.div`
// `;

// const UserIcon = styled.img<{ $type: "eboard" | "leader" | "org" }>`
//   width: ${({ $type }) => ($type === "org" ? "2.5rem" : $type === "eboard" ? "1.6rem" : "1.8rem")};
//   height: ${({ $type }) => ($type === "org" ? "2.5rem" : $type === "eboard" ? "1.6rem" : "1.8rem")};
//   border-radius: 50%;
//   flex-shrink: 0;
// `;

// const InnerBorder = styled.div<{ isDarkMode: boolean; $type: "eboard" | "leader" | "org" }>`
//   background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
//   padding: ${props => (props.$type === "org" ? "1.5px" : props.$type === "eboard" ? "1px" : "1.2px")};
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: background-color 0.3s ease;
// `;

// const Border = styled.div<{ $type: "eboard" | "leader" | "org" }>`
//   background: linear-gradient(to right, #EA8D8D, #A890FE);
//   padding: ${props => (props.$type === "org" ? "2px" : "1.5px")};
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const CollaboratorList = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-start;
//   gap: 0.5rem;
//   margin-top: 0.1rem;
// `;

// const Logo = styled.img`
//   width: 2.2rem;
//   height: auto;
//   border-radius: 50%;
// `;

// const StyledLogo = styled.img<{ $type: 'org' | 'user' }>`
//   width: ${(props) => (props.$type === 'user' ? '1.6rem' : '1.2rem')};
//   height: auto;
// `;

// const VerifiedBadgeContainer = styled.div`
//   display: flex;
//   align-items: flex-start;
// `;

// const VerifiedBadge: React.FC<{ type: 'org' | 'user' }> = ({ type }) => {
//   return (
//     <VerifiedBadgeContainer>
//       <StyledLogo src={VerifiedIcon} alt="Logo" $type={type} />
//     </VerifiedBadgeContainer>
//   );
// };

// const FullName = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 0.3rem;
// `;

// const LogoContainer = styled.div``;
// const AssociationContent = styled.div<{ $isDarkMode: boolean }>`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-start;
//   gap: 0.4rem;
//   cursor: pointer;
//    &:hover {
//       color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
//       background-color: ${({ $isDarkMode }) => $isDarkMode ? '#565454' : '#a0a0a0'};  // subtle background change on hover
//       transition: color 0.3s, background-color 0.3s, opacity 0.3s ease-in-out;
//       opacity: 0.8;
//       transform: scale(1.05); 
//     }
  
//     &:active {
//       background-color: ${({ $isDarkMode }) => $isDarkMode ? '#919191' : '#595858'};  // deeper background on click
//       transition: color 0.2s, background-color 0.2s;
//       transform: scale(1.00);
//     }
//   padding: 0.2rem 0.4rem;
//   border-radius: 5px;
//   transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
// `;
// const DataContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex: 1;
// `;

// const TAContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.3rem;
//   width: 100%;
// `;

// const InstructorContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   gap: 0.3rem;
//   width: 100%;
// `;

// const ButtonContainer = styled.div<{ $isDarkMode: boolean }>`
//   display: flex;
//   align-items: center;
//   justify-content: center;
  
//   width: 80%;
//   height: 100%;
//   border-radius: 0.5rem;
//   position: relative;
//   z-index: 4;

//   &:hover {
//     color: ${({ $isDarkMode }) => ($isDarkMode ? 'white' : 'black')};
//     background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#565454' : '#a0a0a0')};
//     opacity: 0.7;
//     transform: scale(1.05);
//   }

//   &:active {
//     background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#919191' : '#595858')};
//     transform: scale(1.00);
//   }
//   transition: transform 0.2s ease-in-out, color 0.3s, opacity 0.3s ease-in-out;
// `;

// const ButtonWrapper = styled.div`
//   /* flex: 1.5; */
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
// `;

// const TitleContainer = styled.div`
//   flex: 4;
// `;

// const HeaderContainer = styled.div<{ $isDarkMode: boolean }>`
//   display: flex;
//   width: 95%;
//   height: 100%;
//   align-items: flex-start;
//   justify-content: center;
//   gap: 0.8rem;
//   flex-direction: column;
//   border-radius: 10px;
//   box-shadow: 0 2px 15px ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(164, 164, 164, 0.2)' : 'rgba(0, 0, 0, 0.2)')};
//   border: ${({ $isDarkMode }) =>
//     $isDarkMode ? '1px solid rgba(248, 197, 255, 0.201)' : '1px solid rgba(60, 38, 63, 0.201)'};
//   padding: 0.5rem 1rem;
// `;
