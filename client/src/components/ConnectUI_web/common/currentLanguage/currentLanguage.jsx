import React from 'react';
import { useLanguage } from '../../../../contexts/Language/Language'
import {languages} from '../../../loginSignup/selectLanguage/smallComponents/languagesData'


const CurrentLanguageDisplay = () => {
    const { language: languageCode } = useLanguage();
    const language = languages.find(lang => lang.code === languageCode);
    return (
            <p>Language: {language ? language.name : 'English'}</p>
    );
};

export default CurrentLanguageDisplay;
