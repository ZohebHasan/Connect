import React, {useState} from 'react';
import { Link } from 'react-router-dom';


import '../../../../stylesheets/App.css'; 
import '../../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../../stylesheets/loginSignup/login/containers/signupNonEmail.css';

import GoogleLogo from '../assets/google.png';
import MicrosoftLogo from '../assets/microsoft.png'
import AppleLightLogo from '../assets/appleLogoBlack.png';



function SocialSignupButtons (){
    return(
        <div className="socialSignupButtons">
            <p> Sign up With: </p>
            <Link to = "#" className="microsoftBtn">
                <img src={MicrosoftLogo} alt="Microsoft"/>
            </Link>
            <Link className="appleBtn">
                <img src={AppleLightLogo} alt="Apple"/>
            </Link>
            <Link className="googleBtn">
                <img src={GoogleLogo} alt="Google"/>
            </Link>
        </div>
    );
}


export default function SignupNonEmailContainer() {
    return (
        <>
            <div className="signupNonEmail">    
                <SocialSignupButtons/>      
                <div className="dividerContainer">
                    <div className="line"></div>
                        <span className="orText">or</span>
                    <div className="line"></div>
                </div>
                <div className = "signupBtnContainer">
                    <Link className="signupBtn">Sign up with email</Link>  
                </div>              
            </div>
        </>
    );
  }