import React from 'react';
import '../../../stylesheets/elements/sideBar.css'

const Sidebar = ({ isOpen, sidebarRef }) => {
  return (
       <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
          <div className = "emptySpace"> </div>
          <div className={`links ${isOpen ? '' : 'hidden'}`}>
            <a href="#">About Us</a>
            <a href="#">Our Mission</a>
            <a href="#">Career</a>
            <a href="#">Contact Us</a>
            <a href="#">Child safety</a>
          </div>
      </div>
     
  );
};


export default Sidebar;
