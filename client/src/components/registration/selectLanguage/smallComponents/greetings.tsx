import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';


const GreetingText: React.FC = () => {
    const [greeting, setGreeting] = useState<string>('Greetings!');
    const [opacity, setOpacity] = useState<number>(1);
    const { isDarkMode } = useDarkMode(); 

    useEffect(() => {
        let index = 0;
        const greetings: string[] = [
            'Hello!',             // English
            'অভিবাদন!',          // Bengali
            '你好！',              // Chinese (Mandarin)
            'नमस्ते!',           // Hindi
            '¡Hola!',             // Spanish
            'Oi!',                // Portuguese
            'Здравствуйте!',      // Russian
            'こんにちは！',        // Japanese
            '안녕하세요!',          // Korean
            'Merhaba!',           // Turkish
            'Hallo!',             // German
            'سلام!',              // Arabic
            'Salut!',             // French
            'Ciao!',              // Italian
            'สวัสดี!',             // Thai
            'Xin chào!',          // Vietnamese
            'سلام!',              // Persian
            'ਸਤ ਸ੍ਰੀ ਅਕਾਲ!',     // Punjabi
            'Selamat!',           // Malay/Indonesian
            'שלום!',              // Hebrew
            'नमस्कार!',           // Marathi
            'أهلاً!',             // Egyptian Arabic
        ];
        
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
  font-size: 3rem;
  height: 4rem;
  
  @media (max-width: 1280px) { 
    font-size: 2rem; 
 }

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