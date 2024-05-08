import React from 'react';
import styled from 'styled-components';

import HeaderContainer from "../../ConnectUI_web/templetes/headerTemplete"
import DarkLightToggle from '../../ConnectUI_web/common/darkLightToggle/darkLightToggle';

const HeaderLogin: React.FC = () => {
    return (
        <HeaderContainer variant = {"hidden"}>
            <DarkLightToggleContainer>
                <DarkLightToggle />
            </DarkLightToggleContainer>
        </HeaderContainer>
    );
};

export default HeaderLogin;


const DarkLightToggleContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    padding-right: 10px;
    margin-right: 10px;
    justify-content: flex-end;
    width: 100%;
`;