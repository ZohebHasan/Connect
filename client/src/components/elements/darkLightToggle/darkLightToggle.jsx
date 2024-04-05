import React, { useEffect, forwardRef } from 'react';
import '../../../stylesheets/App.css'; 
// import '../../../stylesheets/selectLanguagePage/selectLanguageHeader.css';
// import '../../../stylesheets/selectLanguagePage/selectLanguageBody.css';

const DarkLightToggle = forwardRef(({ isDarkMode, toggleDarkMode }, ref) => {  
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <div onClick={toggleDarkMode} ref={ref} className={`toggleContainer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <span className={`icon sun-icon ${!isDarkMode ? '' : 'hidden'}`}>&#9728;</span>
      <div className={`toggle-circle ${!isDarkMode ? 'toggle-circle-light' : ''}`}></div>
      <span className={`icon moon-icon ${isDarkMode ? '' : 'hidden'}`}>&#9789;</span>
    </div>
  );
});

export default DarkLightToggle;
