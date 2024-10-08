import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

interface PageContainerProps{
    // fadeIn?: boolean;
    children?: React.ReactNode;  
    // variant: "scrollable" | "fit"; 
}

const Page: React.FC<PageContainerProps> = ({children}) =>{
    return(
        <PageContainer>
            {children}
        </PageContainer>
    );
} 
export default Page;

const PageContainer = styled.div<{$fadeIn?: boolean}>`
  margin: 15px;
  width: calc(100vw - 30px);
  height: calc(100vh - 40px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
//   background-color: red;
  overflow: hidden;
  
  // opacity: 0;
  // transition: opacity 0.5s ease;

  // ${({ $fadeIn }) => $fadeIn && css`
  //   opacity: 1;
  // `}
`;

// overflow: ${({ $variant }) => $variant === 'fit' ? 'auto' : 'auto'}; 