import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Intro from '../pages/intro';
import SelectLanguagePage from "../pages/loginSignup/selectLanguagePage";
import LoginPage from "../pages/loginSignup/loginPage";
import SignupPage from "../pages/loginSignup/signupPage";
import VerificationLoginPage from "../pages/loginSignup/verificationLoginPage";
import AddPhoneNumPage from '../pages/loginSignup/addPhoneNum'
import AgreementPage from "../pages/loginSignup/agreementPage"
import FeaturesPage from "../pages/loginSignup/featuresPage"
import ProfilesPage from "../pages/loginSignup/profiles"
import VerificationSignupPage from "../pages/loginSignup/verificationSignupPage"
import PersonalSetupPage from "../pages/loginSignup/personal"
import ProfessionalSetupPage from "../pages/loginSignup/professional"
import SchoolPage from "../pages/loginSignup/school"


export default function Connect(): React.ReactElement {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/selectLanguage" element={<SelectLanguagePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/signup" element={<SignupPage />} />
                {/* <Route path="/login/signup/addPhoneNumber" element={<AddPhoneNumPage />} /> */}
                <Route path="/verifyPhoneNum" element={<VerificationSignupPage/>}/>
                <Route path="/login/twoStep" element={<VerificationLoginPage/>} />
                <Route path="/agreement" element={<AgreementPage />} />
                <Route path= "/features" element = {<FeaturesPage/>}/>
                <Route path= "/profiles" element = {<ProfilesPage/>}/>
                <Route path= "/profiles/personal" element = {<PersonalSetupPage/>}/>
                <Route path= "/setupProfessional" element = {<ProfessionalSetupPage/>}/>
                <Route path= "/setupSchool" element = {<SchoolPage/>}/>
            </Routes>
        </Router>
    );
};

