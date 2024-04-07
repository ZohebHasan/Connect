import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/App.css'; 
import '../../stylesheets/intro/intro.css'; 

// Import images
import C_dark from './assets/dark/C_dark.jpeg';
import o from './assets/dark/o.jpeg';
import n from './assets/dark/n.jpeg';
import e from './assets/dark/e.jpeg';
import c from './assets/dark/c.jpeg';
import t from './assets/dark/t.jpeg';

export default function Welcome() {
    const navigate = useNavigate();

    useEffect(() => {
        const images = document.querySelectorAll('.welcomeAnimation img');
        const centerIndex = Math.floor(images.length / 2);
        let totalDuration = 0;
        const animationDuration = 3000; 

        images.forEach((img, index) => {
            const distance = Math.abs(centerIndex - index);
            const direction = index < centerIndex ? -1 : 1;  
            const delay = distance * 200; // Increased delay calculation to make the stagger effect slower
            totalDuration = Math.max(totalDuration, delay + animationDuration);

            setTimeout(() => {
                img.style.opacity = 1;
                img.style.transition = `transform ${animationDuration}ms ease, opacity ${animationDuration}ms ease`;
                img.style.transform = `translateX(${direction * distance * -19}px)`;
            }, delay);
        });

        // Navigate after all animations are done
        setTimeout(() => {
            navigate('/selectLanguage'); 
        }, totalDuration);

    }, [navigate]); 

    return (
        <div className="welcome" id="welcome">
            <div id="welcomeAnimation" className="welcomeAnimation">
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
