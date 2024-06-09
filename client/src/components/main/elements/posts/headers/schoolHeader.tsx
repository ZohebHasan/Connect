import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import StoryOptionDark from '../../../assets/storyOptionsDark.png';
import StoryOptionLight from '../../../assets/storyOptionsLight.png';


import VerifiedIcon from '../../../assets/verified.png';

import Text from '../../../../ConnectUI_web/common/texts/static';


import DummyPhoto1 from '../../../../dummies/Adnan.jpeg';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';




const SchoolHeader: React.FC<{ userName: string; isVarified: boolean }> = ({ userName, isVarified }) => {
    const { isDarkMode } = useDarkMode();

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };

    return (
        <Top>
            <HeaderContainer>
                <UserAndTimeContainer>
                    <Wrapper>
                        <User>
                            <Border>
                                <AvatarContainer>
                                    <InnerBorder $isDarkMode={isDarkMode}>
                                        <Avatar src={DummyPhoto1} />
                                    </InnerBorder>
                                </AvatarContainer>
                            </Border>
                            <UserInfoContainer>
                                <UserIdContainer>
                                    <UserIdWrapper>
                                        <TextContainer>
                                            <Text variant={'normal'} size={'1rem'} fontWeight="300">
                                                Kamrul Hassan
                                            </Text>
                                            {isVarified && <VerifiedBadge />}
                                        </TextContainer>

                                        <TextContainer>
                                            <Text variant={"normal"} size={'1rem'} fontWeight="400">
                                                in CSE316
                                            </Text>
                                        </TextContainer>
                                        <Text variant={'transparent'} size={'1rem'} fontWeight="300">
                                            •
                                        </Text>
                                        <UploadTimeContainer>
                                            <Text variant={"transparent"} size={'0.9rem'} fontWeight="300">
                                                @{truncateText(userName, 11)}
                                            </Text>

                                        </UploadTimeContainer>
                                    </UserIdWrapper>
                                </UserIdContainer>
                                <OccupationContainer>
                                    <Text variant={'transparent'} size={'0.8rem'} fontWeight="300">
                                        2h ago
                                    </Text>
                                </OccupationContainer>
                            </UserInfoContainer>
                        </User>
                    </Wrapper>
                </UserAndTimeContainer>


                <PostTypeContainer>
                    <Text variant={"school"} size={'1rem'} fontWeight="300">
                        School
                    </Text>
                </PostTypeContainer>

                <OptionButtonContainer>
                    <OptionButtonWrapper>
                        <MediumIconButton src={isDarkMode ? StoryOptionDark : StoryOptionLight} />
                    </OptionButtonWrapper>
                </OptionButtonContainer>

            </HeaderContainer>
        </Top>
    );
};

export default SchoolHeader;

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
    align-items: center;
    justify-content: flex-start;
`

const UserIdWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.3rem;
`

const UserIdContainer = styled.div`
    flex-direction: row;
    flex: 1;
    width: 100%;
`
const OccupationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`

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
`
const VerifiedBadgeContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const StyledLogo = styled.img`
    width: 1.6rem;
    height: 1.6rem;
`;

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.8rem;
    flex-direction: row;
`;

const User = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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

const PostTypeContainer = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const OptionButtonContainer = styled.div`
    flex: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptionButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 70%;
    justify-content: flex-end;
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
`;
