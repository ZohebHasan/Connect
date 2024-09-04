import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../../../contexts/DarkMode/DarkMode";

interface BodyContainerProps {
    children: React.ReactNode; 
    flexDirection: "row" | "column";
    position?: "absolute";
    flex?: number;
}

const Body: React.FC<BodyContainerProps> = ({children, flexDirection, position, flex}) => {
    const {isDarkMode} = useDarkMode();

    return (
        <BodyContainer $flexDirection={flexDirection} $position={position} $flex={flex} $isDarkMode={isDarkMode}>
            {children}
        </BodyContainer>
    );
}

export default Body;

const BodyContainer = styled.div<{$flexDirection: "row" | "column", $position?: "absolute", $flex?: number, $isDarkMode: boolean}>`
    flex: ${({ $flex }) => $flex || 1}; 
    display: flex;

    align-items: center;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
    flex-direction: ${({ $flexDirection }) => $flexDirection};
    position: ${({ $position }) => $position || 'relative'};

    /* Custom scrollbar styles */
    ::-webkit-scrollbar {
        width: 4px; /* Width of the vertical scrollbar */
        height: 8px; /* Height of the horizontal scrollbar */
    }

    ::-webkit-scrollbar-track {
        background: transparent; /* Background of the scrollbar track */
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ $isDarkMode }) => $isDarkMode ? '#555' : '#888'}; /* Color of the scrollbar thumb */
        border-radius: 10px; /* Rounded corners for the thumb */
        min-height: 30px; /* Minimum height for the thumb */
        transition: background-color 0.3s ease; /* Smooth transition for color change */
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${({ $isDarkMode }) => $isDarkMode ? '#888' : '#3f3f3fc8'}; /* Darker color on hover */
    }
`;
