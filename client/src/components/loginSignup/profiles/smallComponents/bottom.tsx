import React from 'react';
import styled from 'styled-components'

;
import Button from '../../../ConnectUI_web/common/buttons/button1';
import ConnaButton from '../../../ConnectUI_web/common/conna/connaButton';


interface BottomProps {
      selectedProfile: {
        professional: boolean;
        personal: boolean;
        school: boolean;
      };
      handleConfirmClick: (event: React.MouseEvent<HTMLElement>) => void;
    }

const Bottom: React.FC<BottomProps> = ({ selectedProfile, handleConfirmClick }) => {

  return(
        <BottomContainer>
            <ConnaContainer>
                {/* Empty space */}
            </ConnaContainer>
            <ButtonContainer>
              {/* <Wrapper>
                <Button variant= {"transparent"} 
                        width= {"50%"} 
                        to={"personal"} 
                        >
                        Confirm 
                </Button>
              </Wrapper> */}

              <Wrapper>
                <Button variant= {"transparent"} 
                        width= {"50%"} 
                        to={selectedProfile ? "/home" : "#"} 
                        onClick={handleConfirmClick}
                        >
                        Confirm
                </Button>
              </Wrapper>

            </ButtonContainer>
            <ConnaContainer>
                <ConnaButton/>
            </ConnaContainer>
        </BottomContainer>
    );
}

export default Bottom;

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
`


const BottomContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;


const ButtonContainer = styled.div`
  flex: 2.5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;


`

const ConnaContainer = styled.div`
  display: flex;
  flex:1;
  justify-content: flex-end;
  margin-right: 20px; 
`;


