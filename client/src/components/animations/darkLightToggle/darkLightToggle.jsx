import React, { useState, useEffect, forwardRef } from 'react';
import '../../../stylesheets/App.css'; 
import '../../../stylesheets/selectLanguagePage/selectLanguageHeader.css';
import '../../../stylesheets/selectLanguagePage/selectLanguageBody.css';

const DarkLightToggle = forwardRef((props, ref) => {
  // Theme state, true for dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Add or remove the dark-mode class based on the darkMode state
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setDarkMode(!darkMode); // Toggle the state
  };

  return (
    <div ref={ref} className={`toggleContainer ${darkMode ? '' : 'light-mode'}`} onClick={toggleTheme}>
      <span className={`icon sun-icon ${!darkMode ? '' : 'hidden'}`}>&#9728;</span>
      <div className={`toggle-circle ${!darkMode ? 'toggle-circle-light' : ''}`}></div>
      <span className={`icon moon-icon ${darkMode ? '' : 'hidden'}`}>&#9789;</span>
    </div>
  );
});

export default DarkLightToggle;
