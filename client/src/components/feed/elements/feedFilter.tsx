import React, { useState } from 'react';
import styled from 'styled-components';

const FilterButtons: React.FC = () => {
    const [activeButton, setActiveButton] = useState('forYou');

    return (
        <FilterContainer>
            <FeedButtonContainer>
                <StyledButton
                    isActive={activeButton === 'forYou'}
                    onClick={() => setActiveButton('forYou')}
                    className="forYou"
                >
                    Feed
                </StyledButton>
            </FeedButtonContainer>
     
            <TrendingButtonContainer>
                <StyledButton
                    isActive={activeButton === 'trending'}
                    onClick={() => setActiveButton('trending')}
                >
                    Trending
                </StyledButton>
            </TrendingButtonContainer>
        </FilterContainer>
    );
};

export default FilterButtons;

const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid rgba(235, 57, 137, 0.300);

`;

const FeedButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
    padding: 5px;
`;
const TrendingButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
    padding: 5px;
    border-left: 1px solid rgba(235, 57, 137, 0.300);
`;

const StyledButton = styled.button<{ isActive: boolean }>`
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    color: #1da1f2;
    border-bottom: 2px solid ${(props) => (props.isActive ? 'rgba(235, 57, 137, 0.300)' : 'transparent')};



    &:hover {
        background-color: #e8f5fe;
    }

    &::after {
        content: '';
        display: block;
        height: 4px;
        width: 100%;
        background-color: ${(props) => (props.isActive ? 'rgb(235, 57, 137)' : 'transparent')};
        position: absolute;
        bottom: 0;
        left: 0;
    }
`;
