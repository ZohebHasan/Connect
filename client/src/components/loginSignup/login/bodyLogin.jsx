import React from 'react';


import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../stylesheets/elements/conna.css';

import Poster from './smallComponents/poster.jsx'


import Login from './smallComponents/login.jsx'
import SignupNonEmail from './smallComponents/signUpNonEmail.jsx';
import Verification from './smallComponents/verification.jsx';

import Bottom from './smallComponents/bottomLoginSignup.jsx'

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
function SignupEmailText(){
    return(
        <div className = "signupEmailText">
            <p> 
                Let's get 
                you <span className='in'>Connected</span>.
            </p>
        </div>
    );
}
function VerificationText(){
    return(
        <div className = "verificationText">
            <p> 
                Just making 
                <span className='sure'> sure</span>.
            </p>
        </div>
    );
}

export default function Body({isDarkMode}) {
    return (
        <div className="loginBody">
            <Poster isDarkMode={isDarkMode} />
            <div className = "loginSignUpContainer">
                {/* <LoginText/> */}
                {/* <SignupEmailText/> */}
                <VerificationText/>

                {/* <Login/> */}
                {/* <SignupNonEmail/> */}
                <Verification/>
                <Bottom/>
            </div> 
        </div>
    );
}
