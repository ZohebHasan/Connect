import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';


import { useLanguage } from '../../../../contexts/Language/Language';
import { transLogin } from '../../../../translations/loginSignup/login/login';

import NormalInput from '../../../ConnectUI_web/common/inputBox/normal';
import HiddenInput from '../../../ConnectUI_web/common/inputBox/hidden';

import { useLogin } from '../../../../contexts/login/loginContext';


const DisplayErrorMessages = () => {
    const {  
        errors,  
        userIdEmptyError, 
        passwordEmptyError } = useLogin();

    let errorMessage = null;

    // console.log("Email Error: ", errors.emailError);
    // console.log("Phone Error: ", errors.phoneError);
    // console.log("Username Error: ", errors.usernameError);
    // console.log("Password Error: ", errors.passwordError);
    // console.log("All errors: ", (errors.emailError && errors.phoneError && errors.usernameError) && errors.passwordError);
    // console.log("User ID errors: ", (errors.emailError && errors.phoneError && errors.usernameError));


    if (userIdEmptyError && passwordEmptyError) {
      errorMessage = <ErrorMessage>User id and password fields are empty</ErrorMessage>;
    } 
    else if (passwordEmptyError) {
      errorMessage = <ErrorMessage>Password field is empty</ErrorMessage>;
    } 
    else if (userIdEmptyError) {
      errorMessage = <ErrorMessage>User id field is empty</ErrorMessage>;
    } 
    else if ((errors.emailError && errors.phoneError && errors.usernameError) && errors.passwordError) {
      errorMessage = <ErrorMessage>Incorrect user id and password</ErrorMessage>;
    } 
    else if (errors.emailError && errors.phoneError && errors.usernameError) {
      errorMessage = <ErrorMessage>Incorrect user id</ErrorMessage>;
    } 
    else if (errors.passwordError) {
      errorMessage = <ErrorMessage>Incorrect Password</ErrorMessage>;
    }
  
    return (
      <>
        {errorMessage}
      </>
    );
  };

const Credentials: React.FC = () => {
    const { 
        userId,
        password, 
        handleUserIdChange, 
        handlePasswordChange} = useLogin();

    return (
        <CredentialContainer>
            <NormalInput
                id="username"
                label={"Phone, email, or username"}
                value={userId}
                onChange={handleUserIdChange}
            />
            <HiddenInput
                id={""}
                label={"Password"}
                value={password}
                onChange={handlePasswordChange}
            />
            <DisplayErrorMessages/>     
        </CredentialContainer>
    );
}

export default Credentials;

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


const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    animation: ${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both; 
`
const CredentialContainer = styled.div`
    flex: 1.5;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 15px;
`;


//tranlations: (Later zzzzz)
/*
    const { language } = useLanguage();

    let id = "Phone, email, or username"
    let pass = "Password"

    if (transLogin && transLogin[language]) {
        const { id: idVal, pass: passVal } = transLogin[language];
        id = idVal;
        pass = passVal;
    }
 */

