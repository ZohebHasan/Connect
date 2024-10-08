interface Language {
    name: string;
    englishName: string;
    code: string;
    countries: string[];
}

export const languages: Language[] = [
    { "name": "English (US)", "englishName": "English", "code": "en-US", "countries": ["United States"] },
    { "name": "বাংলা (বাংলাদেশ)", "englishName": "Bengali", "code": "bn-BD", "countries": ["Bangladesh"] },
    { "name": "English (UK)", "englishName": "English", "code": "en-GB", "countries": ["United Kingdom"] },
    { "name": "English (India)", "englishName": "English", "code": "en-IN", "countries": ["India"] },
    { "name": "English (Australia)", "englishName": "English", "code": "en-AU", "countries": ["Australia"] },
    { "name": "汉语 (中国)", "englishName": "Chinese", "code": "cmn-CN", "countries": ["China"] },
    { "name": "汉语 (台湾)", "englishName": "Chinese", "code": "cmn-TW", "countries": ["Taiwan"] },
    { "name": "汉语 (香港)", "englishName": "Chinese", "code": "yue-HK", "countries": ["Hong Kong"] },
    { "name": "हिंदी", "englishName": "Hindi", "code": "hi-IN", "countries": ["India"] },
    { "name": "Español (España)", "englishName": "Spanish", "code": "es-ES", "countries": ["Spain"] },
    { "name": "Español (México)", "englishName": "Spanish", "code": "es-MX", "countries": ["Mexico"] },
    { "name": "Español (Colombia)", "englishName": "Spanish", "code": "es-CO", "countries": ["Colombia"] },
    { "name": "Español (Estados Unidos)", "englishName": "Spanish", "code": "es-US", "countries": ["United States"] },
    { "name": "العربية", "englishName": "Arabic", "code": "ar", "countries": ["Saudi Arabia", "Iraq", "Egypt"] },
    { "name": "العربية (السعودية)", "englishName": "Arabic", "code": "ar-SA", "countries": ["Saudi Arabia"] },
    { "name": "বাংলা (ভারত)", "englishName": "Bengali", "code": "bn-IN", "countries": ["India"] },
    { "name": "Português (Brasil)", "englishName": "Portuguese", "code": "pt-BR", "countries": ["Brazil"] },
    { "name": "Português (Portugal)", "englishName": "Portuguese", "code": "pt-PT", "countries": ["Portugal"] },
    { "name": "Bahasa Indonesia", "englishName": "Indonesian", "code": "id-ID", "countries": ["Indonesia"] },
    { "name": "Русский (Россия)", "englishName": "Russian", "code": "ru-RU", "countries": ["Russia"] },
    { "name": "Русский (Беларусь)", "englishName": "Russian", "code": "ru-BY", "countries": ["Belarus"] },
    { "name": "Français (France)", "englishName": "French", "code": "fr-FR", "countries": ["France"] },
    { "name": "Français (Canada)", "englishName": "French", "code": "fr-CA", "countries": ["Canada"] },
    { "name": "Français (Belgique)", "englishName": "French", "code": "fr-BE", "countries": ["Belgium"] },
    { "name": "Français (Suisse)", "englishName": "French", "code": "fr-CH", "countries": ["Switzerland"] },
    { "name": "Deutsch (Deutschland)", "englishName": "German", "code": "de-DE", "countries": ["Germany"] },
    { "name": "Deutsch (Österreich)", "englishName": "German", "code": "de-AT", "countries": ["Austria"] },
    { "name": "Deutsch (Schweiz)", "englishName": "German", "code": "de-CH", "countries": ["Switzerland"] },
    { "name": "日本語", "englishName": "Japanese", "code": "ja-JP", "countries": ["Japan"] },
    { "name": "한국어", "englishName": "Korean", "code": "ko-KR", "countries": ["South Korea"] },
    { "name": "Türkçe", "englishName": "Turkish", "code": "tr-TR", "countries": ["Turkey"] },
    { "name": "Tiếng Việt", "englishName": "Vietnamese", "code": "vi-VN", "countries": ["Vietnam"] },
    { "name": "Italiano", "englishName": "Italian", "code": "it-IT", "countries": ["Italy"] },
    { "name": "Polski", "englishName": "Polish", "code": "pl-PL", "countries": ["Poland"] },
    { "name": "Українська", "englishName": "Ukrainian", "code": "uk-UA", "countries": ["Ukraine"] },
    { "name": "Nederlands (Nederland)", "englishName": "Dutch", "code": "nl-NL", "countries": ["Netherlands"] },
    { "name": "Nederlands (België)", "englishName": "Dutch", "code": "nl-BE", "countries": ["Belgium"] },
    { "name": "தமிழ்", "englishName": "Tamil", "code": "ta-IN", "countries": ["India"] },
    { "name": "Filipino", "englishName": "Filipino", "code": "fil-PH", "countries": ["Philippines"] },
    { "name": "ગુજરાતી", "englishName": "Gujarati", "code": "gu-IN", "countries": ["India"] },
    { "name": "ไทย", "englishName": "Thai", "code": "th-TH", "countries": ["Thailand"] },
    { "name": "עברית", "englishName": "Hebrew", "code": "he-IL", "countries": ["Israel"] },
    { "name": "Magyar", "englishName": "Hungarian", "code": "hu-HU", "countries": ["Hungary"] },
    { "name": "Svenska", "englishName": "Swedish", "code": "sv-SE", "countries": ["Sweden"] },
    { "name": "Čeština", "englishName": "Czech", "code": "cs-CZ", "countries": ["Czech Republic"] },
    { "name": "Bahasa Melayu", "englishName": "Malay", "code": "ms-MY", "countries": ["Malaysia"] },
    { "name": "Română", "englishName": "Romanian", "code": "ro-RO", "countries": ["Romania"] },
    { "name": "Afrikaans", "englishName": "Afrikaans", "code": "af-ZA", "countries": ["South Africa"] },
    { "name": "Suomi", "englishName": "Finnish", "code": "fi-FI", "countries": ["Finland"] },
    { "name": "Dansk", "englishName": "Danish", "code": "da-DK", "countries": ["Denmark"] },
    { "name": "Norsk", "englishName": "Norwegian", "code": "nb-NO", "countries": ["Norway"] },
    { "name": "Íslenska", "englishName": "Icelandic", "code": "is-IS", "countries": ["Iceland"] },
    { "name": "Euskara", "englishName": "Basque", "code": "eu-ES", "countries": ["Spain"] },
    { "name": "Galego", "englishName": "Galician", "code": "gl-ES", "countries": ["Spain"] },
    { "name": "Català", "englishName": "Catalan", "code": "ca-ES", "countries": ["Spain"] },
    { "name": "Latviešu", "englishName": "Latvian", "code": "lv-LV", "countries": ["Latvia"] },
    { "name": "Lietuvių", "englishName": "Lithuanian", "code": "lt-LT", "countries": ["Lithuania"] },
    { "name": "Ελληνικά", "englishName": "Greek", "code": "el-GR", "countries": ["Greece"] },
    { "name": "Српски", "englishName": "Serbian", "code": "sr-RS", "countries": ["Serbia"] },
    { "name": "Български", "englishName": "Bulgarian", "code": "bg-BG", "countries": ["Bulgaria"] },
    { "name": "Slovenčina", "englishName": "Slovak", "code": "sk-SK", "countries": ["Slovakia"] },
    { "name": "मराठी", "englishName": "Marathi", "code": "mr-IN", "countries": ["India"] },
    { "name": "ਪੰਜਾਬੀ", "englishName": "Punjabi", "code": "pa-IN", "countries": ["India"] },
    { "name": "తెలుగు", "englishName": "Telugu", "code": "te-IN", "countries": ["India"] },
    { "name": "മലയാളം", "englishName": "Malayalam", "code": "ml-IN", "countries": ["India"] },
];
