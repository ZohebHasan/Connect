import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Intro from '../pages/intro.js'
import SelectLanguagePage from "../pages/loginSignup/selectLanguage.js";
import LoginPage from "../pages/loginSignup/login.js";

export default function Connect(){
    return (
     
            <Router>
                <Routes>
                    <Route path = "/" element = {<Intro/>} />
                    <Route path = "/selectLanguage" element = {<SelectLanguagePage/>}/>
                    <Route path = "login" element = {<LoginPage/>}/>
                </Routes>
            </Router>

    );
}
