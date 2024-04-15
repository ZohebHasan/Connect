import React,{useState} from 'react';

import '../../../stylesheets/App.css';
import '../../../stylesheets/elements/conna.css';

import Poster from './smallComponents/poster.jsx'
import Login from './smallComponents/login.jsx'
import BottomLogin from './smallComponents/bottomLogin.jsx'



export default function Body({ isDarkMode }) {
    return (
        <div className="loginBody">
            <Poster isDarkMode={isDarkMode} />
            <div className="loginSignUpContainer">             
                <Login/>
                <BottomLogin />
            </div> 
        </div>
    );
}
