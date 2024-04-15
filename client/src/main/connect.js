import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Intro from '../pages/intro.js'
import SelectLanguagePage from "../pages/loginSignup/selectLanguage.js";
import LoginPage from "../pages/loginSignup/login.js";
import SignupPage from "../pages/loginSignup/signup.js";
import TwoStepPageLogin from "../pages/loginSignup/twoStepLogin.js";

import AgreementPage from "../pages/loginSignup/agreement.js"

export default function Connect(){
    return (
     
            <Router>
                <Routes>
                    <Route path = "/" element = {<Intro/>} />
                    <Route path = "/selectLanguage" element = {<SelectLanguagePage/>}/>
                    <Route path = "/login" element = {<LoginPage/>}/>
                    <Route path = "/login/signup/" element = {<SignupPage/>}/>
                    <Route path = "/login/twoStep/" element = {<TwoStepPageLogin/>}/>
                    {/* <Route path = "/login" element = {<AgreementPage/>}/> */}
                </Routes>
            </Router>

/* For Nikhil: 
Comment out line 16 and uncomment the code I added in line 17, 
it will directly take you to the page you need to build and style
*/
    );
}
