import React from "react";
import styled from 'styled-components';

import BottomContainer from "../../../ConnectUI_web/containers/loginSignup/bottom";
import CurrentLanguage from '../../../ConnectUI_web/common/currentLanguage/currentLanguage';
import ConnaButton from "../../../ConnectUI_web/common/conna/connaButton";

interface BottomProps {
    flex: number; 
}


const Bottom: React.FC<BottomProps> = ({ flex }) => {
    return (
        <BottomContainer flex={flex}>
            <CurrentLanguageContainer>
                <CurrentLanguage/>
            </CurrentLanguageContainer>
            <ConnaContainer>
                <ConnaButton/>
            </ConnaContainer>
        </BottomContainer>
    );
};

export default Bottom;


const CurrentLanguageContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ConnaContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    margin-right: 7%;
`;


