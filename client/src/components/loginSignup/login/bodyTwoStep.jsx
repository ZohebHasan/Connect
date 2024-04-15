import React from 'react';


import '../../../stylesheets/App.css'; 

import '../../../stylesheets/elements/conna.css';

import Poster from './smallComponents/poster.jsx'
import Verification from './smallComponents/verification.jsx';
import BottomTwoStep from './smallComponents/bottomTwoStep.jsx'



export default function Body({ isDarkMode }) {
    return (
        <div className="loginBody">
            <Poster isDarkMode={isDarkMode} />
            <div className="loginSignUpContainer">
                <Verification />
                <BottomTwoStep />
            </div> 
        </div>
    );
}
