import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';
import LeadershipIconDark from "../../../../../assets/controlDark.png";
import LeadershipIconLight from "../../../../../assets/controlLight.png";


import LeftToRightText from '../../../../../ConnectUI_web/common/texts/animated/leftToRight';

const Header: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (

        <LeadershipHeader>
            <Wrapper>
                <IconContainer>
                    <Icon2Container>
                        <BorderContainer>
                            <BorderImageContainer>
                                <BorderIcon src={isDarkMode ? LeadershipIconLight : LeadershipIconDark} />
                            </BorderImageContainer>
                            <TopImageContainer>
                                <Icon src={isDarkMode ? LeadershipIconDark : LeadershipIconLight} />
                            </TopImageContainer>
                        </BorderContainer>
                    </Icon2Container>
                    <Icon1Container>
                        <Icon src={isDarkMode ? LeadershipIconDark : LeadershipIconLight} />
                    </Icon1Container>
                </IconContainer>
                <TextContainer>
                    <Text variant={"normal"} size={"1.6rem"} fontWeight={"400"}>
                        Leadership and extra curricular activities
                    </Text>
                </TextContainer>
            </Wrapper>
        </LeadershipHeader>

    );
};

export default Header;



const LeadershipHeader = styled.div`
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
    flex: 1;
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
    flex: 8;
`;

const Wrapper = styled.div`
    display: flex;
    width:70%;
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
    width: 2.1rem;
    height: 2.1rem;

`;

const Icon = styled.img`
    width: 2rem;
    height: 2rem;
`;