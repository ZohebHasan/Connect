import React from "react";

import '../../../../stylesheets/loginSignup/login/containers/bottom.css'

export default function Bottom(){
    return(
        <div className="bottomLoginSignup">
            <div className = "currentLangLoginSignup">
                <p>Language: English (hardcoded)</p>
            </div>
            <div className="connaLoginSignup">
                <button className="connaBtn">Conna</button>
            </div>
        </div>
    );
}