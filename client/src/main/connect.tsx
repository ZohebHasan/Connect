import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import PageContainer from '../components/ConnectUI_web/templetes/pageTemplete'
import Background1 from '../components/ConnectUI_web/backgrounds/background1/background1';
import Copyright from '../components/ConnectUI_web/common/copyright/Copyright';

// Pages
import Intro from '../pages/intro';
import SelectLanguagePage from "../pages/loginSignup/selectLanguage";
import LoginPage from "../pages/loginSignup/login";
import SignupPage from "../pages/loginSignup/signup";
import VerificationLoginPage from "../pages/loginSignup/verificationLogin";
import AgreementPage from "../pages/loginSignup/agreement";
import FeaturesPage from "../pages/loginSignup/features";
import ProfilesPage from "../pages/loginSignup/profiles";
import VerificationSignupPage from "../pages/loginSignup/verificationSignup";
import UserInfoNonEmail from "../pages/loginSignup/userInfoNonEmail";
import UserInfoEmail from "../pages/loginSignup/userInfoEmail";

import UserCredentals from "../pages/loginSignup/userCredentials"
import VerificationSignup from "../pages/loginSignup/verificationSignup"

import OAuth2Callback from '../components/registration/loginSignup/elements/oAuth2Google';

import DemoSignup from "../components/temp"
import DemoLogin from "../components/temp2"

import Feed from "../pages/feed"


export default function Connect(): React.ReactElement {
    return (
        <Router>
            <ConnectInner />
        </Router>
    );
}

function ConnectInner() {
    const location = useLocation();
   
    const [backgroundComponent, setBackgroundComponent] = useState<React.ReactNode>(<Background1 />);
    // const [pageVariant, setPageVariant] = useState <"fit" | "scrollable">('fit');

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setBackgroundComponent(null); 
                // setPageVariant('scrollable'); 
                break;
            case "/home":
                setBackgroundComponent(null); 
                // setPageVariant('scrollable'); 
                break;
            default:
                setBackgroundComponent(<Background1 />);
                // setPageVariant('fit');
                break;
        }
    }, [location.pathname]);

    return (
        <>
           
            <PageContainer > {/* variant={pageVariant} */}  {/* fadeIn={true} */}
                {/* {backgroundComponent} */}
                <Routes>   



                    <Route path="/oauth2/callback" element={<OAuth2Callback />} />  {/* this is for testing */}
              




                    <Route path="/" element={<Intro />} />
                    <Route path="/selectLanguage" element={<SelectLanguagePage />} />
                    {/* <Route path="/login" element={<DemoSignup/>} />  */}
                    <Route path="/login" element={<LoginPage />} />
                    {/* <Route path="/login" element={<DemoLogin />} /> */}
                    <Route path="/login/signup" element={<SignupPage />} />
                    <Route path="/login/twoStep" element={<VerificationLoginPage />} />
                    <Route path="/agreement" element={<AgreementPage />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/profiles" element={<ProfilesPage />} />
                    <Route path="/userInfoNonEmail" element={<UserInfoNonEmail />} />
                    <Route path="/userInfoEmail" element={<UserInfoEmail />} />
                    <Route path="/userCredentials" element={<UserCredentals />}/>
                    <Route path="/verifySignup" element={<VerificationSignup />} />
                    <Route path="/home" element={<Feed/>} />
                   

                </Routes>
            </PageContainer>
            <Copyright />
        </>
    );
}
