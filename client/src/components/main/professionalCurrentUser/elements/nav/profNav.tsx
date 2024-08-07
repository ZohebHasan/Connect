import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useProfNavContext } from '../../../../../contexts/navigation/profNavContext';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

const FilterButtons: React.FC = () => {
    const { activeState, setActiveState } = useProfNavContext();
    const { isDarkMode } = useDarkMode();
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        const validPaths = ['about', 'recommendations', 'posts'];
        if (validPaths.includes(path!)) {
            if (path !== activeState) {
                setActiveState(path!);
            }
        } else if (activeState !== 'about') {
            setActiveState('about');
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
                    $isActive={activeState === 'about'}
                    onClick={() => handleClick('about', `/professional/${username}`)}
                    $isDarkMode={isDarkMode}
                    className="about"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>About</Text>
                </StyledButton>
            </FeedButtonContainer>

            <TrendingButtonContainer>
                <StyledButton
                    $isActive={activeState === 'posts'}
                    onClick={() => handleClick('posts', `/professional/${username}/posts`)}
                    $isDarkMode={isDarkMode}
                    className="posts"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Posts</Text>
                </StyledButton>
            </TrendingButtonContainer>

            <FeedButtonContainer>
                <StyledButton
                    $isActive={activeState === 'recommendations'}
                    onClick={() => handleClick('recommendations', `/professional/${username}/recommendations`)}
                    $isDarkMode={isDarkMode}
                    className="recommendations"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Recommendations</Text>
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
    border-bottom: 2px solid #1babff83;
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
        background-color: ${(props) => (props.$isActive ? '#1babff' : 'transparent')};
        position: absolute;
        bottom: 0;
        left: 0;
        transition: background-color 0.2s ease;
    }
`;
