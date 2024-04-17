import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import {useLanguage} from '../../../../contexts/Language/Language.js'
import { languages } from './languagesData.js'

import '../../../../stylesheets/App.css'
import '../../../../stylesheets/loginSignup/selectLang/selectLangBody.css';

export default function LanguagesDropDown() {
    const [searchTerm, setSearchTerm] = useState('');
    const { changeLanguage } = useLanguage();
    
    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.countries.some(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
    };

    return (
        <>
        <div className = "dropDownContainer">
             <div className = "searchBoxContainer">
                <input
                        type="text"
                        className="search-box"
                        placeholder="Search by name or Country (53 Available Languages)"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="languageListContainer">
                {filteredLanguages.map(lang => (
                    <Link key={lang.code} 
                        className="dropdown-item"
                        onClick={() => handleLanguageChange(lang.code)}
                        to = "/login"
                        >
                        {lang.name}
                    </Link>
                ))}
            </div>
        </div>

        </>
        
      
    );
};


