import React from 'react';
import '../../stylesheets/App.css'
import Header from './smallComponents/headerSelectLang'
import BackgroundAnimation from './assets/background';
import Body from './smallComponents/bodySelectLang.jsx'


export default function SelectLanguage(){
    return(
        <>
            <div className = "selectLanguageBodyContainer">
                <BackgroundAnimation/>
                <Header/>
                <Body/>
            </div>  
        </>
    );
}