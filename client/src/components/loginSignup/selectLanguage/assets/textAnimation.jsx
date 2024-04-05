import React, { useState, useEffect } from 'react';
import '../../../../stylesheets/App.css';
import '../../../../stylesheets/loginSignup/selectLang/selectLangBody.css';

const AnimatedText = () => {
    const text = "Welcome to Connect! Please Select Your Language to get started.";
    const [index, setIndex] = useState(0);
    const greyLetterCount = 5; 
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setIndex(currentIndex => (currentIndex + 1) % text.length);
      }, 100); // Adjust timing as needed
  
      return () => clearInterval(intervalId);
    }, [text.length]);
  
    return (
        <>
            {text.split('').map((char, idx) => {
                let className = '';
                for (let i = 0; i < greyLetterCount; i++) {
                    if (idx === (index + i) % text.length) {
                    className = 'grey';
                    break; // Once the class is set to grey, break the loop
                    }
                }
            return <span key={idx} className={className}>{char}</span>;
        })}
        </>
    );
  };
  
  export default AnimatedText;
