import React, {useState} from 'react';
import { Link } from 'react-router-dom';


import '../../../../stylesheets/App.css'; 
import '../../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../../stylesheets/loginSignup/login/containers/verification.css'



export default function VerificationContainer() {

    return (
        <>
            <div className="verification">            
                <p>Two Step</p>          
                <div className = "verificationButtons">
                    <Link to = "#" className="loginBtn">Sign in</Link>
                </div>              
            </div>
        </>
    );
  }