import React from 'react';
import styled from 'styled-components';
import { useDarkMode} from '../../../contexts/DarkMode/DarkMode';
import { useSidebar } from '../../../contexts/SideBarOpen/SidebarContext';
interface Link {
  name: string;
  url: string;
}

interface NavigationLinksProps {
  links: Link[];
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ links }) => {
  const {isDarkMode} = useDarkMode();
  const {isSidebarOpen} = useSidebar();

  return (
    <Nav $isSidebarOpen = {isSidebarOpen} $isDarkMode={isDarkMode}>
      {links.map(link => (
        <StyledLink href={link.url} key={link.name} $isDarkMode={isDarkMode}>
          {link.name}
        </StyledLink>
      ))}
    </Nav>
  );
};

export default NavigationLinks;


const Nav = styled.nav<{ $isSidebarOpen: boolean; $isDarkMode: boolean }>`
  opacity: ${({ $isSidebarOpen }) => $isSidebarOpen ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;

const StyledLink = styled.a<{ $isDarkMode: boolean }>`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  display: block;
  color: ${({ $isDarkMode }) => $isDarkMode ? '#a9a9a9' : '#313131'};
  transition: color 0.3s, opacity 0.3s ease-in-out;

  &:hover {
    color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
    background-color: ${({ $isDarkMode }) => $isDarkMode ? '#333' : '#eee'};  // subtle background change on hover
    transition: color 0.3s, background-color 0.3s, opacity 0.3s ease-in-out;
  }

  &:active {
    background-color: ${({ $isDarkMode }) => $isDarkMode ? '#555' : '#ccc'};  // deeper background on click
    transition: color 0.2s, background-color 0.2s;
  }
`;

