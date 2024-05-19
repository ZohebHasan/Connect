import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import PageContainer from '../components/ConnectUI_web/templetes/pageTemplete';
import Background1 from '../components/ConnectUI_web/backgrounds/background1/background1';
import Copyright from '../components/ConnectUI_web/common/copyright/Copyright';

import Intro from '../pages/intro';
import SelectLanguagePage from "../pages/loginSignup/selectLanguage";
import LoginPage from "../pages/loginSignup/login";
import SignupPage from "../pages/loginSignup/signup";
import VerificationLoginPage from "../pages/loginSignup/verificationLogin";
import AgreementPage from "../pages/loginSignup/agreement";
import FeaturesPage from "../pages/loginSignup/features";
import ProfilesPage from "../pages/loginSignup/profiles";
import VerificationSignupPage from "../pages/loginSignup/verificationSignup";
import DateOfBirth from "../pages/loginSignup/ageVerification";
import UserInfoEmail from "../pages/loginSignup/userInfoEmail";

import UserCredentials from "../pages/loginSignup/userCredentials";
import VerificationSignup from "../pages/loginSignup/verificationSignup";

import GoogleCallBack from '../components/registration/loginSignup/elements/GoogleCallBack';
import MicrosoftCallback from '../components/registration/loginSignup/elements/MicrosoftCallBack';

import DemoSignup from "../components/temp";
import DemoLogin from "../components/temp2";

import Feed from "../pages/feed";
import { LoginProvider } from '../contexts/login/loginContext';
import { SignupProvider } from '../contexts/signup/signupContext';

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

    useEffect(() => {
        switch (location.pathname) {
            case "/":
            case "/home":
                setBackgroundComponent(null);
                break;
            default:
                setBackgroundComponent(<Background1 />);
                break;
        }
    }, [location.pathname]);

    return (
        <>
            <PageContainer>
                {backgroundComponent}
                <RoutesWrapper />
            </PageContainer>
            <Copyright />
        </>
    );
}

function RoutesWrapper() {
    return (
        <Routes>
            {/* this two below are for testing */}
            <Route path="/auth/google/callback" element={<GoogleCallBack />} /> 
            <Route path="/auth/microsoft/callback" element={<MicrosoftCallback />} />

            <Route path="/" element={<Intro />} />
            <Route path="/selectLanguage" element={<SelectLanguagePage />} />
            <Route path="/login/signup" element={<SignupPage />} />
            
            <Route
                path="/login/*"
                element={
                    <LoginProvider>
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/twoStep" element={<VerificationLoginPage />} />
                        </Routes>
                    </LoginProvider>
                }
            />
            
            <Route
                path="/signup/*"
                element={
                    <SignupProvider>
                        <Routes>
                            <Route path="/" element={<SignupPage />} />
                            <Route path="/userInfo" element={<UserCredentials />} />
                            <Route path="/idVerification" element={<VerificationSignup />} />
                            <Route path="/ageVerification" element={<DateOfBirth />} />
                            {/* <Route path="/agreement" element={<AgreementPage />} /> */}
                            <Route path="/features" element={<FeaturesPage />} />
                            <Route path="/profiles" element={<ProfilesPage />} />
                        </Routes>
                    </SignupProvider>
                }
            />
            <Route path="/userInfoEmail" element={<UserInfoEmail />} />
            <Route path="/home" element={<Feed />} />
        </Routes>
    );
}
