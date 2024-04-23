export interface PosterTexts {
    the: string;
    freedom: string;
    is: string;
    here: string;
    uncontrolled: string;
    period: string;
}

export interface PosterTranslations {
    [key: string]: PosterTexts;
}

export const posterTrans: PosterTranslations = {
    "en-US": {
        the: "The",
        freedom: "Freedom",
        is: "is",
        here: "Here",
        uncontrolled:"Uncontrolled",
        period: "."
    },
    "bn-BD": {
        the: "",
        freedom: "স্বাধীনতা",
        is: "হলো",
        here: "এখানে",
        uncontrolled : "নিয়ন্ত্রণহীন",
        period: "।"
    },
    "hi-IN": {
        the: "",
        freedom: "स्वतंत्रता",
        is: "है",
        here: "यहाँ",
        uncontrolled: "अनियंत्रित",
        period: "।"
    } 
};