import React, {useState} from 'react';
import { Link } from 'react-router-dom'

import videoSrc from './assets/poster.mp4';


import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../stylesheets/elements/conna.css';

import ShowSign from './assets/show.png';
import HideSign from './assets/hide.png';
import GoogleLogo from './assets/google.png';
import MicrosoftLogo from './assets/microsoft.png'
import AppleLightLogo from './assets/appleLogoBlack.png';
import AppleDarkLogo from './assets/appleLogoWhite.png';
import LogoDark from '../../assets/logoDark.png';
import LogoLight from '../../assets/logoLight.png'; 

import BackgroundLogin from './background/backgroundLogin';


function PosterContainer({isDarkMode}){
    return(
        <>
            <div className="posterContainer">
                <video autoPlay loop muted className="video">
                    <source src={videoSrc} type="video/mp4" />
                </video>
                <div className = "posterLogoContainer">
                    <div className = "posterLogo">
                        <img src={isDarkMode ? LogoDark : LogoLight} alt="Logo" style={{ opacity: 1 }} />
                    </div>
                    <div className="posterText">
                        <p > 
                            The <span className='freedomSpan'>Freedom</span><br />
                            is <span className='hereSpan'>Here</span>.<br/>
                            <span className = 'uncontrolledSpan'>Uncontrolled</span>. 
                        </p>
                    </div>
                   
                </div>
                
            </div>
        </>
    );
}
function LoginContainer() {
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
        <>
            <div className="loginContainer">
                {/* <BackgroundLogin/> */}
                <div className = "loginText">
                    <p> 
                        Let's get 
                        you <span className='in'>in</span>.
                    </p>
                </div>
                <div className="login">          
                    <div className="credentialContainer">    
                        <div className="idContainer">
                            <input type="text" id="emailInput" placeholder=" " />
                            <label for="emailInput">Phone, email, or username</label>
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


                    <div className = "loginBtnContainer">
                        <Link to = "#" className="loginBtn">Sign in</Link>
                    </div>    


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
                         
                    <div className="dividerContainer">
                        <div className="line"></div>
                            <span className="orText">or</span>
                        <div className="line"></div>
                    </div>
                    <div className = "signupBtnContainer">
                        <Link className="signupBtn">Create an account</Link>  
                    </div>
                              
                </div>
                    
                <div className="bottomContainer">
                    <div className="connaLogin">
                        <button className="connaBtn">Conna</button>
                    </div>
                </div>
            </div>
        </>
     
    );
  }
  


export default function Body({isDarkMode}) {
    return (
        <div className="loginBody">
            <PosterContainer isDarkMode={isDarkMode} />
            <LoginContainer/>
        </div>
    );
}
