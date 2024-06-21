import React, { createContext, useContext, ReactNode } from 'react';
import dummyPhoto1 from '../../components/main/dummies/dummyPhotoPortrait1.png';
import dummyPhoto2 from '../../components/main/dummies/dummyPhotoPortrait2.png';
import dummyPhoto3 from '../../components/main/dummies/dummyPhotoPortrait3.png';
import dummyPhoto4 from '../../components/main/dummies/dummyPhotoPortrait4.png';
import dummyVideo from '../../components/main/dummies/dummyVideoPortrait.mp4';

import ConnectLogo from '../../components/main/dummies/Connect.jpg';
import GoogleLogo from '../../components/main/dummies/Connect.jpg';
import UniversityLogo from '../../components/main/dummies/Connect.jpg';
import PhdUniversityLogo from '../../components/main/dummies/Connect.jpg';

interface Media {
    type: 'image' | 'video';
    url: string;
}

interface CommonInfo {
    title: string;
    timeType?: string;
    location?: string;
    duration: string;
    description: string;
    media?: Media[];
    department?: string;
}

// interface EducationInfo extends CommonInfo {
//     // department?: string;
// }

// interface ExperienceInfo extends CommonInfo {
//     // department?: string;
// }

interface ProjectInfo extends CommonInfo {
    role?: string;
    association?: Association;
    projectLink?: string;
    collaborators?: { id: number; src: string }[];
    skills?: string[];
}

interface ResearchAndPubInfo extends CommonInfo {
    role?: string;
    association?: Association;
    researchLink?: string;
    collaborators?: { id: number; src: string }[];
    skills?: string[];
}

interface LeadershipInfo extends CommonInfo {
    department?: string;
}

interface SkillInfo extends CommonInfo {
    proficiency?: string;
    endorsedBy?: { id: number; src: string }[];

}

interface RecommendationInfo extends CommonInfo {  
    recommenderName?: string;
    recommenderPosition?: string;
    recommenderCompany?: string;
    text?: string;
}

// interface CertificationInfo extends CommonInfo { }

// interface AwardInfo extends CommonInfo { }

interface Association {
    logo: string;
    name: string;
    link: string;
}

interface Organization {
    organizationName: string;
    organizationLogo: string;
    isVerified: boolean;
    infoList: CommonInfo[];
}

interface AboutInfoContextData {
    experiences: Organization[];
    education: Organization[];
    leadership: Organization[];
    certifications: Organization[];
    awards: Organization[];
    projects: ProjectInfo[];
    researchAndPublications: ResearchAndPubInfo[];
    skills: SkillInfo[];
    recommendations: RecommendationInfo[];
}

interface AboutInfoProviderProps {
    children: ReactNode;
}

const AboutInfoContext = createContext<AboutInfoContextData | undefined>(undefined);

export const AboutInfoProvider: React.FC<AboutInfoProviderProps> = ({ children }) => {
    const experienceData: Organization[] = [
        {
            organizationName: 'Connect',
            organizationLogo: ConnectLogo,
            isVerified: true,
            infoList: [
                {
                    title: 'Software Engineer',
                    timeType: 'Full-time',
                    department: 'Connect Security Section',
                    location: 'New York, New York, United States',
                    duration: 'Jan 2024 - Present (5 mos)',
                    description: 'Designed and created an end-to-end encrypted platform.',
                    media: [
                        { type: 'image', url: dummyPhoto1 },
                        { type: 'image', url: dummyPhoto2 },
                        { type: 'image', url: dummyPhoto3 },
                        { type: 'image', url: dummyPhoto4 },
                        { type: 'video', url: dummyVideo },
                    ],
                },
                {
                    title: 'Backend Developer',
                    timeType: 'Part-time',
                    department: 'Connect Infrastructure Team',
                    location: 'New York, New York, United States',
                    duration: 'Jul 2023 - Dec 2023 (6 mos)',
                    description: 'Implemented backend services and APIs to support the Connect platform.',
                    media: [
                        { type: 'image', url: dummyPhoto1 },
                        { type: 'image', url: dummyPhoto2 },
                    ],
                },
            ],
        },
        {
            organizationName: 'Google',
            organizationLogo: GoogleLogo,
            isVerified: true,
            infoList: [
                {
                    title: 'Frontend Developer',
                    timeType: 'Full-time',
                    department: 'Google Chrome Team',
                    location: 'Mountain View, California, United States',
                    duration: 'Mar 2022 - Jun 2023 (1 yr 4 mos)',
                    description: 'Developed and maintained features for the Google Chrome browser.',
                    media: [
                        { type: 'image', url: dummyPhoto3 },
                        { type: 'image', url: dummyPhoto4 },
                    ],
                },
                {
                    title: 'Software Intern',
                    timeType: 'Internship',
                    department: 'Google Cloud Platform',
                    location: 'Mountain View, California, United States',
                    duration: 'Jun 2021 - Aug 2021 (3 mos)',
                    description: 'Assisted in the development of cloud solutions.',
                    media: [
                        { type: 'image', url: dummyPhoto1 },
                        { type: 'image', url: dummyPhoto4 },
                    ],
                },
            ],
        },
    ];

    const educationData: Organization[] = [
        {
            organizationName: 'Stony Brook University',
            organizationLogo: UniversityLogo,
            isVerified: true,
            infoList: [
                {
                    title: 'Bachelor of Science',
                    timeType: 'Full-time',
                    department: 'Computer Science',
                    location: 'Stony Brook, New York, United States',
                    duration: 'Sep 2018 - May 2022 (4 yrs)',
                    description: 'Completed coursework and projects in computer science.',
                    media: [
                        { type: 'image', url: dummyPhoto1 },
                        { type: 'image', url: dummyPhoto2 },
                    ],
                },
                {
                    title: 'Master of Science',
                    timeType: 'Part-time',
                    department: 'Computer Science',
                    location: 'Stony Brook, New York, United States',
                    duration: 'Sep 2022 - Present (1 yr 9 mos)',
                    description: 'Pursuing a master\'s degree with a focus on AI.',
                    media: [
                        { type: 'image', url: dummyPhoto3 },
                        { type: 'image', url: dummyPhoto4 },
                    ],
                },
            ],
        },
        {
            organizationName: 'MIT',
            organizationLogo: PhdUniversityLogo,
            isVerified: true,
            infoList: [
                {
                    title: 'Ph.D. in Computer Science',
                    timeType: 'Full-time',
                    department: 'Artificial Intelligence',
                    location: 'Cambridge, Massachusetts, United States',
                    duration: 'Sep 2022 - Present (1 yr 9 mos)',
                    description: 'Conducting research in AI, focusing on deep learning.',
                    media: [
                        { type: 'image', url: dummyPhoto1 },
                        { type: 'image', url: dummyPhoto4 },
                    ],
                },
            ],
        },
    ];

    const leadershipData: Organization[] = [
        {
            organizationName: 'Stony Brook University',
            organizationLogo: UniversityLogo,
            isVerified: true,
            infoList: [
                {
                    title: 'Vice President',
                    department: 'Benedict Hall Council',
                    location: 'New York, New York, United States',
                    duration: 'Jan 2024 - Present (5 mos)',
                    description: 'Designed and created an end-to-end encrypted platform.',
                    media: [
                        { type: 'image', url: dummyPhoto1 },
                        { type: 'image', url: dummyPhoto2 },
                    ],
                },
                {
                    title: 'President',
                    department: 'Computer Science Club',
                    location: 'New York, New York, United States',
                    duration: 'Sep 2020 - Dec 2023 (3 yrs 4 mos)',
                    description: 'Led the Computer Science Club, organizing events and projects.',
                    media: [
                        { type: 'image', url: dummyPhoto3 },
                        { type: 'image', url: dummyPhoto4 },
                    ],
                },
            ],
        },
    ];

    const certificationData: Organization[] = [
        {
            organizationName: 'Coursera',
            organizationLogo: ConnectLogo,
            isVerified: true,
            infoList: [
                {
                    title: 'Deep Learning Specialization',
                    location: 'Online',
                    duration: 'Aug 2022',
                    description: 'Completed a series of courses on deep learning.',
                    media: [
                        { type: 'image', url: dummyPhoto1 },
                        { type: 'image', url: dummyPhoto2 },
                    ],
                },
                {
                    title: 'AI for Everyone',
                    location: 'Online',
                    duration: 'Jun 2021',
                    description: 'An introduction to artificial intelligence.',
                    media: [
                        { type: 'image', url: dummyPhoto3 },
                        { type: 'image', url: dummyPhoto4 },
                    ],
                },
            ],
        },
    ];

    const awardData: Organization[] = [
        {
            organizationName: 'Stony Brook University',
            organizationLogo: UniversityLogo,
            isVerified: true,
            infoList: [
                {
                    title: 'Larry Roher Entrepreneurial Achievement Award',
                    location: 'New York, New York, United States',
                    duration: 'Aug 2022',
                    description: 'Received the award for outstanding entrepreneurial achievements.',
                    media: [
                        { type: 'image', url: dummyPhoto1 },
                        { type: 'image', url: dummyPhoto2 },
                    ],
                },
                {
                    title: 'Dean\'s List',
                    location: 'New York, New York, United States',
                    duration: 'May 2021',
                    description: 'Recognized for academic excellence.',
                    media: [
                        { type: 'image', url: dummyPhoto3 },
                        { type: 'image', url: dummyPhoto4 },
                    ],
                },
            ],
        },
    ];

    const projectData: ProjectInfo[] = [
        {
            title: 'B-Tree',
            role: 'Developer',

            duration: 'Jan 2024 - Present (5 mos)',
            description: 'Designed and created an end-to-end encrypted platform.',
            media: [
                { type: 'image', url: dummyPhoto1 },
                { type: 'image', url: dummyPhoto2 },
            ],
            association: {
                logo: ConnectLogo,
                name: 'Connect',
                link: '#',
            },
            projectLink: '#',
            collaborators: [
                { id: 1, src: dummyPhoto1 },
                { id: 2, src: dummyPhoto2 },
            ],
        },
    ];

    const researchData: ResearchAndPubInfo[] = [
        {
            title: 'AI Research',
            role: 'Research Assistant',
            location: 'Cambridge, Massachusetts, United States',
            duration: 'Jan 2024 - Present (5 mos)',
            description: 'Conducting research in AI, focusing on deep learning.',
            media: [
                { type: 'image', url: dummyPhoto1 },
                { type: 'image', url: dummyPhoto2 },
            ],

            association: {
                logo: PhdUniversityLogo,
                name: 'MIT',
                link: '#',
            },
            researchLink: 'https://researchlink.com',
            collaborators: [
                { id: 1, src: dummyPhoto3 },
                { id: 2, src: dummyPhoto4 },
            ],

        },
    ];

    const skillData: SkillInfo[] = [
        {
            title: 'Java',
            duration: '3 years',
            description: 'Proficient in Java programming.',
            proficiency: 'Expert',
            endorsedBy: [
                { id: 1, src: dummyPhoto3 },
                { id: 2, src: dummyPhoto4 },
            ],
        },

    ];

    const recommendationsData: RecommendationInfo[] = [
        {
            title: 'Recommendation for John Doe',
            location: 'New York, New York, United States',
            duration: 'Jan 2024',
            description: 'John Doe is an exceptional software engineer.',
            media: [
                { type: 'image', url: dummyPhoto1 },
                { type: 'image', url: dummyPhoto2 },
            ],
            recommenderName: 'Jane Smith',
            recommenderPosition: 'Senior Engineer',
            recommenderCompany: 'Tech Corp',
            text: 'John has consistently demonstrated exceptional skills in software development.',

        },
    ];

    return (
        <AboutInfoContext.Provider value={{
            experiences: experienceData,
            education: educationData,
            leadership: leadershipData,
            certifications: certificationData,
            awards: awardData,
            projects: projectData,
            researchAndPublications: researchData,
            skills: skillData,
            recommendations: recommendationsData
        }}>
            {children}
        </AboutInfoContext.Provider>
    );
};

export const useAboutInfoContext = (): AboutInfoContextData => {
    const context = useContext(AboutInfoContext);
    if (!context) {
        throw new Error('useAboutInfoContext must be used within a AboutInfoProvider');
    }
    return context;
};
