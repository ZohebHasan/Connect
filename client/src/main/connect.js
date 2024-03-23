import HomePage from '../pages/homepage.js'
import Model from '../models/dataModel.js';
import {Link} from 'react-router-dom';
import CustomCursor from '../components/animations/customCursor.jsx';

export default function connect(){
    return (
        <>
            <CustomCursor/>
            <HomePage/>
        </>
    );
}
