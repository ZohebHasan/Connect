import React, { useState} from 'react';



import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete"
import Top from "./smallComponents/top"
import Bottom from './smallComponents/bottom';



const Body: React.FC= () => {
  
      

    return (
        <>
            <Bodycontainer flexDirection="column">
                <Top/>
                <Bottom/>
            </Bodycontainer>
        </>
    );
};

export default Body;

