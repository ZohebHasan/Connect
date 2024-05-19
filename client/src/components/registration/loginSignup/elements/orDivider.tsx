import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { useLanguage } from '../../../../contexts/Language/Language';
import Text from "../../../ConnectUI_web/common/texts/static"

interface OrDividerProps {
    flex: number;
}


const OrDivider: React.FC <OrDividerProps> = ({flex}) => {
    const { isDarkMode } = useDarkMode();
    const { language } = useLanguage(); //for later

    return(
        <DividerContainer $flex = {flex}>
            <Line $isDarkMode = {isDarkMode} />
            <OrText>
                <Text size={"17px"} variant={"normal"} fontWeight={"100"}>
                    or
                </Text>
            </OrText>
            <Line $isDarkMode = {isDarkMode} />
        </DividerContainer>
    );


}

export default OrDivider;



const DividerContainer = styled.div<{$flex: number;}>`
  flex: ${({ $flex }) => $flex};  
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 90%;
`;

const Line = styled.div<{ $isDarkMode: boolean }>`
  flex: 1;
  height: 1px;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#c1c1c1' : '#3e3e3e'};
`;

const OrText = styled.span`
  margin: 0 10px;
`;