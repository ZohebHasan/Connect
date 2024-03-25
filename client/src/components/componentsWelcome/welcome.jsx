import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/App.css'; 

// Import images
import C_dark from './assets/dark/C_dark.jpeg';
import o from './assets/dark/o.jpeg';
import n from './assets/dark/n.jpeg';
import e from './assets/dark/e.jpeg';
import c from './assets/dark/c.jpeg';
import t from './assets/dark/t.jpeg';

export default function Welcome () {
    const navigate = useNavigate();

    useEffect(() => {
        const images = document.querySelectorAll('.welcomeAnimation img');
        const centerIndex = Math.floor(images.length / 2);
        let totalDuration = 0;

        images.forEach((img, index) => {
            const distance = Math.abs(centerIndex - index);
            const direction = index < centerIndex ? -1 : 1;  
            const delay = distance * 100;
            totalDuration = Math.max(totalDuration, delay + 500); // assuming 500ms is the duration of each animation

            setTimeout(() => {
                img.style.opacity = 1;
                img.style.transform = `translateX(${direction * distance * -19}px)`;
            }, delay);
        });

        // Navigate after all animations are done
        setTimeout(() => {
            navigate('/selectLanguagePage'); 
        }, totalDuration);

    }, [navigate]); // adding navigate to the dependency array

    return (
        <div className = "welcome" id = "welcome">
            <div id="welcomeAnimation" class = "welcomeAnimation">
                <img src={C_dark} alt="C" className="logo"/>
                <img src={o} alt="o"/>
                <img src={n} alt="n"/>
                <img src={n} alt="n" className="center-letter"/>
                <img src={e} alt="e"/>
                <img src={c} alt="c"/>
                <img src={t} alt="t"/>
            </div>
        </div>

    );
};
