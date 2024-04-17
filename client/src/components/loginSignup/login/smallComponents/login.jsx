import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../contexts/Language/Language';
import {transLogin } from '../../../../translations/loginSignup/login/login.js';

import '../../../../stylesheets/App.css'; 
import '../../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../../stylesheets/loginSignup/login/containers/login.css'

import ShowSign from '../assets/show.png';
import HideSign from '../assets/hide.png';
import GoogleLogo from '../assets/google.png';
import MicrosoftLogo from '../assets/microsoft.png'
import AppleLightLogo from '../assets/appleLogoBlack.png';



function LoginText(){
    return(
        <div className = "loginText">
            <p> 
                Let's get 
                you <span className='in'>in</span>.
            </p>
        </div>
    );
}


function CredentialContainer(){
    const [showPassword, setShowPassword] = useState(false);
    const { language } = useLanguage();

    let id = "Phone, email, or username"
    let pass = "Password"

    if( transLogin && transLogin[language]){
        const {id: idVal, pass: passVal} = transLogin[language];
        id = idVal;
        pass = passVal;
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="credentialContainer">    
            <div className="idContainer">
                <input type="text" id="emailInput" placeholder=" " />
                <label htmlFor="emailInput">{id}</label>
            </div>
            <div className="passwordContainer">
                <input
                    type={showPassword ? "text" : "password"}
                    id="passwordInput"
                    placeholder=" "
                />
                <label htmlFor="passwordInput">{pass}</label>
                <button onClick={togglePasswordVisibility} className="togglePasswordBtn">
                    <img src={showPassword ? ShowSign : HideSign} alt={showPassword ? "Hide" : "Show"} />
                </button>

            </div>        
        </div>
    );
}


function SocialLoginButtons (){
    const { language } = useLanguage();

    let signInWith = "Sign in with";

    if(transLogin && transLogin[language]){
        const { signInWith: signInWithVal } = transLogin[language];
        signInWith = signInWithVal;
    }

    return(
        <div className="socialLoginButtons">
            <p> {signInWith}: </p>
            <Link to = "#" className="microsoftBtn">
                <img src={MicrosoftLogo} alt="Microsoft" />
            </Link>
            <Link className="appleBtn">
                <img src={AppleLightLogo} alt="Apple" />
            </Link>
            <Link className="googleBtn">
                <img src={GoogleLogo} alt="Google" />
            </Link>
        </div>
    );
}




export default function LoginContainer() {
    const [showPassword, setShowPassword] = useState(false);
    
    const { language } = useLanguage();

    let signIn = "Sign in";
    let signUp = "Create an account"

    if(transLogin && transLogin[language]){
        const { signIn: signInVal, signUp: signUpVal } = transLogin[language];
        signIn = signInVal;
        signUp = signUpVal;
    }


    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
        <>
            <LoginText/>
            <div className="login">          
                <CredentialContainer/>
                <div className = "loginBtnContainer">
                    <Link className="loginBtn" to = "twoStep" >{signIn}</Link>
                </div>    
                <SocialLoginButtons/>
                <div className="dividerContainer">
                    <div className="line"></div>
                        <span className="orText">or</span>
                    <div className="line"></div>
                </div>
                <div className = "signupBtnContainer">
                    <Link className="signupBtn" to = "signup">{signUp}</Link>  
                </div>              
            </div>
        </>
    );
  }