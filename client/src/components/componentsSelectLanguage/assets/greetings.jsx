import React, { useEffect, useState } from 'react';
import '../../../stylesheets/App.css';
import '../../../stylesheets/selectLanguagePage/selectLanguageBody.css';

export default function GreetingText() {
    const [greeting, setGreeting] = useState('Greetings!');
    const [opacity, setOpacity] = useState(1);  // Start with full opacity to display the first greeting immediately

    useEffect(() => {
        let index = 0;
        const greetings = ['Greetings!', 'অভিবাদন!', '¡Saludos!', 'Salutations!', 'Grüße!', 'Приветствия!', '问候！', '挨拶！', '인사말!', 'सलाम!', 'تحيات!', 'Selamat!'];

        const updateGreeting = () => {
            setOpacity(0);  
            setTimeout(() => {
                index = (index + 1) % greetings.length;
                setGreeting(greetings[index]);
                setOpacity(1);  
            }, 1000);  
        };

       
        updateGreeting();

        const intervalId = setInterval(updateGreeting, 2200);  

        return () => clearInterval(intervalId);
    }, []);

    return (
        <h1 className="greetingMessage" style={{ opacity: opacity }}>{greeting}</h1> 
    );  
}
