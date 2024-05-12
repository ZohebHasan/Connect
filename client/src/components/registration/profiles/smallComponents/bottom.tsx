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
      selectAllAndNavigate: () => void;
    }

const Bottom: React.FC<BottomProps> = ({ selectedProfile, handleConfirmClick, selectAllAndNavigate }) => {

  return(
        <BottomContainer>
            <ConnaContainer>
                {/* Empty space */}
            </ConnaContainer>
            
            <ButtonContainer>

              <Wrapper>
                  <Button variant= {"transparent"} 
                          width= {"70%"} 
                          to={selectedProfile ? "/home" : "#"} 
                          onClick={handleConfirmClick}
                          >
                          Create selected profiles
                  </Button>
                </Wrapper>

                <Wrapper>
                  <Button variant="transparent" 
                          width= {"75%"}
                          onClick={selectAllAndNavigate}
                          >
                          Create all three profiles
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
  // background-color: blue;
`


const BottomContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;


const ButtonContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  // background-color: red;
`

const ConnaContainer = styled.div`
  display: flex;
  flex:1;
  justify-content: flex-end;
  margin-right: 20px; 
`;


