import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../../../contexts/Language/Language';
import { languages } from '../../../registration/selectLanguage/smallComponents/languagesData';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';

interface Language {
  code: string;
  name: string;
}

const CurrentLanguageDisplay: React.FC = () => {
    const { language: languageCode } = useLanguage(); 
    const {isDarkMode} = useDarkMode();
    const language: Language | undefined = languages.find((lang: Language) => lang.code === languageCode);

    return (
        <LanguageText $isDarkMode = {isDarkMode}>Language: {language ? language.name : 'English'}</LanguageText>
    );
};

export default CurrentLanguageDisplay;


const LanguageText = styled.p<{$isDarkMode: boolean}>`
  font-size: 1.125rem;
  font-weight: 100;
  color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : '#212121'};
`;