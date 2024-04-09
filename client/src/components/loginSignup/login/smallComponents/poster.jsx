import React, {useState} from 'react';
import { Link } from 'react-router-dom';


import '../../../../stylesheets/App.css'; 
// import '../../../../stylesheets/loginSignup/login/loginBody.css';
import '../../../../stylesheets/loginSignup/login/containers/poster.css';


import LogoDark from '../../../assets/logoDark.png';
import LogoLight from '../../../assets/logoLight.png'; 

import videoSrc from '../assets/poster.mp4';



export default function PosterContainer({isDarkMode}){
    return(
        <>
            <div className="posterContainer">
                <video autoPlay loop muted className="video">
                    <source src={videoSrc} type="video/mp4" />
                </video>
                <div className = "posterLogoContainer">
                    <div className = "posterLogo">
                        <img src={isDarkMode ? LogoDark : LogoLight} alt="Logo" style={{ opacity: 1 }} />
                    </div>
                    <div className="posterText">
                        <p > 
                            The <span className='freedomSpan'>Freedom</span><br />
                            is <span className='hereSpan'>Here</span>.<br/>
                            <span className = 'uncontrolledSpan'>Uncontrolled</span>. 
                        </p>
                    </div>           
                </div>     
            </div>
        </>
    );
}