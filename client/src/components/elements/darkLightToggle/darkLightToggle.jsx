import React, { useEffect, forwardRef } from 'react';
import { useDarkMode } from '../../../contexts/DarkMode';

import '../../../stylesheets/App.css'; 


const DarkLightToggle = forwardRef((props, ref) => {  
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div onClick={toggleDarkMode} ref={ref} className={`toggleContainer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <span className={`icon sun-icon ${!isDarkMode ? '' : 'hidden'}`}>&#9728;</span>
      <div className={`toggle-circle ${!isDarkMode ? 'toggle-circle-light' : ''}`}></div>
      <span className={`icon moon-icon ${isDarkMode ? '' : 'hidden'}`}>&#9789;</span>
    </div>
  );
});

export default DarkLightToggle;
