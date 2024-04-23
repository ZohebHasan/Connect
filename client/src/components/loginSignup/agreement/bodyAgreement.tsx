import React, { useState} from 'react';



import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete"
import Top from "./smallComponents/top"
import Bottom from './smallComponents/bottom';



const Body: React.FC= () => {
    const [agreedPolicy, setAgreedPolicy] = useState(false);
    const [policyError, setPolicyError] = useState(false); 
    
    const handlePolicy = () => {
      setAgreedPolicy(!agreedPolicy);
      setPolicyError(!agreedPolicy);  
    };
  
    const handleConfirmClick = () => {
        if (!agreedPolicy) {
            setPolicyError(true);
        }
    };

    return (
        <>
            <Bodycontainer flexDirection="column">
                <Top agreedPolicy={agreedPolicy} policyError={policyError} handlePolicy = {handlePolicy}/>
                <Bottom agreedPolicy={agreedPolicy} policyError={policyError} handleConfirmClick = {handleConfirmClick}/>
            </Bodycontainer>
        </>
    );
};

export default Body;


