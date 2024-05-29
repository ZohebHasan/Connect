import React  from 'react';
import styled from 'styled-components';

import HeaderContainer from '../ConnectUI_web/templetes/headerTemplete'


import Logo from '../ConnectUI_web/common/logo/logo'
import DarkLightToggle from '../ConnectUI_web/common/darkLightToggle/darkLightToggle';
import OptionButton from '../ConnectUI_web/common/optionButton/optionButton'



const HeaderSelectLang: React.FC = () => {
    return (
        <>

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
  flex: 4.3;
  display:flex;
  align-items: center;
  position: relative;
  padding-left: 1.25rem; 
  z-index: 3;         
  padding-top: 0.1875rem; 
  padding-bottom: 0.1875rem; 
  
`;

const DarkLightToggleContainer = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OptionButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items:center;
  margin-right: 0.3rem;
`;
