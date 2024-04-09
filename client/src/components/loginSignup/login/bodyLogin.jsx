import React from 'react';


import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../stylesheets/elements/conna.css';

import Poster from './smallComponents/poster.jsx'
import Login from './smallComponents/login.jsx'
import Bottom from './smallComponents/bottomLoginSignup.jsx'


export default function Body({isDarkMode}) {
    return (
        <div className="loginBody">
            <Poster isDarkMode={isDarkMode} />
            <div className = "loginSignUpContainer">
                <Login/>
                <Bottom/>
            </div> 
        </div>
    );
}
