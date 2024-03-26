// Body.js
import React from 'react';
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
                <Greetings />             
                <div className="dropDownTitle">
                    <p>Please Select Your Language.</p>
                </div>
                <LanguagesDropDown />
            </div>
        </>
    );
};


