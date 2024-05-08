import React from 'react';
import styled from 'styled-components'

;
import Button from '../../../ConnectUI_web/common/buttons/button1';
import ConnaButton from '../../../ConnectUI_web/common/conna/connaButton';

interface BottomProps {
    agreedPolicy: boolean;  
    handleConfirmClick: () => void;  
 

  }

const Bottom: React.FC<BottomProps> = ({ agreedPolicy, handleConfirmClick }) => {
    return(
        <BottomContainer>
            <ButtonContainer>
                <Button variant= {"transparent"} 
                        width= {"30%"} 
                        to={agreedPolicy ? "/features" : "#"} 
                        onClick={handleConfirmClick}
                        >
                        Next
                </Button>
            </ButtonContainer>
            <ConnaContainer>
                <ConnaButton/>
            </ConnaContainer>
        </BottomContainer>
    );
}

export default Bottom;

const BottomContainer = styled.div`
//   margin-top: 25px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;


const ButtonContainer = styled.div`
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: flex-end;

`

const ConnaContainer = styled.div`
  display: flex;
  flex:1;
  justify-content: flex-end;
  margin-right: 20px; 
`;


