import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { usePerNavContext } from '../../../../../contexts/navigation/perNavContext';
import { useConnectUser } from '../../../../../contexts/ConnectUser/connectUserProvider';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

const FilterButtons: React.FC = () => {
    const { activeState, setActiveState } = usePerNavContext();
    const { isDarkMode } = useDarkMode();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useConnectUser();
    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        if (!user) return;

        const currentPath = location.pathname;
        if (currentPath === `/personal/${user.username}` && activeState !== 'pixels') {
            setActiveState('pixels', user.username);
        } else if (currentPath === `/personal/${user.username}/clips` && activeState !== 'clips') {
            setActiveState('clips', user.username);
        } else if (currentPath === `/personal/${user.username}/chirps` && activeState !== 'chirps') {
            setActiveState('chirps', user.username);
        }
    }, [location.pathname, activeState, setActiveState, user]);

    const handleClick = (state: string, path: string) => {
        if (user) {
            setActiveState(state, user.username);
            navigate(path);
        }
    };

    if (!user) {
        return null; // or some loading state
    }

    return (
        <FilterContainer>
            <FeedButtonContainer>
                <StyledButton
                    $isActive={activeState === 'pixels'}
                    onClick={() => handleClick('pixels', `/personal/${user.username}`)}
                    $isDarkMode={isDarkMode}
                    className="pixels"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Pixels</Text>
                </StyledButton>
            </FeedButtonContainer>

            <TrendingButtonContainer>
                <StyledButton
                    $isActive={activeState === 'clips'}
                    onClick={() => handleClick('clips', `/personal/${user.username}/clips`)}
                    $isDarkMode={isDarkMode}
                    className="clips"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Clips</Text>
                </StyledButton>
            </TrendingButtonContainer>

            <FeedButtonContainer>
                <StyledButton
                    $isActive={activeState === 'chirps'}
                    onClick={() => handleClick('chirps', `/personal/${user.username}/chirps`)}
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
