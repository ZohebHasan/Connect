import React from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../../ConnectUI_web/common/texts/static';



import CreateDark from "../../../../../assets/createDarkActive.png"
import CreateLight from "../../../../../assets/createLightActive.png"







const Header: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    return (
        <>

            <ButtonsContainer>

                <CreateButton $isDarkMode={isDarkMode}>
                    <CreateIcon src={isDarkMode ? CreateDark : CreateLight} />
                    <Text variant="normal" size="1rem" fontWeight="200">
                        Join or create a course
                    </Text>
                </CreateButton>

            </ButtonsContainer>
        </>
    );
};

export default Header;

const CreateButton = styled.div<{ $isDarkMode: boolean }>`
    border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#ffffff73' : 'black')}; 
    padding: 0.4rem 0.8rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
        transform: scale(1.04);
    }
    &:active {
        transform: scale(0.99);
    }
    background-color: #ffffff2b;
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`;


const FilterIcon = styled.img`
width: 1.8rem;
  
`

const ButtonsContainer = styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
  /* background-color: blue; */
  gap: 1rem;

`

const FilterButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.96);
  }
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
`


const CreateIcon = styled.img`
  width: 1.2rem;
`





