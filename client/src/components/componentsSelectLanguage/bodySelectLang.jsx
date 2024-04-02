// Body.js
import React from 'react';
import { Link } from 'react-router-dom'
import '../../stylesheets/App.css'; 
import '../../stylesheets/selectLanguagePage/selectLanguageBody.css'; 
import Greetings from './assets/greetings.jsx';
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
                        <p>
                            Welcome to Connect! Please Select Your 
                            Language to get started.
                        </p>
                    </div>
                </div>
                
                <LanguagesDropDown />
                <div className = "selectLangBtns">
                    <Link to="#" className = "confirmBtn">Confirm</Link>
                    <Link to="#" className = "declineBtn">Continue Anyway</Link>
                    <button className = "connaBtn">Conna</button> 
                </div>
            </div>
        </>
    );
};


