
// import './App.css'; - Depricated as we will be using Tailwind CSS
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connect from './main/connect.js';
import SelectLanguagePage from "./pages/selectLanguagePage.js"
export default function App() {
  return (
    <Router>
      <Routes>
          <Route path = "/" element = {<Connect/>} />
          <Route path = "/selectLanguagePage" element = {<SelectLanguagePage/>}/>
      </Routes>
    </Router>
    
  );
}


