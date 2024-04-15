import React, {useState} from 'react';
import { Link } from 'react-router-dom';


import '../../../../stylesheets/App.css'; 
import '../../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../../stylesheets/loginSignup/login/containers/verification.css'

import PhoneIcon from '../assets/phoneIcon.gif'



function VerificationText(){
    return(
        <div className = "verificationText">
            <p> 
                Just making 
                <span className='sure'> sure</span>.
            </p>
        </div>
    );
}



export default function VerificationContainer() {
    let id = "z*********al@gmail.com"
    return (
        <>
            <VerificationText/>
            <div className="verification">     
                <div className = "verificationHeader">
                    <p> Two step verification</p>
                </div>
                <div className = "verificTxt">
                    <p> 
                        A code has been sent 
                        to {id}
                    </p>
                </div> 
                <div className = "verificAnimeCode">

                    <div className="codeContainer">
                        <input type="text" id="codeInput" placeholder=" " />
                        <label htmlFor="codeInput">Verification Code</label>
                    </div>
                 

                    <div className = "verificAnim">
                       <img src={PhoneIcon} alt="" />
                    </div>
                </div>


                <div class="verificationButtons">
                    <div class="resendBtnContainer">
                        <Link class="resendBtn">Send it again(20)</Link>
                    </div>
                    <div class="loginVerificBtnContainer">
                        <Link class="loginVerificBtn">Sign in</Link>
                    </div>
                </div>
            
            </div>
        </>
    );
  }