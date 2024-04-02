import React, { useEffect, useState } from 'react';
import '../../../stylesheets/App.css'; 
import '../../../stylesheets/selectLanguagePage/selectLanguageBody.css';

export default function LanguagesDropDown() {
    const [searchTerm, setSearchTerm] = useState('');
    const languages = [
        { "name": "English", "code": "en", "countries": ["United States", "United Kingdom", "Australia", "Canada"] },
        { "name": "Español", "code": "es", "countries": ["Spain", "Mexico", "Colombia"] },
        { "name": "Français", "code": "fr", "countries": ["France", "Belgium", "Switzerland"] },
        { "name": "Deutsch", "code": "de", "countries": ["Germany", "Austria", "Switzerland"] },
        { "name": "Русский", "code": "ru", "countries": ["Russia", "Belarus"] },
        { "name": "中文", "code": "cn", "countries": ["China"] },
        { "name": "日本語", "code": "ja", "countries": ["Japan"] },
        { "name": "한국어", "code": "ko", "countries": ["South Korea"] },
        { "name": "हिन्दी", "code": "hi", "countries": ["India"] },
        { "name": "العربية", "code": "ar", "countries": ["Saudi Arabia", "Iraq", "Egypt"] }
    ];
    
    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.countries.some(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
                    <div key={lang.code} className="dropdown-item">
                        {lang.name}
                    </div>
                ))}
            </div>
        </div>

        </>
        
      
    );
};


