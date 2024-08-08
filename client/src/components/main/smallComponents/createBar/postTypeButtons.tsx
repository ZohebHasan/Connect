import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';


import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import Text from '../../../ConnectUI_web/common/texts/static';

const PostTypeButtons: React.FC = () => {
   
    const { isDarkMode } = useDarkMode();


   
    return (
        <PostTypeContainer>
            <FeedButtonContainer>
                <StyledButton
                    $isActive={true}
                    // onClick={() => handleClick('about', '/currentUser/professional')}
                    $isDarkMode={isDarkMode}
                    className="about"
                >
                    <Text variant={"professional"} fontWeight={"300"} size={"1.1rem"}>Professional</Text>
                </StyledButton>
            </FeedButtonContainer>

            <TrendingButtonContainer>
                <StyledButton
                    $isActive={false}
                    // onClick={() => handleClick('posts', '/currentUser/professional/posts')}
                    $isDarkMode={isDarkMode}
                    className="posts"
                >
                    <Text variant={"personal"} fontWeight={"300"} size={"1.1rem"}>Personal</Text>
                </StyledButton>
            </TrendingButtonContainer>

            <FeedButtonContainer>
                <StyledButton
                    $isActive={false}
                    // onClick={() => handleClick('recommendations', '/currentUser/professional/recommendations')}
                    $isDarkMode={isDarkMode}
                    className="recommendations"
                >
                    <Text variant={"school"} fontWeight={"300"} size={"1.1rem"}>School</Text>
                </StyledButton>
            </FeedButtonContainer>
        </PostTypeContainer>
    );
};

export default PostTypeButtons;

const PostTypeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    border-bottom: 2px solid rgba(255, 255, 255, 0.7);
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
        background-color: ${(props) => (props.$isActive ? 'rgba(255, 255, 255, 0.7)' : 'transparent')};
        position: absolute;
        bottom: 0;
        left: 0;
        transition: background-color 0.2s ease;
    }
`;
