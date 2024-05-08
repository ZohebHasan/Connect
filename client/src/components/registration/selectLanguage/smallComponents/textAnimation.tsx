import React from "react";
import LeftToRightAnimatedText from '../../../ConnectUI_web/common/texts/animated/leftToRight'



const AnimatedText: React.FC = () => {
  const text = "Welcome to Connect! Please Select Your Language to get started.";
 
  return(
    <LeftToRightAnimatedText size = {"1.5rem"}>
        {text}
    </LeftToRightAnimatedText>
  );
}

export default AnimatedText;