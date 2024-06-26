import React from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import { useRecInfoContext } from '../../../../../contexts/professionalProfile/recommendationContext';

import RecommendationData from './data'

const Recommendation: React.FC = () => {

    const {isDarkMode} = useDarkMode();
    
    const {recommendations} = useRecInfoContext();

    return (
        <RecommendationContainer>
            <RecommendationData recs={ recommendations}/>


        </RecommendationContainer>
    );
};

export default Recommendation;

const RecommendationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 2rem;
  gap: 2rem;
`;

const Divider = styled.hr<{ isDarkMode: boolean }>`
  width: 85%;
  border: 0;
  border-top: 0.5px solid ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  margin: 0;
`;
