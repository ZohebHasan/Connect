import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';


const GreetingText: React.FC = () => {
    const [greeting, setGreeting] = useState<string>('Greetings!');
    const [opacity, setOpacity] = useState<number>(1);
    const { isDarkMode } = useDarkMode(); 

    useEffect(() => {
        let index = 0;
        const greetings: string[] = ['Greetings!', 'অভিবাদন!', '¡Saludos!', 'Salutations!', 'Grüße!', 'Приветствия!', '问候！', '挨拶！', '인사말!', 'सलाम!', 'تحيات!', 'Selamat!'];

        const updateGreeting = () => {
            setOpacity(0);
            setTimeout(() => {
                index = (index + 1) % greetings.length;
                setGreeting(greetings[index]);
                setOpacity(1);
            }, 1000);
        };

        const intervalId = setInterval(updateGreeting, 2200);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <GreetingMessage $isDarkMode={isDarkMode} opacity={opacity}>
            {greeting}
        </GreetingMessage>
    );
};

export default GreetingText;



interface GreetingMessageProps {
    $isDarkMode: boolean;
    opacity: number;
}

const GreetingMessage = styled.h1<GreetingMessageProps>`
  flex: 0 0 auto;
  align-self: flex-start;
  height: 100px;
  font-size: 3em;
  color: transparent;
  background: ${({ $isDarkMode }) => $isDarkMode ? 
    'linear-gradient(to right, #2a37a8, #e15782)' : 
    'linear-gradient(to right, #662D8C, #ED1E79)'};
  -webkit-background-clip: text;
  background-clip: text;
  text-align: left;
  white-space: nowrap;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.5s ease-in-out, background-color 0.1s ease-in-out;
`;