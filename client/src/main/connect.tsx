import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Intro from '../pages/intro';
import SelectLanguagePage from "../pages/loginSignup/selectLanguagePage/selectLanguage";
import LoginPage from "../pages/loginSignup/loginPage/login";
import SignupPage from "../pages/loginSignup/signupPage/signup";
import TwoStepPageLogin from "../pages/loginSignup/twoStepLoginPage/twoStepLogin";
import AgreementPage from "../pages/loginSignup/agreementPage/agreement"

export default function Connect(): React.ReactElement {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/selectLanguage" element={<SelectLanguagePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/signup" element={<SignupPage />} />
                <Route path="/login/twoStep" element={<TwoStepPageLogin />} />
                {/* <Route path="/login" element={<AgreementPage />} /> */}
            </Routes>
        </Router>
    );
};

