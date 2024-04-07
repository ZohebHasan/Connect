import React from 'react';
import { useLanguage } from '../../../contexts/Language.js';
import { transHeader } from '../../../translations/loginSignup/selectLang/transHeader.js';

import '../../../stylesheets/elements/sideBar.css';

const Sidebar = ({ isOpen, sidebarRef }) => {
  const { language } = useLanguage();


  let aboutUs = "About Us";
  let mission = "Our Mission";
  let career = "Career";
  let contact = "Contact Us";
  let childSafety = "Child Safety";

  if (transHeader && transHeader[language]) {
    const { aboutUs: aboutUsVal, mission: missionVal, career: careerVal, contact: contactVal, childSafety: childSafetyVal } = transHeader[language];
    aboutUs = aboutUsVal || aboutUs;
    mission = missionVal || mission;
    career = careerVal || career;
    contact = contactVal || contact;
    childSafety = childSafetyVal || childSafety;
  }
 

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="emptySpace"></div>
      <div className={`links ${isOpen ? '' : 'hidden'}`}>
        <a href="#">{aboutUs}</a>
        <a href="#">{mission}</a>
        <a href="#">{career}</a>
        <a href="#">{contact}</a>
        <a href="#">{childSafety}</a>
      </div>
    </div>
  );
};

export default Sidebar;
