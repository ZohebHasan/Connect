import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LogoNav from "../containers/controlFeatureIcon";
import Text from '../../ConnectUI_web/common/texts/static';


import ControlLight from "../assets/controlLight.png";
import ControlDark from "../assets/controlDark.png";


import UserLight from "../assets/userLight.png";
import UserDark from "../assets/userDark.png";


import SecurityLight from "../assets/securityLight.png";
import SecurityDark from "../assets/securityDark.png";


import EarningLight from "../assets/earningLight.png";
import EarningDark from "../assets/earningDark.png";





import { useDarkMode } from '../../../contexts/DarkMode/DarkMode';



const LeftBarButtons: React.FC = () => {
    const { isDarkMode } = useDarkMode();

    return (
        <>
        <ControlFeatures>
            <ButtonWrapper>
                <LogoContainer>
                    <LogoNav
                        darkModeLogo={ControlDark}
                        lightModeLogo={ControlLight}
                        size= {1.4}
                    />
                    <Text size={"0.8rem"} fontWeight={"300"}>Account Control</Text>
                </LogoContainer>
            </ButtonWrapper>


            <ButtonWrapper>
                <LogoContainer>
                    <LogoNav
                        darkModeLogo={UserDark}
                        lightModeLogo={UserLight}
                        size= {1.2}
                    />
                    <Text size={"0.8rem"} fontWeight={"300"}>User Information</Text>
                </LogoContainer>
            </ButtonWrapper>

            <ButtonWrapper>
                <LogoContainer>
                    <LogoNav
                        darkModeLogo={SecurityDark}
                        lightModeLogo={SecurityLight}
                        size= {1.2}
                    />
                    <Text size={"0.8rem"} fontWeight={"300"}>Password</Text>
                </LogoContainer>
            </ButtonWrapper>
            <ButtonWrapper>
                <LogoContainer>
                    <LogoNav
                        darkModeLogo={EarningDark}
                        lightModeLogo={EarningLight}
                        size= {1.2}
                    />
                    <Text size={"0.8rem"} fontWeight={"300"}>User Earnings</Text>
                </LogoContainer>
            </ButtonWrapper>
            </ControlFeatures>
        </>
    );
};

export default LeftBarButtons;


const ControlFeatures = styled.div`
    // background-color: red;
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction : column;
    opacity: 0.7;
`

const ButtonWrapper = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`


const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 0.7rem;
    // background-color: red;

`;









