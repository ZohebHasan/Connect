import React, { useEffect, useState } from 'react';
import '../../../stylesheets/App.css'; 

export default function GreetingText() {
    const [greeting, setGreeting] = useState('Greetings!');
    const [opacity, setOpacity] = useState(0);

    useEffect(function() {
        let index = 0;
        const greetings = ['Greetings!', 'অভিবাদন!',' ¡Saludos!', 'Salutations!', 'Grüße!', 'Приветствия!', '问候！', '挨拶！', '인사말!', 'सलाम!', 'تحيات!', 'Selamat!'];

        const updateGreeting = () => {
            setOpacity(0);
            setTimeout(() => {
                index = (index + 1) % greetings.length;
                setGreeting(greetings[index]);
                setOpacity(1);
            }, 1000); // Match the fade-out duration
        };

        const intervalId = setInterval(updateGreeting, 4000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <h1 className="greetingText">
            {greeting}
        </h1>
    );
};


