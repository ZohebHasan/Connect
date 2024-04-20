import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import HeaderContainer from '../../ConnectUI_web/templetes/headerTemplete'


import Logo from '../../ConnectUI_web/common/logo/logo'
import DarkLightToggle from '../../ConnectUI_web/common/darkLightToggle/darkLightToggle';
import OptionButton from '../../ConnectUI_web/common/optionButton/optionButton'
import Sidebar from '../sidebar';


const HeaderSelectLang: React.FC = () => {
    return (
        <>
          <Sidebar />
          <HeaderContainer variant={"visible"}>
              <LogoContainer>
                  <Logo />
              </LogoContainer>
              <DarkLightToggleContainer >
                  <DarkLightToggle />
              </DarkLightToggleContainer>
              <OptionButtonContainer>
                  <OptionButton/>
              </OptionButtonContainer>
          </HeaderContainer>
        </>
    );
};

export default HeaderSelectLang;

const LogoContainer = styled.div`
  flex: 8;
  display:flex;
  align-items: center;
  position: relative;
  // background-color: transparent;
  padding-left: 20px;
  z-index: 3;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const DarkLightToggleContainer = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 40%;
`;

const OptionButtonContainer = styled.div`
  flex: 1;
  padding: 0px 20px 0px 5px;
`;
