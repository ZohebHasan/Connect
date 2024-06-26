import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { usePerNavContext } from '../../../../../contexts/navigation/perNavContext';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

const FilterButtons: React.FC = () => {
    const { activeState, setActiveState } = usePerNavContext();
    const { isDarkMode } = useDarkMode();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        const validPaths = ['personal', 'clips', 'chirps'];
        if (validPaths.includes(path!) && path !== activeState) {
            setActiveState(path!);
        } else if (!validPaths.includes(path!)) {
            setActiveState('personal');
        }
    }, [location, activeState, setActiveState]);

    const handleClick = (state: string, path: string) => {
        setActiveState(state);
        navigate(path);
    };

    return (
        <FilterContainer>
            <FeedButtonContainer>
                <StyledButton
                    $isActive={activeState === 'personal'}
                    onClick={() => handleClick('personal', '/currentUser/personal')}
                    $isDarkMode={isDarkMode}
                    className="pixels"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Pixels</Text>
                </StyledButton>
            </FeedButtonContainer>

            <TrendingButtonContainer>
                <StyledButton
                    $isActive={activeState === 'clips'}
                    onClick={() => handleClick('clips', '/currentUser/personal/clips')}
                    $isDarkMode={isDarkMode}
                    className="clips"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Clips</Text>
                </StyledButton>
            </TrendingButtonContainer>

            <FeedButtonContainer>
                <StyledButton
                    $isActive={activeState === 'chirps'}
                    onClick={() => handleClick('chirps', '/currentUser/personal/chirps')}
                    $isDarkMode={isDarkMode}
                    className="chirps"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Chirps</Text>
                </StyledButton>
            </FeedButtonContainer>
        </FilterContainer>
    );
};

export default FilterButtons;

const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    border-bottom: 2px solid rgba(248, 36, 131, 0.591);
`;

const FeedButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
`;

const TrendingButtonContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
`;

const StyledButton = styled.button<{ $isActive: boolean; $isDarkMode: boolean }>`
    background: none;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    position: relative;
    color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
    border-bottom: 2px solid ${(props) => (props.$isActive ? 'rgba(235, 57, 137, 0.300)' : 'transparent')};
    transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;

    &:hover {
        transform: scale(1.05);
        opacity: 0.7;
    }

    &:active {
        transform: scale(1);
    }

    &::after {
        content: '';
        display: block;
        height: 4px;
        width: 100%;
        background-color: ${(props) => (props.$isActive ? 'rgb(235, 57, 137)' : 'transparent')};
        position: absolute;
        bottom: 0;
        left: 0;
        transition: background-color 0.2s ease;
    }
`;
