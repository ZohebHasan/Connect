import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../../contexts/Language/Language';

import BodyContainer from '../../ConnectUI_web/templetes/bodyTemplete';

import Greetings from './smallComponents/greetings';
import DirectionText from './smallComponents/textAnimation';
import LanguagesDropDown from './smallComponents/languagesDropdown';

import TransparentButton from '../../ConnectUI_web/common/buttons/button1';
import ConnaButton from '../../ConnectUI_web/common/conna/connaButton';



const Top: React.FC = () => {
  return (
    <TopContainer>
      <GreetingDropDownTextContainer>
        <Greetings /> 
        <DropDownTextContainer>
          <DirectionText/> 
        </DropDownTextContainer>           
      </GreetingDropDownTextContainer>
      <DropDownContainer> 
        <LanguagesDropDown />
      </DropDownContainer>
    </TopContainer>
  );
}

const Bottom: React.FC = () => {
    const { changeLanguage } = useLanguage(); 
    return (
        <BottomContainer>
            <TransparentButtonContainer>
                <TransparentButton  to="/login" onClick={() => changeLanguage('en-US')}>
                    Skip (English)
                </TransparentButton>
            </TransparentButtonContainer>
            <ConnaContainer>
                <ConnaButton/>
            </ConnaContainer>
        </BottomContainer>
    );
}

const Body: React.FC = () => {
    return (
        <>
            <BodyContainer>
                <Top />
                <Bottom />
            </BodyContainer>
        </>
    );
};

export default Body;


const TopContainer = styled.div`
    flex: 7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;   
`


const GreetingDropDownTextContainer = styled.div`
    flex:1;
    display:flex;
    flex-direction: column;
    margin-top: 2%;
    padding: 10px;
    align-self: flex-start;
`

const DropDownTextContainer = styled.div`
    flex:1;
    margin-top: -6%; 
`

const DropDownContainer = styled.div`
    flex: 4;
    display: flex;
    width: 100%;
    max-height: 350px; 
`;

const BottomContainer = styled.div`
  margin-top: 25px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TransparentButtonContainer = styled.div`
  display: flex;
  justify-content: right; 
  flex: 4;

`;

const ConnaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;