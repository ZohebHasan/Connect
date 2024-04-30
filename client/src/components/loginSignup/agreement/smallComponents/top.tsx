import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { Link } from 'react-router-dom';


import Text from '../../../ConnectUI_web/common/texts/static';
import ContainerTransparent from '../../../ConnectUI_web/templetes/containerTransparent';
import Agreements from './agreements';
import Checkbox from '../../../ConnectUI_web/common/checkboxes/checkbox1';




function AgreementText() {
    return (
        <TextContainer>
            <Text size={"50px"} variant={"normal"} fontWeight={"400"}>
                User and Privacy Policy
            </Text>
            <Text size={"50px"} variant={"gradient"} fontWeight={"500"}>
                Agreement.
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
    gap: 7px;
`


interface TopProps{
    agreedPolicy: boolean;
    policyError: boolean;
    handlePolicy:() => void;
}

const Top: React.FC<TopProps> = ({ agreedPolicy, policyError, handlePolicy }) => {
  
    const {isDarkMode} = useDarkMode();
    return(
            <TopContainer>
                <AgreementText/>
                <ContainerTransparent flex={2}>
                    <Agreements/>
                    <CheckBoxContainer $isActive = {policyError}>
                        <Checkbox 
                                onClick={handlePolicy}
                                checked={agreedPolicy}  
                             >
                            <Text variant = {"normal"} fontWeight = {"300"} size= {"15px"}> 
                                I agree to Connect’s privacy, user, data, and child safety 
                                <StyledLink to="/privacy" $isDarkMode = {isDarkMode}> policies</StyledLink>
                            </Text>
                        </Checkbox>
                    </CheckBoxContainer>

                    
                    <ErrorMessage $isActive={policyError}>
                        You must agree to the policies before proceeding.
                    </ErrorMessage>
                </ContainerTransparent> 
            </TopContainer>
    );
  }

export default Top;


const TopContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;   
`

const CheckBoxContainer = styled.div<{$isActive: boolean}>`
  display: flex;
  flex: 0.5;
  align-items: flex-start;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  animation: ${({ $isActive }) => $isActive ? css`${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both` : 'none'};

`

const ErrorMessage = styled.p<{$isActive: boolean}> `
  color: red;
  font-size: 14px;
  visibility: ${({ $isActive }) => $isActive ? 'visible' : 'hidden'};
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  60% { transform: translateX(10px); }
  70% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  90% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;



const StyledLink = styled(Link)<{$isDarkMode: boolean}>`
  color: #C33764; 
  text-decoration: none; 
  font-weight: 500; 
  transition: color 0.2s ease-in-out, text-decoration 0.2s ease-in-out;

  &:hover, &:focus {
    color: #0056b3; /* Darker blue on hover for visual feedback */
    text-decoration: underline; /* Add underline on hover for clarity */
  }

  &:active {
    color: #004085; /* Even darker blue when active/clicked */
  }
`;
