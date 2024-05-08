import React from 'react';
import { useLanguage } from '../../../contexts/Language/Language';
import { transHeader } from '../../../translations/loginSignup/selectLang/transHeader';
import Sidebar from '../../ConnectUI_web/templetes/sideBarTemplete';
import SideBarLinks from '../../ConnectUI_web/templetes/sidebarLinksTemplete'


const SidebarContainer: React.FC = () => {
  const { language } = useLanguage();

  const {
    aboutUs = "About Us",
    mission = "Our Mission",
    career = "Career",
    contact = "Contact Us",
    childSafety = "Child Safety"
  } = transHeader[language] || {};

  const links = [
    { name: aboutUs, url: '#' },
    { name: mission, url: '#' },
    { name: career, url: '#' },
    { name: contact, url: '#' },
    { name: childSafety, url: '#' }
  ];

  return (
    <Sidebar>
      <SideBarLinks links={links} />
    </Sidebar>
  );
};

export default SidebarContainer;
