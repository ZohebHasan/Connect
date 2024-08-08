import React  from 'react';
import styled from 'styled-components';

import HeaderContainer from '../../ConnectUI_web/templetes/headerTemplete'

import Logo from '../../ConnectUI_web/common/logo/logo'
import DarkLightToggle from '../../ConnectUI_web/common/darkLightToggle/darkLightToggle';
import OptionButton from '../../ConnectUI_web/common/optionButton/optionButton'


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
            {/* <OptionButtonContainer>
              <OptionButtonWrapper>
                <OptionButton/>
              </OptionButtonWrapper>   
            </OptionButtonContainer> */}
        </HeaderContainer>
      </>
  );
};

export default HeaderSelectLang;



const LogoContainer = styled.div`
flex: 5.5;
display:flex;
align-items: center;
position: relative;
padding-left: 1.25rem; 
z-index: 3;         
padding-top: 0.1875rem; 
padding-bottom: 0.1875rem; 
// background-color:blue;

`;

const DarkLightToggleContainer = styled.div`
flex: 3;
display: flex;
align-items: center;
justify-content: flex-end;
// background-color:pink;
margin-right: 2rem;
`;

const OptionButtonWrapper = styled.div`
display: flex;
width: 60%;
align-items: center;
justify-content: flex-end;

`
const OptionButtonContainer = styled.div`
flex: 2;
display: flex;
justify-content: center;
align-items: center;

`;