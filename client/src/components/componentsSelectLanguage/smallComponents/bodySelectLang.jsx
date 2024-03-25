import React from 'react'
import '../../../stylesheets/App.css'; 

import Greetings from '../assets/greetings.jsx'
import LanguagesDropDown from './languagesDropdown';


export default function Body(){
    return(
        <>
            <div class = "selectLanguageBodyContainer">
                <Greetings/>
                <LanguagesDropDown/>
            </div>

        </>

    );
}
