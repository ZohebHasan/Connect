import React from 'react';
import { useLanguage } from '../../../contexts/Language.js'
import {languages} from '../../loginSignup/selectLanguage/smallComponents/languagesData.js'


const CurrentLanguageDisplay = () => {
    const { language: languageCode } = useLanguage();
    const language = languages.find(lang => lang.code === languageCode);
    return (
            <p>Language: {language ? language.name : 'English'}</p>
    );
};

export default CurrentLanguageDisplay;
