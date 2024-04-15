import React from 'react';

import '../../../stylesheets/App.css'; 
import '../../../stylesheets/elements/conna.css';

import Poster from './smallComponents/poster.jsx'
import SignupNonEmail from './smallComponents/signUpNonEmail.jsx';


import BottomSignup from './smallComponents/bottomSignup.jsx'



export default function Body({ isDarkMode }) {
   

    return (
        <div className="loginBody">
            <Poster isDarkMode={isDarkMode} />
            <div className="loginSignUpContainer">           
                <SignupNonEmail />
                <BottomSignup />
            </div> 
        </div>
    );
}
