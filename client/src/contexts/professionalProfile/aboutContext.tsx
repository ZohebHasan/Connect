import React, { createContext, useContext, useState, ReactNode } from 'react';
import dummyPhoto1 from '../../components/main/dummies/dummyPhotoPortrait1.png';
import dummyPhoto2 from '../../components/main/dummies/dummyPhotoPortrait2.png';
import dummyPhoto3 from '../../components/main/dummies/dummyPhotoPortrait3.png';
import dummyPhoto4 from '../../components/main/dummies/dummyPhotoPortrait4.png';
import dummyVideo from '../../components/main/dummies/dummyVideoPortrait.mp4';

import ConnectLogo from '../../components/main/dummies/Connect.jpg';
import GoogleLogo from '../../components/main/dummies/Connect.jpg';
import UniversityLogo from '../../components/main/dummies/Connect.jpg';
import PhdUniversityLogo from '../../components/main/dummies/Connect.jpg';

import DummyCert from "../../components/main/dummies/dummyCertificate.webp"

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

interface Association {
    logo: string;
    name: string;
    link: string;
    isVerified: boolean;
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
    isDataBarOpen: boolean;
    activeType: string | null;
    toggleDataBar: () => void;
    setActiveType: (type: string | null) => void;
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
                    description: 'Designed and created an end-to-end encrypted platform using `React`, `Node.js`, and `TypeScript`. This innovative platform ensures complete privacy and security for users by encrypting all communications and data stored. This approach helps protect user information from unauthorized access.',
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
                    description: 'Implemented backend services and APIs to support the Connect platform using `Node.js` and `Express`. Focused on enhancing system reliability and scalability. The role involved working closely with the frontend team to integrate services seamlessly.',
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
                    description: 'Developed and maintained features for the Google Chrome browser using `JavaScript`, `HTML`, and `CSS`. Worked on performance optimization and new user features. Improved the user interface and user experience, contributing to the overall growth of the browser.',
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
                    description: 'Assisted in the development of cloud solutions using `Python` and `Google Cloud APIs`. Gained hands-on experience in cloud infrastructure and services. This role provided a strong foundation in cloud computing and service deployment.',
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
                    description: 'Completed coursework and projects in computer science, focusing on software development, data structures, and algorithms. Developed several applications using `Java` and `Python`. Actively participated in coding competitions and hackathons.',
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
                    description: 'Pursuing a master\'s degree with a focus on AI and machine learning. Engaged in research projects involving `TensorFlow` and `PyTorch` for deep learning applications. Actively contributing to the academic community through publications and presentations.',
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
                    description: 'Conducting research in AI, focusing on deep learning and neural networks. Published papers on advancements in `NLP` and `Computer Vision` using `TensorFlow`. Engaged in collaborative projects with leading researchers in the field.',
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
                    description: 'Led initiatives to enhance student engagement and community involvement. Organized events and activities, ensuring inclusivity and participation using `Slack` and `Zoom` for coordination. Developed leadership skills and fostered a sense of community.',
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
                    description: 'Led the Computer Science Club, organizing events and projects. Promoted peer learning and collaboration on software projects using `GitHub` and `VSCode`. Mentored junior members and facilitated technical workshops.',
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
                    description: 'Completed a series of courses on deep learning, covering topics like neural networks, `CNNs`, `RNNs`, and transfer learning using `TensorFlow`. This specialization provided a comprehensive understanding of deep learning techniques.',
                    media: [
                        { type: 'image', url: DummyCert }
                    ],
                },
                {
                    title: 'AI for Everyone',
                    location: 'Online',
                    duration: 'Jun 2021',
                    description: 'An introduction to artificial intelligence, its applications, and societal impacts. Gained foundational knowledge in `machine learning` and `data science`. This course provided a broad overview of AI concepts and their real-world applications.',
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
                    description: 'Received the award for outstanding entrepreneurial achievements, particularly in developing a successful software platform. Recognized for innovation and leadership in the tech industry. This award highlights significant contributions to the entrepreneurial community.',
                    media: [
                        { type: 'image', url: dummyPhoto1 },
                        { type: 'image', url: dummyPhoto2 },
                    ],
                },
                {
                    title: 'Dean\'s List',
                    location: 'New York, New York, United States',
                    duration: 'May 2021',
                    description: 'Recognized for academic excellence with a GPA above 3.8. Consistently demonstrated high performance across all coursework, especially in `data structures` and `algorithms`. This achievement reflects dedication and hard work throughout the academic journey.',
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
            description: 'Designed and created an end-to-end encrypted platform using `React`, `Node.js`, and `TypeScript`. The platform ensures secure communication and data storage for users. This project involved extensive use of encryption techniques to enhance user privacy.',
            media: [
                { type: 'image', url: dummyPhoto1 },
                { type: 'image', url: dummyPhoto2 },
            ],
            association: {
                logo: ConnectLogo,
                name: 'Connect',
                link: '#',
                isVerified: true
            },
            projectLink: '#',
            collaborators: [
                { id: 1, src: dummyPhoto1 },
                { id: 2, src: dummyPhoto2 },
            ],
            skills: ['React', 'Node.js', 'TypeScript'],
        },
        {
            title: 'B-Tree',
            role: 'Developer',
            duration: 'Jan 2024 - Present (5 mos)',
            description: 'Designed and created an end-to-end encrypted platform using `React`, `Node.js`, and `TypeScript`. The platform ensures secure communication and data storage for users. This project involved extensive use of encryption techniques to enhance user privacy.',
            media: [
                { type: 'image', url: dummyPhoto1 },
                { type: 'image', url: dummyPhoto2 },
            ],
            association: {
                logo: ConnectLogo,
                name: 'Connect',
                link: '#',
                isVerified: true
            },
            projectLink: '#',
            collaborators: [
                { id: 1, src: dummyPhoto1 },
                { id: 2, src: dummyPhoto2 },
            ],
            skills: ['React', 'Node.js', 'TypeScript'],
        }
    ];

    const researchData: ResearchAndPubInfo[] = [
        {
            title: 'AI Research',
            role: 'Research Assistant',
            location: 'Cambridge, Massachusetts, United States',
            duration: 'Jan 2024 - Present (5 mos)',
            description: 'Conducting research in AI, focusing on deep learning and neural networks. Published papers on advancements in `NLP` and `Computer Vision` using `TensorFlow` and `PyTorch`. This research aims to push the boundaries of what is possible in AI technology.',
            media: [
                { type: 'image', url: dummyPhoto1 },
                { type: 'image', url: dummyPhoto2 },
            ],
            association: {
                logo: PhdUniversityLogo,
                name: 'MIT',
                link: '#',
                isVerified: true
            },
            researchLink: 'https://researchlink.com',
            collaborators: [
                { id: 1, src: dummyPhoto3 },
                { id: 2, src: dummyPhoto4 },
                { id: 3, src: dummyPhoto4 },
                { id: 4, src: dummyPhoto4 },
                { id: 5, src: dummyPhoto4 },
            ],
            skills: ['Python', 'Deep Learning', 'TensorFlow'],
        },
        {
            title: 'AI Research',
            role: 'Research Assistant',
            location: 'Cambridge, Massachusetts, United States',
            duration: 'Jan 2024 - Present (5 mos)',
            description: 'Conducting research in AI, focusing on deep learning and neural networks. Published papers on advancements in `NLP` and `Computer Vision` using `TensorFlow` and `PyTorch`. This research aims to push the boundaries of what is possible in AI technology.',
            media: [
                { type: 'image', url: dummyPhoto1 },
                { type: 'image', url: dummyPhoto2 },
            ],
            association: {
                logo: PhdUniversityLogo,
                name: 'MIT',
                link: '#',
                isVerified: true
            },
            researchLink: 'https://researchlink.com',
            collaborators: [
                { id: 1, src: dummyPhoto3 },
                { id: 2, src: dummyPhoto4 },
                { id: 3, src: dummyPhoto4 },
                { id: 4, src: dummyPhoto4 },
                { id: 5, src: dummyPhoto4 },
            ],
            skills: ['Python', 'Deep Learning', 'TensorFlow'],
        },
    ];

    const skillData: SkillInfo[] = [
        {
            title: 'Java',
            duration: '3 years',
            description: 'Proficient in Java programming, including `OOP`, data structures, and algorithm development. Applied skills in various projects and coding competitions. This proficiency has been endorsed by several colleagues and mentors.',
            proficiency: 'Expert',
            endorsedBy: [
                { id: 1, src: dummyPhoto3 },
                { id: 2, src: dummyPhoto4 },
            ],
        },
        {
            title: 'Java',
            duration: '3 years',
            description: 'Proficient in Java programming, including `OOP`, data structures, and algorithm development. Applied skills in various projects and coding competitions. This proficiency has been endorsed by several colleagues and mentors.',
            proficiency: 'Expert',
            endorsedBy: [
                { id: 1, src: dummyPhoto3 },
                { id: 2, src: dummyPhoto4 },
            ],
        },
        {
            title: 'Java',
            duration: '3 years',
            description: 'Proficient in Java programming, including `OOP`, data structures, and algorithm development. Applied skills in various projects and coding competitions. This proficiency has been endorsed by several colleagues and mentors.',
            proficiency: 'Expert',
            endorsedBy: [
                { id: 1, src: dummyPhoto3 },
                { id: 2, src: dummyPhoto4 },
            ],
        }
    ];

    const recommendationsData: RecommendationInfo[] = [
        {
            title: 'Recommendation for John Doe',
            location: 'New York, New York, United States',
            duration: 'Jan 2024',
            description: 'John Doe is an exceptional software engineer. He consistently demonstrates strong technical skills, particularly in `JavaScript` and `React`, delivering high-quality code. His ability to collaborate effectively with team members and lead projects to successful completion is commendable.',
            media: [
                { type: 'image', url: dummyPhoto1 },
                { type: 'image', url: dummyPhoto2 },
            ],
            recommenderName: 'Jane Smith',
            recommenderPosition: 'Senior Engineer',
            recommenderCompany: 'Tech Corp',
            text: 'John has consistently demonstrated exceptional skills in software development, excelling in `frontend` and `backend` projects. His work ethic is unmatched and he always strives for excellence.',
        },
    ];

    const [isDataBarOpen, setIsDataBarOpen] = useState(false);
    const [activeType, setActiveType] = useState<string | null>(null);

    const toggleDataBar = () => {
        setIsDataBarOpen((prev) => !prev);
    };

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
            recommendations: recommendationsData,
            isDataBarOpen,
            activeType,
            toggleDataBar,
            setActiveType
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
