import React, { useEffect, useState } from 'react';
import '../../../stylesheets/App.css';
import '../../../stylesheets/selectLanguagePage/selectLanguageBody.css';

export default function GreetingText() {
    const [greeting, setGreeting] = useState('Greetings!');
    const [opacity, setOpacity] = useState(0);  // Start with 0 opacity for the initial fade-in

    useEffect(function() {
        let index = 0;
        const greetings = ['Greetings!', 'অভিবাদন!','¡Saludos!', 'Salutations!', 'Grüße!', 'Приветствия!', '问候！', '挨拶！', '인사말!', 'सलाम!', 'تحيات!', 'Selamat!'];

        const updateGreeting = () => {
            setOpacity(0);  // Start fade-out
            setTimeout(() => {
                index = (index + 1) % greetings.length;
                setGreeting(greetings[index]);
                setOpacity(1);  // Fade-in after text change
            }, 1000);  // Time to match fade-out duration
        };

        const intervalId = setInterval(updateGreeting, 2200);  // Change greeting every 4 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <h1 className="greetingMessage" style={{ opacity: opacity }}>{greeting}</h1> 
    );  
}
