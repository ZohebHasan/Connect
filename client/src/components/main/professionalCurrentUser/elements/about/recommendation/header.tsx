import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';

import RecommendationDark from "../../../../../assets/recommendationDark.png"
import RecommendationLight from "../../../../../assets/recommendationLight.png"


const Header: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (

        <RecommendationHeader>
            <Wrapper>
                <IconContainer>
                    <Icon2Container>
                        <BorderContainer>
                            <BorderImageContainer>
                                <BorderIcon src={isDarkMode ? RecommendationLight : RecommendationDark} />
                            </BorderImageContainer>
                            <TopImageContainer>
                                <Icon src={isDarkMode ? RecommendationDark : RecommendationLight} />
                            </TopImageContainer>
                        </BorderContainer>
                    </Icon2Container>
                    <Icon1Container>
                        <Icon src={isDarkMode ? RecommendationDark : RecommendationLight} />
                    </Icon1Container>
                </IconContainer>
                <TextContainer>
                    <Text variant={"normal"} size={"1.6rem"} fontWeight={"400"}>
                        Recommendations
                    </Text>
                </TextContainer>
            </Wrapper>
        </RecommendationHeader>

    );
};

export default Header;



const RecommendationHeader = styled.div`
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
    height: 0.8rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    z-index: 0;
`;

const Icon2Container = styled.div`
    position: absolute;
    width: 70%;
    height:0.8rem;
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
    width:35%;
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