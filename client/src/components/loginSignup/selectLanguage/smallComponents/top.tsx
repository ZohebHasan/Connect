import React from 'react';
import styled from 'styled-components';


import Greetings from '../smallComponents/greetings';
import DirectionText from '../smallComponents/textAnimation';
import LanguagesDropDown from '../smallComponents/languagesDropdown';


const Top: React.FC = () => {
    return (
      <TopContainer>
        <GreetingDropDownTextContainer>
          <Greetings /> 
          {/* <DropDownTextContainer> */}
            <DirectionText/> 
          {/* </DropDownTextContainer>            */}
        </GreetingDropDownTextContainer>
        <DropDownContainer> 
          <LanguagesDropDown />
        </DropDownContainer>
      </TopContainer>
    );
  }


export default Top

const TopContainer = styled.div`
    flex: 7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 52%;   
`

const GreetingDropDownTextContainer = styled.div`
    // flex:1;
    display:flex;
    flex-direction: column;
    margin-top: 2rem;
    padding: 0.625rem;
    align-self: flex-start;
    // background-color:red;
`


const DropDownTextContainer = styled.div`
    flex:1;
    margin-top: -6%; 
`



const DropDownContainer = styled.div`
    // flex: 5;
    display: flex;
    width: 100%;
    
    max-height: 28rem;

    @media (max-width: 1440px) { 
        max-height: 21rem;
    }

`;
