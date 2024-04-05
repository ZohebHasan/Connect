import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
import {useLanguage} from '../../../../contexts/Language.js'

import '../../../../stylesheets/App.css'
import '../../../../stylesheets/loginSignup/selectLang/selectLangBody.css';

export default function LanguagesDropDown() {
    const [searchTerm, setSearchTerm] = useState('');
    const { changeLanguage } = useLanguage();
    const languages = [
        { "name": "English (Default)", "englishName": "English", "code": "en", "countries": ["United States", "United Kingdom", "Australia", "Canada"] },
        { "name": "Español", "englishName": "Spanish", "code": "es", "countries": ["Spain", "Mexico", "Colombia"] },
        { "name": "Français", "englishName": "French", "code": "fr", "countries": ["France", "Belgium", "Switzerland"] },
        { "name": "Deutsch", "englishName": "German", "code": "de", "countries": ["Germany", "Austria", "Switzerland"] },
        { "name": "Русский", "englishName": "Russian", "code": "ru", "countries": ["Russia", "Belarus"] },
        { "name": "中文", "englishName": "Chinese", "code": "cn", "countries": ["China"] },
        { "name": "日本語", "englishName": "Japanese", "code": "ja", "countries": ["Japan"] },
        { "name": "한국어", "englishName": "Korean", "code": "ko", "countries": ["South Korea"] },
        { "name": "हिन्दी", "englishName": "Hindi", "code": "hi", "countries": ["India"] },
        { "name": "العربية", "englishName": "Arabic", "code": "ar", "countries": ["Saudi Arabia", "Iraq", "Egypt"] }
    ];
    
    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.countries.some(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleLanguageChange = (langCode) => {
        console.log("Changing language to:", langCode);
        changeLanguage(langCode);
        // Navigate to /selectLanguage or refresh the page if necessary
    };

    return (
        <>
        <div className = "dropDownContainer">
             <div className = "searchBoxContainer">
                <input
                        type="text"
                        className="search-box"
                        placeholder="Search by name or Country (7000 Available Languages)"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="languageListContainer">
                {filteredLanguages.map(lang => (
                    <div key={lang.code} 
                        className="dropdown-item"
                        onClick={() => handleLanguageChange(lang.code)}>
                        {lang.name}
                    </div>
                ))}
            </div>
        </div>

        </>
        
      
    );
};


