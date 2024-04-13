import React, {useState} from 'react';
import { Link } from 'react-router-dom';


import '../../../../stylesheets/App.css'; 
import '../../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../../stylesheets/loginSignup/login/containers/verification.css'



export default function VerificationContainer() {
    let id = "z*********al@gmail.com"

    return (
        <>
            <div className="verification">     
                <div className = "verificationTitle">
                    <p> 
                        A code has been sent 
                        to {id}
                    </p>
                </div> 
                <div className="idContainer">
                    <input type="text" id="emailInput" placeholder=" " />
                    <label htmlFor="emailInput">null</label>
                </div>

                <div className = "verificationButtons">
                    <div>
                        <Link className="loginBtn">Send it again(20)</Link>
                    </div>
                    <div>
                        <Link to = "#" className="loginBtn">Sign in</Link>
                    </div>
                </div>              
            </div>
        </>
    );
  }