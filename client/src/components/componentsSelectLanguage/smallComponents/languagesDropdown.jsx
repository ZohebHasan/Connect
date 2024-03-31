import React, { useEffect, useState } from 'react';
import '../../../stylesheets/App.css'; 
import '../../../stylesheets/selectLanguagePage/selectLanguageBody.css';

export default function LanguagesDropDown() {
    const [searchTerm, setSearchTerm] = useState('');
    const languages = [
        { "name": "English", "code": "en" },
        { "name": "Español", "code": "es" },
        { "name": "Français", "code": "fr" },
        { "name": "Deutsch", "code": "de" },
        { "name": "Русский", "code": "ru" },
        { "name": "中文", "code": "cn" },
        { "name": "日本語", "code": "ja" },
        { "name": "한국어", "code": "ko" },
        { "name": "हिन्दी", "code": "hi" },
        { "name": "العربية", "code": "ar" }
    ];

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <div className = "dropDownContainer">
             <div className = "searchBoxContainer">
                <input
                        type="text"
                        className="search-box"
                        placeholder="Please search by name or Country or choose from below. (7000 Available Languages)"
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


