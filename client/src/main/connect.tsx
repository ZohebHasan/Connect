import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Intro from '../pages/intro';
import SelectLanguagePage from "../pages/loginSignup/selectLanguagePage";
import LoginPage from "../pages/loginSignup/loginPage";
import SignupPage from "../pages/loginSignup/signupPage";
import VerificationLoginPage from "../pages/loginSignup/verificationLoginPage";
import AgreementPage from "../pages/loginSignup/agreementPage"



export default function Connect(): React.ReactElement {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/selectLanguage" element={<SelectLanguagePage />} />
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/login/signup" element={<SignupPage />} />
                <Route path="/login/twoStep" element={<VerificationLoginPage/>} />
                {/* <Route path="/login" element={<AgreementPage />} /> */}
            </Routes>
        </Router>
    );
};

