import React from "react";
import LeftToRightAnimatedText from '../../../ConnectUI_web/common/texts/animated/leftToRight'



const AnimatedText: React.FC = () => {
  const text = "Welcome to Connect! Please Select Your Language to get started.";
  const size = "24px";
  return(
    <LeftToRightAnimatedText size = {size}>
        {text}
    </LeftToRightAnimatedText>
  );
}

export default AnimatedText;