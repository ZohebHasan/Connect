import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import JobIconDark from "../../../../../assets/jobDark.png";
import JobIconLight from "../../../../../assets/jobLight.png";


const Header: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (

        <ExperienceHeader>
            <Wrapper>
                <IconContainer>
                    <Icon2Container>
                        <BorderContainer>
                            <BorderImageContainer>
                                <BorderIcon src={isDarkMode ? JobIconLight : JobIconDark} />
                            </BorderImageContainer>
                            <TopImageContainer>
                                <Icon src={isDarkMode ? JobIconDark : JobIconLight} />
                            </TopImageContainer>
                        </BorderContainer>
                    </Icon2Container>
                    <Icon1Container>
                        <Icon src={isDarkMode ? JobIconDark : JobIconLight} />
                    </Icon1Container>
                </IconContainer>
                <TextContainer>
                    <Text variant={"normal"} size={"1.6rem"} fontWeight={"400"}>
                        Experiences
                    </Text>
                </TextContainer>
            </Wrapper>
        </ExperienceHeader>

    );
};

export default Header;



const ExperienceHeader = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
`;


const IconContainer = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 2.5rem;
    /* background-color: pink; */
`;

const Icon1Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    z-index: 0;
`;

const Icon2Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

`;

const TextContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
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