import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useSchoolNavContext } from '../../../../../contexts/navigation/schoolNavContext';
import { useDarkMode } from '../../../../../contexts/DarkMode/DarkMode';
import Text from '../../../../ConnectUI_web/common/texts/static';

import { useSchoolProfile } from '../../../../../contexts/schoolProfile/school';

const FilterButtons: React.FC = () => {
    const { activeState, handleSetActiveState } = useSchoolProfile();
    // const { activeState, setActiveState } = useSchoolNavContext();
    const { isDarkMode } = useDarkMode();
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        const validPaths = ['courses', 'clubsAndOrgs', 'campus'];
        if (validPaths.includes(path!)) {
            if (path !== activeState) {
                handleSetActiveState(path!);
            }
        } else if (activeState !== 'courses') {
            handleSetActiveState('courses');
        }
    }, [location, activeState, handleSetActiveState]);

    const handleClick = (state: string, path: string) => {
        handleSetActiveState(state);
        navigate(path);
    };

    return (
        <FilterContainer>
            <FeedButtonContainer>
                <StyledButton
                    $isActive={activeState === 'courses'}
                    onClick={() => handleClick('courses', `/school/${username}/courses`)}
                    $isDarkMode={isDarkMode}
                    className="courses"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Courses</Text>
                </StyledButton>
            </FeedButtonContainer>

            <TrendingButtonContainer>
                <StyledButton
                    $isActive={activeState === 'clubsAndOrgs'}
                    onClick={() => handleClick('clubsAndOrgs', `/school/${username}/clubsAndOrgs`)}
                    $isDarkMode={isDarkMode}
                    className="clubsAndOrgs"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Clubs & Orgs</Text>
                </StyledButton>
            </TrendingButtonContainer>

            <FeedButtonContainer>
                <StyledButton
                    $isActive={activeState === 'campus'}
                    onClick={() => handleClick('campus', `/school/${username}/campus`)}
                    $isDarkMode={isDarkMode}
                    className="campus"
                >
                    <Text variant={"transparent"} fontWeight={"300"} size={"1.1rem"}>Campus</Text>
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
    border-bottom: 2px solid #d08ebc79;
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
        background-color: ${(props) => (props.$isActive ? '#D08EBC' : 'transparent')};
        position: absolute;
        bottom: 0;
        left: 0;
        transition: background-color 0.2s ease;
    }
`;
