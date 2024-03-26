import HomePage from '../pages/homepage.js'
import Model from '../models/datamodel.js';
import {Link} from 'react-router-dom';
// import CustomCursor from '../components/animations/cursor/customCursor.jsx';
import WelcomePage from '../pages/welcomePage.js'

export default function connect(){
    return (
        <>
            {/* <CustomCursor/> */}
            <WelcomePage/>
            {/* <HomePage/> */}
            
        </>
    );
}
