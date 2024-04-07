import React from 'react';
import videoSrc from './assets/poster.mp4';
import '../../../stylesheets/App.css'; 
import '../../../stylesheets/loginSignup/login/loginBody.css';


import LogoDark from '../../assets/logoDark.png';
import LogoLight from '../../assets/logoLight.png'; 


function PosterContainer({isDarkMode}){
    return(
        <>
            <div className="posterContainer">
                <div className = "posterLogoContainer">
                    <div className = "posterLogo">
                        <img src={isDarkMode ? LogoDark : LogoLight} alt="Logo" style={{ opacity: 1 }} />
                    </div>

                    <p className="posterText"> 
                        The <span className='span1'>Future</span><br />
                        is <span className='span2'>Here</span>.
                    </p>

                </div>
                <video autoPlay loop muted className="video">
                    <source src={videoSrc} type="video/mp4" />
                </video>
                This is some video/our poster
            </div>
        </>
    );
}

function LoginContainer(){
    return(
        <>
            <div className="loginContainer">
                This is login Container
                <div className="login">
                    This is login element
                </div>
                <div className="bottomContainer">
                    <div className="connaContainer">
                        <button className="connaBtn">Conna</button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default function Body({isDarkMode}) {
    return (
        <div className="loginBody">
            <PosterContainer isDarkMode={isDarkMode} />
            <LoginContainer/>
        </div>
    );
}
