import React from 'react';
import styled from 'styled-components';

import { useLanguage } from '../../../../contexts/Language/Language';

import Button from '../../../ConnectUI_web/common/buttons/button1';
import ConnaButton from '../../../ConnectUI_web/common/conna/connaButton';


const Bottom: React.FC = () => {
    const { changeLanguage } = useLanguage(); 
    return (
        <BottomContainer>
            <ButtonContainer>
                <Button variant = {"transparent"} to="/login" onClick={() => changeLanguage('en-US')}>
                    Skip (English)
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
  margin-top: 1.5625rem; 
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right; 
  flex: 3.2;
`;

const ConnaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin-right: 1.25rem;  
`;
