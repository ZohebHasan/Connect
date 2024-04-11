import React from 'react';


import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../stylesheets/elements/conna.css';

import Poster from './smallComponents/poster.jsx'
import Login from './smallComponents/login.jsx'
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

export default function Body({isDarkMode}) {
    return (
        <div className="loginBody">
            <Poster isDarkMode={isDarkMode} />
            <div className = "loginSignUpContainer">
                <LoginText/>
                <Login/>
                <Bottom/>
            </div> 
        </div>
    );
}
