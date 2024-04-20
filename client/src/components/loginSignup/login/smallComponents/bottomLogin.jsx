import React from "react";

import '../../../../stylesheets/loginSignup/login/containers/bottom.css'

import CurrentLanguage from '../../../ConnectUI_web/common/currentLanguage/currentLanguage.jsx'

export default function Bottom(){
    return(
        <div className="bottomLogin">
            <div className = "currentLangLoginSignup">
                <CurrentLanguage/>
            </div>
            <div className="connaLoginSignup">
                <button className="connaBtn">Conna</button>
            </div>
        </div>
    );
}