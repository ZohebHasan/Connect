import React, {useState} from 'react';
import { Link } from 'react-router-dom';


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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <div className="credentialContainer">    
            <div className="idContainer">
                <input type="text" id="emailInput" placeholder=" " />
                <label htmlFor="emailInput">Phone, email, or username</label>
            </div>
            <div className="passwordContainer">
                <input
                    type={showPassword ? "text" : "password"}
                    id="passwordInput"
                    placeholder=" "
                />
                <label for="passwordInput">Password</label>
                <button onClick={togglePasswordVisibility} className="togglePasswordBtn">
                    <img src={showPassword ? ShowSign : HideSign} alt={showPassword ? "Hide" : "Show"} />
                </button>

            </div>        
        </div>
    );
}


function SocialLoginButtons (){
    return(
        <div className="socialLoginButtons">
            <p> Sign in With: </p>
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
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
        <>
            {/* <BackgroundLogin/> */}
            <LoginText/>
            <div className="login">          
                <CredentialContainer/>
                <div className = "loginBtnContainer">
                    <Link to = "#" className="loginBtn">Sign in</Link>
                </div>    
                <SocialLoginButtons/>
    
                <div className="dividerContainer">
                    <div className="line"></div>
                        <span className="orText">or</span>
                    <div className="line"></div>
                </div>
                <div className = "signupBtnContainer">
                    <Link className="signupBtn">Create an account</Link>  
                </div>              
            </div>
        </>
    );
  }