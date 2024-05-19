import React, { useState} from 'react';
import styled from 'styled-components';


import RightBarContainer from '../../ConnectUI_web/templetes/bodyTemplete';


const RightBar: React.FC= () => {
  
      

    return (
        <>
            <RightBarContainer flexDirection= {"column"} flex= {2}>
                <Temp>
                    {/* . */}
                </Temp>
            </RightBarContainer>

        </>
    );
};

export default RightBar;

const Temp = styled.div`
    width: 100%;
    // background-color: blue;
`
