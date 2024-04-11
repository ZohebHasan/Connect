// Body.js
import React from 'react';
import { Link } from 'react-router-dom'

import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/selectLang/selectLangBody.css';
import '../../../stylesheets/elements/conna.css';

import {useLanguage} from '../../../contexts/Language';

import Greetings from './assets/greetings.jsx';
import AnimatedText from './assets/textAnimation.jsx';
import LanguagesDropDown from './smallComponents/languagesDropdown.jsx';


export default function Body() {
    const {changeLanguage} = useLanguage();
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
                        <Link to="/login" 
                              className="declineBtn"
                              onClick = {() =>
                                changeLanguage('en-US')
                              }>
                                  Skip (Default)
                        </Link>
                    </div>
                    <div className="connaSelectLang">
                        <button className="connaBtn">Conna</button>
                    </div>
                </div>
            </div>
        </>
    );
};