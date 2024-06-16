import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import ResearchDark from "../../../../../assets/researchDark.png"
import ResearchLight from "../../../../../assets/researchLight.png"

import LeftToRightText from '../../../../../ConnectUI_web/common/texts/animated/leftToRight';


const Header: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <ResearchHeader>
            <Wrapper>
                <IconContainer>
                    <Icon2Container>
                        <BorderContainer>
                            <BorderImageContainer>
                                <BorderIcon src={isDarkMode ? ResearchLight : ResearchDark} />
                            </BorderImageContainer>
                            <TopImageContainer>
                                <Icon src={isDarkMode ? ResearchDark : ResearchLight} />
                            </TopImageContainer>
                        </BorderContainer>
                    </Icon2Container>
                    <Icon1Container>
                        <Icon src={isDarkMode ? ResearchDark : ResearchLight} />
                    </Icon1Container>
                </IconContainer>
                <TextContainer>
                    <Text variant={"normal"} size={"1.6rem"} fontWeight={"400"}>
                        Research and publications
                    </Text>
                </TextContainer>
            </Wrapper>
        </ResearchHeader>

    );
};

export default Header;



const ResearchHeader = styled.div`
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
    flex: 0.7;
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
    flex: 3.5;
    /* background-color: red; */
   
`;

const Wrapper = styled.div`
    display: flex;
    width: 50%;
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
    width:1.9rem;
    height: 1.9rem;

`;

const Icon = styled.img`
    width: 1.8rem;
    height: 1.8rem;
`;