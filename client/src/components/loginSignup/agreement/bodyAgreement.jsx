
import React from 'react';
import { Link } from 'react-router-dom'

import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/selectLang/selectLangBody.css';
import '../../../stylesheets/elements/conna.css';

// import {useLanguage} from '../../../contexts/Language'; //keep it

function AgreementText(){
    return(
        <div className = "agreementText">
            <p> {/**Write whatever here. */}
                User and Privacy policy
                <span className='agreementSpan'>agreement</span>.
            </p>
        </div>
    );
}

export default function Body() {
    // const {changeLanguage} = useLanguage();
    return (
        <>
            <div className="agreementBody">  
                <AgreementText/>
                <div className = "agreementContainer"> 
                    <div className = "agreements">
                        <p> Your stuffs </p>
                    </div>
                    <div className="agreeBtnContainer">
                        <Link to="/features" className="agreeBtn"> Confirm </Link>
                    </div>
                </div>
                <div className="connaAgreement">
                    <button className="connaBtn">Conna</button>
                </div>
            </div>
        </>
    );
};