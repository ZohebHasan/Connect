// Body.js
import React from 'react';
import { Link } from 'react-router-dom'

import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/selectLang/selectLangBody.css';

import Greetings from './assets/greetings.jsx';
import AnimatedText from './assets/textAnimation.jsx';
import LanguagesDropDown from './smallComponents/languagesDropdown.jsx';


export default function Body({ isSidebarOpen, toggleSidebar , sidebarRef}) {
    
    return (
        <>
            <div className="selectLangBody">  
                <div className = "greetingsDropDownTextContainer">
                    <Greetings /> 
                    <div className="dropDownText">
                        <AnimatedText/>
                    </div>
                </div>
                <LanguagesDropDown />

                <div className="bottomContainer">
                    <div className="selectLangBtns">
                        <Link to="/login" className="declineBtn">Skip (Default)</Link>
                        <Link to="/login" className="confirmBtn">Confirm</Link>
                    </div>
                    <div className="connaContainer">
                        <button className="connaBtn">Conna</button>
                    </div>
                </div>
            </div>
        </>
    );
};