import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';


import { useLanguage } from '../../../../contexts/Language/Language';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';


import NormalInput from '../../../ConnectUI_web/common/inputBox/normal';
import Button from '../../../ConnectUI_web/common/buttons/button1';
import PhoneIcon from '../assets/phoneIcon.gif'
import Text from "../../../ConnectUI_web/common/texts/static"


import { useSignup } from '../../../../contexts/registration/signup/signupContext';
const VerificationText: React.FC = () => {
    return (
        <TextContainer>
            <Text size={"50px"} variant={"normal"} fontWeight={"500"}>
                Just making
            </Text>
            <Text size={"50px"} variant={"gradient"} fontWeight={"500"}>
                sure.
            </Text>
        </TextContainer>
    );
}

const TextContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: row;
    gap: 13px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`
const DisplayWrongCodeError = () => {
    const {
        wrongCodeError,

    } = useSignup();

    let errorMessage = null;

    if (wrongCodeError) {
        errorMessage = <ErrorMessage>Please enter the correct code.</ErrorMessage>;
    } else{
        errorMessage = '';
    }
 
    return (
        <>
            {errorMessage}
        </>
    );
}


const Verification: React.FC = () => {
    const {isDarkMode} = useDarkMode();
    const {language} = useLanguage(); //need to be implemented
    const [code, setCode] = useState('');

    const handleCodeChange = (input: string) =>{
        setVerificationCode(input); 
        setCode(input);
    }
    const{ handleVerification, setVerificationCode, userId, handleResendCode, resendTimer, resetResendTimer} = useSignup();
    console.log(resendTimer);
    useEffect(() => {
        resetResendTimer(); // Reset the timer when the component mounts
    }, []);

    const handleVerify = () => {
        
        handleVerification(); 
    }
    return (
        <>
            <VerificationText/>
            <VerificationContainer $isDarkMode={isDarkMode}>    
                
                <HeaderTextContainer>
                    <Text size={"1.4rem"} variant={"normal"} fontWeight={"300"}>
                        User id verification
                    </Text>
                </HeaderTextContainer>
         
                <BodyTextContainer>
                    <Text size={"1rem"} variant={"transparent"} fontWeight={"200"}>
                        We just sent a code to {userId}.
                    </Text>
                </BodyTextContainer>    
              
                <InputAnimeContainer>
                    <NormalInput 
                        id={""} 
                        label={"Verification Code"} 
                        width= {"60%"}
                        value= {code}
                        onChange={handleCodeChange}
                    />

                    <VerificAnim>
                        <PhoneGIF src = {PhoneIcon}/>
                    </VerificAnim>
                </InputAnimeContainer>
                <ErrorMessageContainer>
                    <DisplayWrongCodeError />
                </ErrorMessageContainer>

                <VerificBtnContainer>
                    <Button variant = {resendTimer === 0 ? "gradient" : "normal"} width= {"50%"} onClick={handleResendCode}>
                        Send it again ({resendTimer})
                    </Button>
                    <Button variant = {"gradient"} width= {"50%"} onClick={handleVerify}>
                        Next
                    </Button>
                </VerificBtnContainer>
          
            </VerificationContainer>
        </>
    );
  }

export default Verification;

  

  const VerificationContainer = styled.div<{ $isDarkMode: boolean }>`
    z-index: 1;
    flex: 3;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(156, 156, 156, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(253, 211, 255, 0.201);
`;

const HeaderTextContainer = styled.div`
  flex: 0.7;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 5%;
`;

const BodyTextContainer = styled.div`
  flex: 0.1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 5%;
`;

const InputAnimeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
`;

const VerificBtnContainer = styled.div`
  flex: 0.7;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5%;
  width: 90%;

`;

const VerificAnim = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; // Ensure the div takes the full width if needed
  height: 100%; // Ensure the div takes the full height if needed
`;

const PhoneGIF = styled.img`
  width: 40%;
  height: auto;
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  60% { transform: translateX(10px); }
  70% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  90% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

const ErrorMessageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;

`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    animation: ${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both; 
`;