import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import AwardDark from "../../../../../assets/awardDark.png"
import AwardLight from "../../../../../assets/awardLight.png"

import LeftToRightText from '../../../../../ConnectUI_web/common/texts/animated/leftToRight';


const Header: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <AwardHeader>
            <Wrapper>
                <IconContainer>
                    <Icon2Container>
                        <BorderContainer>
                            <BorderImageContainer>
                                <BorderIcon src={isDarkMode ? AwardLight : AwardDark} />
                            </BorderImageContainer>
                            <TopImageContainer>
                                <Icon src={isDarkMode ? AwardDark : AwardLight} />
                            </TopImageContainer>
                        </BorderContainer>
                    </Icon2Container>
                    <Icon1Container>
                        <Icon src={isDarkMode ? AwardDark : AwardLight} />
                    </Icon1Container>
                </IconContainer>
                <TextContainer>
                    <Text variant={"normal"} size={"1.6rem"} fontWeight={"400"}>
                        Awards
                    </Text>
                </TextContainer>
            </Wrapper>
        </AwardHeader>

    );
};

export default Header;



const AwardHeader = styled.div`
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
    flex: 0.9;
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
    flex: 3;
`;

const Wrapper = styled.div`
    display: flex;
    width: 30%;
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
    width: 1.9rem;
    height: 1.9rem;

`;

const Icon = styled.img`
    width: 1.8rem;
    height: 1.8rem;
`;