import React, { useEffect, useState } from 'react';
import '../../../stylesheets/App.css'; 
import '../../../stylesheets/selectLanguagePage/selectLanguageBody.css';

export default function LanguagesDropDown() {
    const [searchTerm, setSearchTerm] = useState('');
    const languages = [
        { name: 'English', code: 'en' },
        { name: 'Spanish', code: 'es' },
        { name: 'French', code: 'fr' },
        { name: 'German', code: 'de' },
        { name: 'Russian', code: 'ru' },
        { name: 'Chinese', code: 'cn' },
        { name: 'Japanese', code: 'ja' },
        { name: 'Korean', code: 'ko' },
        { name: 'Hindi', code: 'hi' },
        { name: 'Arabic', code: 'ar' }
    ];

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dropDownBar">
            <div className="dropdown-container">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Please search by name or Country or choose from below. (7000 Available Languages)"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                {filteredLanguages.map(lang => (
                    <div key={lang.code} className="dropdown-item">
                        {lang.name}
                    </div>
                ))}
            </div>
         </div>
    );
};


