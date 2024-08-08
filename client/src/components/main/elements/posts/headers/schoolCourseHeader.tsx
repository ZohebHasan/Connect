import React from 'react';

import styled, { css } from 'styled-components';

import StoryOptionDark from '../../../../assets/storyOptionsDark.png';
import StoryOptionLight from '../../../../assets/storyOptionsLight.png';
import VerifiedIcon from '../../../../assets/verified.png';
import Text from '../../../../ConnectUI_web/common/texts/static';
import SchoolIconDark from '../../../../assets/schoolUserDark.png';
import SchoolIconLight from '../../../../assets/schoolUserLight.png';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';

import LeftToRightText from '../../../../ConnectUI_web/common/texts/animated/leftToRight';

interface User {
    name?: string;
    userName?: string;
    link: string;
    photoUrl: string;
    isVerified?: boolean;
    userType: 'instructor' | 'student' | 'ta';
}

interface SchoolHeaderProps {
    postedBy: User;
    datePosted: Date;
    postType: 'normal' | 'anonymous';
    display: 'profile' | 'feed';
    isQuestion: boolean;
    tag: string;
}

const calculateElapsedTime = (datePosted: Date): string => {
    const now = new Date();
    const elapsed = now.getTime() - datePosted.getTime();

    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(elapsed / (1000 * 60));
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const months = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 365));

    if (seconds < 60) {
        return seconds === 0 ? 'Just now' : `${seconds}s ago`;
    } else if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else if (days < 30) {
        return `${days}d ago`;
    } else if (months < 12) {
        return `${months}mo ago`;
    } else {
        return `${years}y ago`;
    }
};

const getRoleString = (postedBy: User): string | null => {
    if (postedBy.userType === 'ta') {
        return "Teaching Assistant"
    } else if (postedBy.userType === 'instructor') {
        return 'Instructor';
    } else {
        return "";
    }
};

const SchoolHeader: React.FC<SchoolHeaderProps> = ({ postedBy, datePosted, postType, display, isQuestion, tag }) => {
    const { isDarkMode } = useDarkMode();
    const elapsedTime = calculateElapsedTime(datePosted);

    const role = getRoleString(postedBy);
    return (
        <Top>
            <HeaderContainer>
                <UserAndTimeContainer>
                    <Wrapper $isQuestion={isQuestion} $postType={postType}>
                        <UserContainer $postType={postType}>
                            <Border>
                                <AvatarContainer>
                                    <InnerBorder $isDarkMode={isDarkMode}>
                                        {postType === 'anonymous' ?
                                            <AnonymousPhoto src={isDarkMode ? SchoolIconDark : SchoolIconLight} $isDarkMode={isDarkMode} />
                                            : <Avatar src={postedBy.photoUrl} />
                                        }

                                    </InnerBorder>
                                </AvatarContainer>
                            </Border>
                            <UserInfoContainer>
                                <UserIdContainer>
                                    <TextContainer>
                                        <Text variant={'normal'} size={'1rem'} fontWeight="300">
                                            {postType === 'anonymous' ? "Anonymous User" : postedBy.name}
                                        </Text>
                                        {postType !== 'anonymous' && postedBy.isVerified && <VerifiedBadge />}
                                    </TextContainer>
                                    {postType !== 'anonymous' &&
                                        <UploadTimeContainer>
                                            <Text variant={"transparent"} size={'0.8rem'} fontWeight="300">
                                                @{postedBy.userName}
                                            </Text>
                                        </UploadTimeContainer>
                                    }

                                </UserIdContainer>
                            </UserInfoContainer>
                        </UserContainer>

                        <PostDataContainer>
                            {display === 'feed' ? (
                                <Text variant={"normal"} size={'1rem'} fontWeight="400">
                                    {isQuestion ? "asked in CSE316" : "in CSE316"}
                                </Text>
                            ) : (
                                <Text variant={"normal"} size={'1rem'} fontWeight="400">
                                    {isQuestion ? "asked a question" : ""}
                                </Text>
                            )}


                            <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                •
                            </Text>
                            <Text variant={'transparent'} size={'0.9rem'} fontWeight="300">
                                {elapsedTime}
                            </Text>
                        </PostDataContainer>
                    </Wrapper>
                </UserAndTimeContainer>
                <DataAndOptionContainer>
                    {tag &&
                        <TagContainer $isDarkMode = {isDarkMode}>
                            <Text variant={"normal"} size={'1rem'} fontWeight="400">
                                {tag}
                            </Text>
                        </TagContainer>
                    }
                    {postedBy.userType &&
                        <LeftToRightText size={"1rem"}>
                            {role}
                        </LeftToRightText>
                    }
                    <Text variant={"school"} size={'1rem'} fontWeight="300">
                        School
                    </Text>
                    <OptionButtonContainer>
                        <OptionButtonWrapper>
                            <MediumIconButton src={isDarkMode ? StoryOptionDark : StoryOptionLight} />
                        </OptionButtonWrapper>
                    </OptionButtonContainer>
                </DataAndOptionContainer>
            </HeaderContainer>
        </Top>
    );
};

export default SchoolHeader;

const TagContainer = styled.div <{$isDarkMode: boolean}>`
    border: 0.5px solid white;
    border-radius: 5px;
    /* box-shadow: 0 2px 15px ${({ $isDarkMode }) => ($isDarkMode ? 'rgba(164, 164, 164, 0.2)' : 'rgba(0, 0, 0, 0.2)')}; */
    border: 1px solid #d08ebc79;
    padding: 0.2rem 0.4rem;
`

const DataAndOptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
`

const UserTypeContainer = styled.div<{ $isDarkMode: boolean }>`
    flex: 5;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    /* background-color: pink; */
    
`

const PostDataContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
`;

const VerifiedBadge: React.FC = () => {
    return (
        <VerifiedBadgeContainer>
            <StyledLogo src={VerifiedIcon} alt="Verified" />
        </VerifiedBadgeContainer>
    );
};

const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.2rem;
`;

const UserIdWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.3rem;
`;

const UserIdContainer = styled.div`
    flex-direction: row;
    flex: 1;
    width: 100%;
`;

const OccupationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const InnerBorder = styled.div<{ $isDarkMode: boolean }>`
    background-color: ${props => (props.$isDarkMode ? 'black' : 'white')};
    padding: 2px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Border = styled.div`
    background: linear-gradient(to right, #EA8D8D, #A890FE);
    padding: 1.5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const VerifiedBadgeContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const StyledLogo = styled.img`
    width: 1.2rem;
    height: 1.2rem;
`;

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* margin-bottom: 1rem; */
    /* background-color: pink; */
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Wrapper = styled.div<{ $isQuestion: boolean; $postType: 'normal' | 'anonymous' }>`
  display: flex;
  width: 100%;
  align-items: ${props => (props.$postType === 'anonymous' ? 'center' : 'flex-start')};
  justify-content: flex-start;
  gap: ${props => (props.$isQuestion ? '0.5rem' : '0rem')};
  flex-direction: row;
`;


const UserContainer = styled.div<{ $postType: 'normal' | 'anonymous' }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;

  ${({ $postType }) =>
        $postType !== 'anonymous' &&
        css`
      cursor: pointer;
      &:hover {
        opacity: 0.7;
        transform: scale(1.03);
      }
      &:active {
        transform: scale(0.98);
      }
    `}
`;

const AvatarContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Avatar = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
`;

const AnonymousPhoto = styled.img <{ $isDarkMode: boolean }>`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
`

const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;

const UploadTimeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const PostTypeContainer = styled.div<{ $userType?: 'instructor' | 'TA' }>`
  flex: 2;
  display: flex;
  align-items: flex-start;
  justify-content: ${props => (props.$userType ? 'center' : 'flex-end')};
  /* background-color: red; */
`;

const OptionButtonContainer = styled.div`
    /* flex: 0.5; */
    display: flex;
    align-items: flex-start;
    justify-content: center;
    /* background-color: orange; */
`;

const OptionButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    /* width: 70%; */
    justify-content: flex-end;
    /* background-color: blue; */
    cursor: pointer;
    &:hover {
    opacity: 0.7;
    transform: scale(1.05);
    }
    &:active {
    transform: scale(0.96);
    }
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;

const MediumIconButton = styled.img`
    width: 1.3rem;
    height: 1.3rem;
`;

const UserAndTimeContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* background-color: blue; */
`;
