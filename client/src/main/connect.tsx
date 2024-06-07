import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { LoginProvider } from '../contexts/login/loginContext';
import { SignupProvider } from '../contexts/registration/signup/signupContext';
import { ProfileProvider } from '../contexts/profiles/profilesContext';
import { PersonalProfileNavigationProvider } from '../contexts/navigation/personalProfileNav';

import { PixelProvider } from '../contexts/personalProfile/pixelContext';
import { ClipProvider } from '../contexts/personalProfile/clipContext';
import { ChirpProvider } from '../contexts/personalProfile/chirpContext';


import PageContainer from '../components/ConnectUI_web/templetes/pageTemplete';
import Background1 from '../components/ConnectUI_web/backgrounds/background1/background1';
import Copyright from '../components/ConnectUI_web/common/copyright/Copyright';
import ImageAnalysis from '../contentRec/imageAnalysis';

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

import CurrentUserPersonal from "../pages/currentUserPersonal";
import CurrentUserProfessional from "../pages/currentUserProfessional"
import Feed from "../pages/feed";

import ProtectedRoute from '../contexts/protectedRoute/protectedRoute';

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
        console.log("Current Pathname:", location.pathname); // Debugging log
        switch (location.pathname) {
            case "/login":
            case "/login/signup":
            case "/signup":
            case "/signup/userInfo":
            case "/signup/idVerification":
            case "/signup/ageVerification":
            case "/signup/features":
            case "/signup/profiles":
                setBackgroundComponent(<Background1 />);
                break;
            default:
                setBackgroundComponent(null);
                break;
        }
    }, [location.pathname]);

    return (
        <>
            <PageContainer>

                {backgroundComponent}
                
                <RoutesWrapper />
            </PageContainer>
            {/* <ImageAnalysis /> */}
            <Copyright />
        </>
    );
}

function RoutesWrapper() {
    return (
        <Routes>



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
                            <Route path="/features" element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>} />
                            <Route path="/profiles" element={<ProtectedRoute><ProfilesPage /></ProtectedRoute>} />
                        </Routes>
                    </SignupProvider>
                }
            />

            <Route
                path="/*"
                element={
                    <ProfileProvider>
                        <Routes>
                            <Route path="/home" element={<Feed />} />
                            <Route path="/currentUser/personal/*" element={<CurrentUserPersonalRoutes />} />
                            <Route path="/currentUser/professional/*" element={<CurrentUserProfessionalRoutes />} />
                        </Routes>
                    </ProfileProvider>
                }
            />
            {/* <Route path="/userInfoEmail" element={<UserInfoEmail />} />
            <Route path="/home" element={<Feed />} /> */}
        </Routes>
    );
}

function CurrentUserPersonalRoutes() {
    return (
        <PersonalProfileNavigationProvider>
            <Routes>
                <Route path="/" element={<PixelProvider> <CurrentUserPersonal /> </PixelProvider>} />
                <Route path="clips" element={<ClipProvider> <CurrentUserPersonal /> </ClipProvider>} />
                <Route path="chirps" element={<ChirpProvider> <CurrentUserPersonal /> </ChirpProvider>} />
            </Routes>
        </PersonalProfileNavigationProvider>
    );
}

function CurrentUserProfessionalRoutes() {
    return (

        <Routes>
            <Route path="/" element={ <CurrentUserProfessional /> } />
            {/* <Route path="clips" element={<ClipProvider> <CurrentUserProfessional/> </ClipProvider>} />
                <Route path="chirps" element={<ChirpProvider> <CurrentUserProfessional/> </ChirpProvider>} /> */}
        </Routes>

    );
}
