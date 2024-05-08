import React, { useState} from 'react';



import Bodycontainer from "../../ConnectUI_web/templetes/bodyTemplete"
import Top from "./smallComponents/top"
import Bottom from './smallComponents/bottom';



const Body: React.FC= () => {
    const [agreedPolicy, setAgreedPolicy] = useState(false);
    const [policyError, setPolicyError] = useState(false); 
    
    const handlePolicy = () => {
        const newAgreedPolicy = !agreedPolicy;
        setAgreedPolicy(newAgreedPolicy);
        if (newAgreedPolicy) {
          setPolicyError(false); // Clear error if the checkbox is now checked
        }
      };
      
      const handleConfirmClick = () => {
        if (!agreedPolicy) {
          setPolicyError(true); // Only show error if the checkbox is not checked
        } else {
          // submit the form since the policy is agreed
        }
      };
      

    return (
        <>
            <Bodycontainer flexDirection="column">
                <Top agreedPolicy={agreedPolicy} policyError={policyError} handlePolicy = {handlePolicy}/>
                <Bottom agreedPolicy={agreedPolicy}  handleConfirmClick = {handleConfirmClick}/>
            </Bodycontainer>
        </>
    );
};

export default Body;


