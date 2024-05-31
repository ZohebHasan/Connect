import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useLanguage } from '../../../../contexts/Language/Language';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';
import { languages } from './languagesData';


interface DropDownContainerProps {
  $isDarkMode: boolean;
}

interface DropdownItemProps extends DropDownContainerProps {
  to: string;
  onClick: () => void;
}

export default function LanguagesDropDown() {
    const [searchTerm, setSearchTerm] = useState('');
    const { changeLanguage } = useLanguage();
    const { isDarkMode } = useDarkMode();

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.countries.some(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleLanguageChange = (langCode: string) => {
        changeLanguage(langCode);
    };

    return (
      <>
        <DropDownContainer $isDarkMode={isDarkMode}>
            <SearchBoxContainer>
                <SearchBox
                    type="text"
                    placeholder="Search by name or Country (53 Available Languages)"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    $isDarkMode={isDarkMode}
                />
            </SearchBoxContainer>
            <LanguageListContainer>

                {filteredLanguages.map(lang => (
                    <DropdownItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        to="/login"
                        $isDarkMode={isDarkMode}
                    >
                        {lang.name}
                    </DropdownItem>
                ))}
            </LanguageListContainer>
       </DropDownContainer>
        </>
    );
}





const DropDownContainer = styled.div<DropDownContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(156, 156, 156, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
  color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 10px;
  width: 100%; 
  height: 100%;
  max-width: 100%; 
  min-width: 25%; 
  // background-color: blue;
`;

const SearchBoxContainer = styled.div`
  align-self: flex-start;
  flex: 1;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchBox = styled.input<DropDownContainerProps>`
  width: 100%;
  height: 40%;
  border-radius: 10px;
  outline: none;
  padding: 8px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.8)'};
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 0 4px rgba(116, 2, 106, 0.1);
    animation: mildGlow 1.5s infinite alternate ease-in-out;
  }

  @keyframes mildGlow {
    from { box-shadow: 0 0 2px rgba(146, 6, 134, 0.3); }
    to { box-shadow: 0 0 6px rgba(204, 0, 187, 0.6); }
  }
`;

const LanguageListContainer = styled.div`
  flex: 7;
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  flex-direction: column;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }
`;

const DropdownItem = styled(Link)<DropdownItemProps>`
  padding: 8px 18px; 
  display: block; 
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease; 
  color: ${({ $isDarkMode }) => $isDarkMode ? '#fffefe' : '#1f1f1f'};
  background-color: transparent;
  text-decoration: none; 
  font-weight: 5px;

  &:hover, &:focus {
    background-color: rgba(226, 226, 226, 0.486); 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    background-color: #e0e0e0; 
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); 
    transform: translateY(1px); 
  }
`;
