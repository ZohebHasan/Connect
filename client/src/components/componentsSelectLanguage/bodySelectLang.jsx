// Body.js
import React from 'react';
import { Link } from 'react-router-dom'
import '../../stylesheets/App.css'; 
import '../../stylesheets/selectLanguagePage/selectLanguageBody.css'; 
import Greetings from './assets/greetings.jsx';
import AnimatedText from './assets/textAnimation.jsx';
import LanguagesDropDown from './smallComponents/languagesDropdown.jsx';
import Sidebar from './smallComponents/sideBar.jsx'; 

export default function Body({ isSidebarOpen, toggleSidebar , sidebarRef}) {
    
    return (
        <>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} />
            <div className="selectLanguageBodyContainer">  
                <div className = "greetingsDropDownTextContainer">
                    <Greetings /> 
                    <div className="dropDownText">
                        <AnimatedText/>
                    </div>
                </div>
                <LanguagesDropDown />

                <div className="bottomContainer">
                    <div className="selectLangBtns">
                        <Link to="#" className="declineBtn">Skip (Default)</Link>
                        <Link to="#" className="confirmBtn">Confirm</Link>
                    </div>
                    <div className="connaContainer">
                        <button className="connaBtn">Conna</button>
                    </div>
                </div>


            
                
            </div>
        </>
    );
};


