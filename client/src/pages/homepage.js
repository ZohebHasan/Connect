import React from 'react';
import {Link} from 'react-router-dom';

import HeaderHomePage from '../components/componentsHome/headerHome.jsx';
import BodyHomePage from '../components/componentsHome/bodyHome.jsx';

export default function HomePage(){
    return (
        <>
            <HeaderHomePage/>
            <BodyHomePage/>
        </>
    );
}