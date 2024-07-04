import React, { useState } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import { useNavigate } from 'react-router-dom';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import OptionIconDark from "../../../../../assets/optionHorizontalDark.png";
import OptionIconLight from "../../../../../assets/optionHorizontalLight.png";
import VerifiedIcon from "../../../../../assets/verified.png";

import { Course, useCourses } from '../../../../../../contexts/schoolProfile/courseContext';

interface HeaderProps {
  course: Course;
}

const Header: React.FC<HeaderProps> = ({ course }) => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { setActiveCourse } = useCourses();
  const [isNeutralized, setIsNeutralized] = useState(false);

  const handleNavigation = () => {
    if (!isNeutralized) {
      const maskedCourseCode = course.courseCode.toLowerCase().replace(/\s+/g, '');
      setActiveCourse(course.courseCode); // Set the active course in context
      navigate(`course/${maskedCourseCode}`);
    }
  };

  const handleNeutralize = (neutralize: boolean) => (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsNeutralized(neutralize);
  };

  return (
    <HeaderContainer
      $isDarkMode={isDarkMode}
      onClick={handleNavigation}
      $isNeutralized={isNeutralized}
    >
      <TopWrapper>
        <TitleContainer>
          <TitleWrapper>
            <CourseCodeContainer>
              <Text variant={"normal"} size={"2rem"} fontWeight={"500"}>
                {course.courseCode}
              </Text>
            </CourseCodeContainer>
          </TitleWrapper>
          <Text variant={"normal"} size={"1.3rem"} fontWeight={"300"}>
            {course.courseName}
          </Text>
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
              Instructor:
            </Text>
            <AssociationContent
              onMouseEnter={handleNeutralize(true)}
              onMouseLeave={handleNeutralize(false)}
              onClick={handleNeutralize(true)}
              $isDarkMode = {isDarkMode}
            >
              <Border $type={"instructor"}>
                <InnerBorder isDarkMode={isDarkMode} $type={"instructor"}>
                  <UserIcon src={course.instructor.photoUrl} $type={"instructor"} />
                </InnerBorder>
              </Border>
              <NameContainer>
                <FullName>
                  <Text variant="normal" size="0.85rem" fontWeight="350">
                    {course.instructor.name}
                  </Text>
                  {course.instructor.isVerified && <VerifiedBadge type='org' />}
                </FullName>
                <Text variant={"transparent"} size="0.8rem" fontWeight="350">
                  @{course.instructor.userName}
                </Text>
              </NameContainer>
            </AssociationContent>
          </InstructorContainer>

          <TAContainer>
            <Text variant={"normal"} size={"0.9rem"} fontWeight={"400"}>
              Teaching Assistants:
            </Text>
            <CollaboratorList>
              {course.TAs.slice(0, 3).map((ta) => (
                <Collaborator key={ta.userName}>
                  <ClickableWrapper
                    onMouseEnter={handleNeutralize(true)}
                    onMouseLeave={handleNeutralize(false)}
                    onClick={handleNeutralize(true)}
                  >
                    <Border $type={"ta"}>
                      <InnerBorder isDarkMode={isDarkMode} $type={"ta"}>
                        <UserIcon src={ta.photoUrl} $type={"ta"} />
                      </InnerBorder>
                    </Border>
                  </ClickableWrapper>
                </Collaborator>
              ))}
              {course.TAs.length > 3 && (
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
                        {course.TAs.length - 3} other.
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

const CourseCodeContainer = styled.div`
  flex: 3;
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
  width: 30%;
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

const UserIcon = styled.img<{ $type: "ta" | "instructor" }>`
  width: ${({ $type }) => ($type === "ta" ? "1.6rem" : "1.8rem")};
  height: ${({ $type }) => ($type === "ta" ? "1.6rem" : "1.8rem")};
  border-radius: 50%;
  flex-shrink: 0;
`;

const InnerBorder = styled.div<{ isDarkMode: boolean; $type: "ta" | "instructor" }>`
  background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
  padding: ${props => (props.$type === "ta" ? "1px" : "1.2px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
`;

const Collaborator = styled.div``;

const Border = styled.div<{ $type: "ta" | "instructor" }>`
  background: linear-gradient(to right, #EA8D8D, #A890FE);
  padding: ${props => (props.$type === "ta" ? "1.5px" : "1.5px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const AssociationContent = styled.div<{$isDarkMode: boolean}>`
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
  /* background-color: red; */
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
