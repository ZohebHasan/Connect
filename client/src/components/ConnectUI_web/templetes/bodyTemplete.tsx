import React from "react";
import styled from "styled-components";

interface BodyContainerProps{
    children: React.ReactNode; 
}

const Body: React.FC<BodyContainerProps> = ({children }) => {
    return (
        <BodyContainer >
            {children}
        </BodyContainer>
    );
}
export default Body;

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
    z-index: 1;
    padding:10px;
    min-height: 80vh;
    width: 90%;
    // overflow: hidden;
`;
