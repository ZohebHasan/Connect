import React, { createContext, useContext, ReactNode } from 'react';
import dummyPhoto1 from '../../components/main/dummies/dummyPhotoPortrait1.png';
import dummyPhoto2 from '../../components/main/dummies/dummyPhotoPortrait2.png';
import dummyPhoto3 from '../../components/main/dummies/dummyPhotoPortrait3.png';
import dummyPhoto4 from '../../components/main/dummies/dummyPhotoPortrait4.png';
import dummyVideo from '../../components/main/dummies/dummyVideoPortrait.mp4';

import ConnectLogo from '../../components/main/dummies/Connect.jpg';
import GoogleLogo from '../../components/main/dummies/Google.jpg';
import UniversityLogo from '../../components/main/dummies/Connect.jpg';
import PhdUniversityLogo from '../../components/main/dummies/Connect.jpg';

interface Media {
    type: 'image' | 'video';
    url: string;
}

interface Recommender {
    recommenderName?: string;
    recommenderUserName: string;
    recommenderPosition?: string;
    recommenderCompany?: string;
    profileUrl: string;
    profilePhoto: string;
    isVerified: boolean;
}

interface RecommendationInfo  {  
    recommender: Recommender;
    text?: string;
    media?: Media[];
    recTime: string;
    recType?: 'strongly' | 'formally';
    description: string;
    relation: string;
    relationStatus: 'current' | 'former';
}

interface RecInfoContextData {
    recommendations: RecommendationInfo[];
}

interface RecInfoProviderProps {
    children: ReactNode;
}

const RecInfoContext = createContext<RecInfoContextData | undefined>(undefined);

export const RecInfoProvider: React.FC<RecInfoProviderProps> = ({ children }) => {
    const recommendationsData: RecommendationInfo[] = [
        {
            recommender: {
                recommenderName: 'Alice Johnson',
                recommenderUserName: 'alicejohnson',
                recommenderPosition: 'Senior Software Engineer',
                recommenderCompany: 'Google',
                profileUrl: '#',
                profilePhoto: dummyPhoto1,
                isVerified: true
            },
            text: 'Priyanka is a highly skilled and dedicated professional.',
            media: [
                {
                    type: 'image',
                    url: dummyPhoto2,
                },
                {
                    type: 'video',
                    url: dummyVideo,
                },
            ],
            recTime: 'April 2023',
            recType: 'strongly',
            description: 'A glowing recommendation from a colleague at Google.',
            relation: 'colleague',
            relationStatus: 'current',
        },
        {
            recommender: {
                recommenderName: 'Alice Johnson',
                recommenderUserName: 'alicejohnson',
                recommenderPosition: 'Senior Software Engineer',
                recommenderCompany: 'Google',
                profileUrl: '#',
                profilePhoto: dummyPhoto1,
                isVerified: true
            },
            text: 'Priyanka is a highly skilled and dedicated professional.',
            media: [
                {
                    type: 'image',
                    url: dummyPhoto2,
                },
                {
                    type: 'video',
                    url: dummyVideo,
                },
            ],
            recTime: 'April 2023',
            recType: 'strongly',
            description: 'A glowing recommendation from a colleague at Google.',
            relation: 'colleague',
            relationStatus: 'current',
        },
        {
            recommender: {
                recommenderName: 'Alice Johnson',
                recommenderUserName: 'alicejohnson',
                recommenderPosition: 'Senior Software Engineer',
                recommenderCompany: 'Google',
                profileUrl: '#',
                profilePhoto: dummyPhoto1,
                isVerified: true
            },
            text: 'Priyanka is a highly skilled and dedicated professional.',
            media: [
                {
                    type: 'image',
                    url: dummyPhoto2,
                },
                {
                    type: 'video',
                    url: dummyVideo,
                },
            ],
            recTime: 'April 2023',
            recType: 'strongly',
            description: 'A glowing recommendation from a colleague at Google.',
            relation: 'colleague',
            relationStatus: 'current',
        }
    ];

    return (
        <RecInfoContext.Provider value={{ 
            recommendations: recommendationsData
        }}>
            {children}
        </RecInfoContext.Provider>
    );
};

export const useRecInfoContext = (): RecInfoContextData => {
    const context = useContext(RecInfoContext);
    if (!context) {
        throw new Error('useRecInfoContext must be used within a RecInfoProvider');
    }
    return context;
};
