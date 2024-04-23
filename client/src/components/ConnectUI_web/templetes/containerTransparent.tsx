import React from "react";
import styled from "styled-components";
import { useDarkMode } from "../../../contexts/DarkMode/DarkMode";


interface TransContainerProps{
    width?: string;
    position?: string;
    flex?: number;
    flexDirection?: string;
    children: React.ReactNode; 
}


const ContainerTransparent: React.FC<TransContainerProps> = ({ flex, children, width, position, flexDirection }) => { 
    const {isDarkMode} = useDarkMode();
    return(
        <Container $flexDirection = {flexDirection} 
                   $position = {position}
                   $flex={flex}
                   $width = {width}
                   $isDarkMode = {isDarkMode}
                >
            {children}
        </Container>
    );
}

export default ContainerTransparent;

interface ContainerProps{
    $isDarkMode: boolean;
    $width?: string;
    $position?: string;
    $flex?: number;
    $flexDirection?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${({ $flexDirection }) => $flexDirection || 'column'};
  position: ${({ $position }) => $position || ''};
  width: ${({ $width }) => $width || '100%'};
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(156, 156, 156, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
  flex: ${({ $flex }) => $flex || 'auto'};
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 10px;
  height: 100%
  max-width: 100%; 
  min-width: 25%; 

`;