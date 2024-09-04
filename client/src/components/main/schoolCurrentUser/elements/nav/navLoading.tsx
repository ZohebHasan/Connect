import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useSchoolNavContext } from '../../../../../contexts/navigation/schoolNavContext';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

const FilterButtons: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    return (
        <FilterContainer>
            <FeedButtonContainer>
                <ButtonLoading $isDarkMode={isDarkMode}/>
            </FeedButtonContainer>

            <TrendingButtonContainer>
                <ButtonLoading $isDarkMode={isDarkMode}/>
            </TrendingButtonContainer>

            <FeedButtonContainer>
                <ButtonLoading $isDarkMode={isDarkMode}/>
            </FeedButtonContainer>
        </FilterContainer>
    );
};

export default FilterButtons;

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Create a mixin for the loading effect with dark mode support
const loadingEffect = css<{ $isDarkMode: boolean }>`
  background: ${({ $isDarkMode }) => $isDarkMode
    ? 'linear-gradient(90deg, #afafaf 0%, grey 50%, #bdbdbd 100%)'
    : 'linear-gradient(90deg, #3a3a3a 0%, grey 50%, #303030 100%)'};
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.5s ease-in-out infinite;
`;

const ButtonLoading = styled.div <{ $isDarkMode: boolean }>`
    width: 7rem;
    height: 1.7rem;
    background-color: grey;
    border-radius: 15px;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    ${loadingEffect}
`

const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    border-bottom: 2px solid #d08ebc79;
    opacity: 0.4;
`;

const FeedButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    /* background-color: blue; */
`;

const TrendingButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
`;


