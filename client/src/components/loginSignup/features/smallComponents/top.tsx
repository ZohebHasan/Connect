import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { Link } from 'react-router-dom';


import Text from '../../../ConnectUI_web/common/texts/static';
import ContainerTransparent from '../../../ConnectUI_web/templetes/containerTransparent';
import FeaturesList from './featuresList';





function FeaturesText() {
    return (
        <TextContainer>
            <Text size={"50px"} variant={"normal"} fontWeight={"400"}>
                Connect's four
            </Text>
            <Text size={"50px"} variant={"gradient"} fontWeight={"500"}>
              revolutionary
            </Text>
            <Text size={"50px"} variant={"normal"} fontWeight={"400"}>
                features.
            </Text>
        </TextContainer>
    );
}

const TextContainer = styled.div`
    flex: 0.5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 3%;
    gap: 15px;
`




const Top: React.FC = () => {
  
    const {isDarkMode} = useDarkMode();
    return(
            <TopContainer>
                <FeaturesText/>
                <ContainerTransparent flex={2.5}>
                    <FeaturesList/>
                </ContainerTransparent> 
            </TopContainer>
    );
  }

export default Top;


const TopContainer = styled.div`
    flex:7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 65%;   
`
