import React from 'react';
import styled from 'styled-components';

import { useLanguage } from '../../../../contexts/Language/Language';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { posterTrans } from '../../../../translations/loginSignup/login/poster';

import LogoDark from '../../../assets/logoDark.png';
import LogoLight from '../../../assets/logoLight.png';
import videoSrc from '../assets/poster.mp4';
import LogoNew from '../../../assets/logo.png'

import TextLogo from '../../../ConnectUI_web/common/texts/static';
import StyledText from '../../../ConnectUI_web/common/texts/static'

interface PosterTexts {
  the: string;
  freedom: string;
  is: string;
  here: string;
  uncontrolled: string;
  period: string;
}

const Poster: React.FC = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();


  let the = "The";
  let freedom = "Freedom";
  let is = "is";
  let here = "here";
  let uncontrolled = "Uncontrolled";
  let period = ".";

  if (posterTrans[language]) {
    const { the: theVal, freedom: freedomVal, is: isVal, 
            here: hereVal, uncontrolled: uncontrolledVal, 
            period: periodVal } = posterTrans[language];
    the = theVal;
    freedom = freedomVal;
    is = isVal;
    here = hereVal;
    uncontrolled = uncontrolledVal;
    period = periodVal;
  }

  return (
    <>
      <PosterContainer>
        {/* <VideoContainer autoPlay loop muted>
            <source src={videoSrc} type="video/mp4" />
        </VideoContainer> */}

        <PosterLogoTextContainer>
          <LogoContainer>
            <Logo src={LogoNew} alt="Logo"/>
            <TextLogo variant = {"normal"} size = {"7rem"} fontWeight= {"300"}> 
                  Connect
            </TextLogo>
            {/* <Logo src={isDarkMode ? LogoDark : LogoLight} alt="Logo" /> */}
          </LogoContainer>

          <PosterTextContainer>
            {/* <Text $isDarkMode={isDarkMode}>
              {the} <Span $isDarkMode={isDarkMode}>{freedom}</Span><br />
              {is} <Span $isDarkMode={isDarkMode}>{here}</Span>{period}<br />
              <GradientText $isDarkMode={isDarkMode} >{uncontrolled}</GradientText>{period}
            </Text> */}
            <Temp>
              <StyledText size ={"4rem"} fontWeight = {"500"} variant = {"transparent"}>The</StyledText>
              <StyledText size ={"4rem"} fontWeight = {"500"} variant = {"normal"}>Future</StyledText>
              <StyledText size ={"4rem"} fontWeight = {"500"} variant = {"transparent"}>is</StyledText>
              <StyledText size ={"4rem"} fontWeight = {"500"} variant = {"normal"}>Here.</StyledText>
            </Temp>
            {/* <Temp>
              <StyledText size ={"6rem"} fontWeight = {"500"} variant = {"transparent"}>is</StyledText>
              <StyledText size ={"6rem"} fontWeight = {"500"} variant = {"normal"}>Here.</StyledText>
            </Temp> */}
            
          </PosterTextContainer>
        </PosterLogoTextContainer>
      </PosterContainer>
    </>
  );
}

export default Poster;


const Temp = styled.div`
  display:flex;
  flex-direction:row;
  align-items: center;
  justify-content: flex-start;
  width:100%;
  gap: 0.5rem;
`

const PosterTextContainer = styled.div`
  flex: 1; 
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  // background-color: red;
`;


const PosterContainer = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
`;


const VideoContainer = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: 0;
`;


const PosterLogoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;


const LogoContainer = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  z-index: 3;
  gap: 2rem;
  // background-color: green;
`;

const Logo = styled.img`
  width: 25%;
  height: auto;
  opacity: 1;
  transition: transform 0.5s, opacity 0.5s;
  mix-blend-mode: multiply;
  background-color: transparent;
`;




const Text = styled.p<{ $isDarkMode: boolean }>`
  font-size: 75px;
  font-weight: bold;
  color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.600)'}; 
`;

const Span = styled.span<{ $isDarkMode: boolean }>`
 color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'}; 

`;

const GradientText = styled(Span) <{ $isDarkMode: boolean }>`
  color: transparent;
  background: ${({ $isDarkMode }) => $isDarkMode ? 'linear-gradient(to right, #6f877d, #1BFFFF)' : 'linear-gradient(to right, #2E3192, #1BFFFF)'};
  -webkit-background-clip: text;
  background-clip: text;
`;
