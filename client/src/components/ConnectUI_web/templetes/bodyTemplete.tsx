import React from "react";
import styled from "styled-components";

interface BodyContainerProps{
    children: React.ReactNode; 
    flexDirection: "row" | "column";
    position?: "absolute";
    flex?: number;
}

const Body: React.FC<BodyContainerProps> = ({children, flexDirection, position,  flex}) => {
    return (
        <BodyContainer $flexDirection = {flexDirection} $position = {position} $flex={flex}>
            {children}
        </BodyContainer>
    );
}
export default Body;

const BodyContainer = styled.div<{$flexDirection: "row" | "column", $position?: "absolute", $flex?: number}>`
    flex: ${({ $flex }) => $flex}; 
    display: flex;
    align-items: center;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
    flex-direction:  ${({ $flexDirection }) => {
        return $flexDirection === "row" ? "row" : "column";
     }};
    position: ${({ $position }) => {
        return $position === "absolute" ? "absolute" : undefined;
     }};
    // min-height: 80vh; 
`;
