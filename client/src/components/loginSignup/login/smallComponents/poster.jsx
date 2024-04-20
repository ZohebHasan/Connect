import React from 'react';

import {useLanguage} from '../../../../contexts/Language/Language'
import {poster} from '../../../../translations/loginSignup/login/poster.js'

import '../../../../stylesheets/App.css'; 
import '../../../../stylesheets/loginSignup/login/containers/poster.css';


import LogoDark from '../../../assets/logoDark.png';
import LogoLight from '../../../assets/logoLight.png'; 

import videoSrc from '../assets/poster.mp4';


export default function PosterContainer({isDarkMode}){
    const { language } = useLanguage();

    let the = "The";
    let freedom = "Freedom";
    let is = "is";
    let here = "here";
    let uncontrolled = "Uncontrolled";
    let period = ".";
    
    if (poster && poster[language]) {
        const { the: theVal, freedom: freedomVal, is: isVal, here: hereVal, uncontrolled: uncontrolledVal, period: periodVal } = poster[language];
        the = theVal;
        freedom = freedomVal;
        is = isVal;
        here = hereVal;
        uncontrolled = uncontrolledVal;
        period = periodVal;
    }
    
    

    return(
        <>
            <div className="posterContainer">
                {/* <video autoPlay loop muted className="video">
                    <source src={videoSrc} type="video/mp4" />
                </video> */}
                <div className = "posterLogoContainer">
                    <div className = "posterLogo">
                        <img src={isDarkMode ? LogoDark : LogoLight} alt="Logo" style={{ opacity: 1 }} />
                    </div>
                    <div className="posterText">
                        <p > 
                            {the} <span className='freedomSpan'>{freedom}</span><br />
                            {is} <span className='hereSpan'>{here}</span>{period}<br/>
                            <span className = 'uncontrolledSpan'>{uncontrolled}</span>{period} 
                        </p>
                    </div>           
                </div>     
            </div>
        </>
    );
}