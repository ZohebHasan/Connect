
import React,{useState} from 'react';
import { Link } from 'react-router-dom'

import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/userAgreement/agreementBody.css';
import '../../../stylesheets/elements/conna.css';

import {useLanguage} from '../../../contexts/Language'; //keep it
 //I have code for age errors, commented out as I do think using something like a drop down is better
 //, as it enforces the user to select something.
function AgreementText(){
    return(
        <div className = "agreementText">
            <p> 
                User and Privacy Policy
                <span className='agreementSpan'> Agreement</span>
            </p>
        </div>
    );
}

export default function Body() {
    //const [isOver13, setIsOver13] = useState(false);
    const [agreedpolicy, setAgreedpolicy] = useState(false);
    //const [ageError, setAgeError] = useState(false);
    const [policyError, setPolicyError] = useState(false); 


    // const handleAge = (event) => {
    //     setIsOver13(!isOver13);
    //     setAgeError(false);
    // };

    const handlePolicy = (event) => {
        setAgreedpolicy(!agreedpolicy);
        setPolicyError(false);
    };

    const handleConfirmClick = (e) => {
        let isValid = true;
        // if (!isOver13) {
        //     isValid = false;
        //     setAgeError(true);
        // } 
        if (!agreedpolicy) {
            isValid = false;
            setPolicyError(true);
        } 
        if (!isValid) {
            e.preventDefault();
        }
    };

    const {changeLanguage} = useLanguage();
    return (
        <>
            <div className="agreementBody">  
                <AgreementText/>
                <div className = "agreementContainer"> 
                    <div className = "agreements">
                        <ul>
                        <li>I understand that I will store and have 100% control over my personal information.</li>
                        <li>I understand my uncensored content will only be seen by people if they want to.</li>
                        <li>I understand I will not be able to download or copy other user's information if they have data protection turned on.</li>
                        <li>I understand that my interactions with a user under 13 years old will strictly be moderated, such as comments, messages.</li>
                        </ul>
                    </div>
                    <div className="AgeConfirmation">
                            <input
                                type="checkbox"
                                className="custom"
                                //checked={isOver13}
                                //onChange={handleAge}
                            />
                            I confirm that I am over 13 years old.
                       
                    </div>
                    <p className={`ageError `}>  {/*ageError ? 'active' : ''?*/}
                    {/* I confirm I am above 13 years old. */}
                    </p>
                    <div className = "agreementTickbox">
                        <input type="checkbox" className="custom" id = "tickbox" checked={agreedpolicy} onChange={handlePolicy} />
                        I agree to Connect’s privacy, user, data, and child safety {' '}
                        <Link to="/privacy" class="policy-link">policies</Link>.

                    </div>
                    <p className={`policyError ${policyError ? 'active' : ''}`}>
                        You must agree to the policies before you can proceed.
                    </p>
                    <div className="agreeBtnContainer">
                        <Link to={agreedpolicy ? "/features" : "#"}  className="agreeBtn"  onClick={handleConfirmClick}> Confirm </Link>
                    </div>
                </div>
                <div className="connaAgreement">
                    <button className="connaBtn">Conna</button>
                </div>
            </div>
        </>
    );
};