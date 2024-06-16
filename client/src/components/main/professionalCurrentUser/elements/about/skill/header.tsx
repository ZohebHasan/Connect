import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import SkillDark from "../../../../../assets/skillDark.png"
import SkillLight from "../../../../../assets/skillLight.png"

import LeftToRightText from '../../../../../ConnectUI_web/common/texts/animated/leftToRight';


const Header: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <SkillHeader>
            <Wrapper>
                <IconContainer>
                    <Icon2Container>
                        <BorderContainer>
                            <BorderImageContainer>
                                <BorderIcon src={isDarkMode ? SkillLight : SkillDark} />
                            </BorderImageContainer>
                            <TopImageContainer>
                                <Icon src={isDarkMode ? SkillDark : SkillLight} />
                            </TopImageContainer>
                        </BorderContainer>
                    </Icon2Container>
                    <Icon1Container>
                        <Icon src={isDarkMode ? SkillDark : SkillLight} />
                    </Icon1Container>
                </IconContainer>
                <TextContainer>
                    <Text variant={"normal"} size={"1.6rem"} fontWeight={"400"}>
                        Skills and Expertise
                    </Text>
                </TextContainer>
            </Wrapper>
        </SkillHeader>

    );
};

export default Header;



const SkillHeader = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
`;


const IconContainer = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    flex:1;
`;

const Icon1Container = styled.div`
    position: absolute;
    width: 70%;
    height: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    z-index: 0;
`;

const Icon2Container = styled.div`
    position: absolute;
    width: 70%;
    height:1rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
`;

const TextContainer = styled.div`
    display: flex;
    flex: 8;
`;

const Wrapper = styled.div`
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: center;
`;

const BorderContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BorderImageContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const TopImageContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const BorderIcon = styled.img`
    width: 1.7rem;
    height: 1.7rem;

`;

const Icon = styled.img`
    width: 1.6rem;
    height: 1.6rem;
`;