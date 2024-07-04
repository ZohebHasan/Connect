import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

import UserPhoto1 from "../../components/main/dummies/personal.jpeg";
import UserPhoto2 from '../../components/main/dummies/Adnan.jpeg';
import UserPhoto3 from "../../components/main/dummies/Priyanka.jpeg";

import dummyPhoto1 from '../../components/main/dummies/dummyPhotoPortrait1.png';
import dummyPhoto2 from '../../components/main/dummies/dummyPhotoPortrait2.png';
import dummyPhoto3 from '../../components/main/dummies/dummyPhotoPortrait3.png';
import dummyPhoto4 from '../../components/main/dummies/dummyPhotoPortrait4.png';
import dummyVideo from '../../components/main/dummies/dummyVideoPortrait.mp4';

export interface User {
    name?: string;
    userName?: string;
    link: string;
    photoUrl: string;
    isVerified?: boolean;
    type: 'instructor' | 'student' | 'ta';
}

export interface Instructor extends User {
    type: 'instructor';
}

export interface Student extends User {
    type: 'student';
}

export interface TA extends User {
    type: 'ta';
}

export interface Media {
    type: 'image' | 'video';
    url: string;
}

export interface Post {
    postedBy: Instructor | Student | TA;
    datePosted: Date;
    title: string;
    textBody?: string;
    media?: Media[];
    postType: 'normal' | 'anonymous';
    display: 'profile' | 'feed';
    tag: string;
    isQuestion: boolean;
    markedBy: (Instructor | TA)[];
    postId: string;
}

export interface Course {
    courseName: string;
    courseCode: string;
    instructor: Instructor;
    TAs: TA[];
    posts: Post[];
}

export interface CoursesContextType {
    courses: Course[];
    activeCourse: Course | null;
    setActiveCourse: (courseCode: string) => void;
    toggleCourseBar: () => void;
    isCourseBarOpen: boolean;
    addProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    removeProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    isSearching: boolean;
    resultPosts: Post[];
    searchPosts: (keyword: string) => Post[];
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

const demoInstructor: Instructor = {
    name: 'Christopher Kane',
    userName: 'chrisKane',
    link: '#',
    photoUrl: UserPhoto2,
    isVerified: true,
    type: 'instructor'
};
const demoInstructor1: Instructor = {
    name: 'Kevin Mcdonell',
    userName: 'kMcdonell',
    link: '#',
    photoUrl: UserPhoto2,
    isVerified: true,
    type: 'instructor'
};

const demoInstructor2: Instructor = {
    name: 'Pravin Tripathi',
    userName: 'pTripathi',
    link: '#',
    photoUrl: UserPhoto2,
    isVerified: true,
    type: 'instructor'
};

const demoStudent: Student = {
    name: 'Jane Smith',
    userName: 'janesmith',
    link: '#',
    photoUrl: UserPhoto3,
    isVerified: true,
    type: 'student'
};

const demoTAs: TA[] = [
    {
        name: 'John Doe',
        userName: 'johndoe',
        link: '#',
        photoUrl: UserPhoto1,
        type: 'ta'
    },
    {
        name: 'Alice Johnson',
        userName: 'alicejohnson',
        link: '#',
        photoUrl: UserPhoto2,
        type: 'ta'
    },
    {
        name: 'Zoheb Hasan',
        userName: 'zohebhasan',
        link: '#',
        photoUrl: UserPhoto2,
        type: 'ta'
    },
    {
        name: 'Kamrul Hasan',
        userName: 'kamhasan',
        link: '#',
        photoUrl: UserPhoto2,
        type: 'ta'
    },
];

const demoPost1: Post = {
    postId: '@1',
    postedBy: demoStudent,
    tag: 'Homework 1',
    datePosted: new Date('2023-02-01'),
    title: "What does ``const[state,setState]`` mean in react?",
    textBody: `
    How can I use \`\`state\`\` and \`\`setState\`\` in a React component? 
    Here is the code I'm working with:
    \`\`\`
    import React, { useState } from 'react';

    const ExampleComponent = () => {
      const [count, setCount] = useState(0);

      const increment = () => setCount(count + 1);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      );
    };

    export default ExampleComponent;
    \`\`\`
    Can I use different names for \`\`state\`\` variables and their setters?
  `,
    postType: 'normal',
    display: 'profile',
    isQuestion: true,
    markedBy: [demoInstructor, demoInstructor1, demoTAs[0]],
};

const demoPost2: Post = {
    postedBy: demoStudent,
    postId: '@2',
    tag: 'Final',
    datePosted: new Date('2023-02-01'),
    title: "What does ``public static void main(String[]args)`` mean in java?",
    textBody: `
    How can I use \`\`state\`\` and \`\`setState\`\` in a React component? 
    Here is the code I'm working with:
    \`\`\`
    import React, { useState } from 'react';

    const ExampleComponent = () => {
      const [count, setCount] = useState(0);

      const increment = () => setCount(count + 1);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      );
    };

    export default ExampleComponent;
    \`\`\`
    Can I use different names for \`\`state\`\` variables and their setters?
  `,
    postType: 'anonymous',
    display: 'profile',
    isQuestion: false,
    media: [
        {
            type: 'image',
            url: dummyPhoto1,
        },
        {
            type: 'image',
            url: dummyPhoto2,
        },
        {
            type: 'image',
            url: dummyPhoto3,
        },
        {
            type: 'image',
            url: dummyPhoto4,
        },
        {
            type: 'video',
            url: dummyVideo,
        },
    ],
    markedBy: [demoInstructor],
};

const demoPost3: Post = {
    postId: '@3',
    postedBy: demoStudent,
    tag: 'Final',
    datePosted: new Date('2023-02-01'),
    title: "What does ``const[state,setState]`` mean in react?",
    textBody: `
    How can I use \`\`state\`\` and \`\`setState\`\` in a React component? 
    Here is the code I'm working with:
    \`\`\`
    import React, { useState } from 'react';

    const ExampleComponent = () => {
      const [count, setCount] = useState(0);

      const increment = () => setCount(count + 1);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      );
    };

    export default ExampleComponent;
    \`\`\`
    Can I use different names for \`\`state\`\` variables and their setters?
  `,
    postType: 'anonymous',
    display: 'profile',
    isQuestion: false,
    media: [
        {
            type: 'image',
            url: dummyPhoto1,
        },
        {
            type: 'image',
            url: dummyPhoto2,
        },
        {
            type: 'image',
            url: dummyPhoto3,
        },
        {
            type: 'image',
            url: dummyPhoto4,
        },
        {
            type: 'video',
            url: dummyVideo,
        },
    ],
    markedBy: [demoInstructor],
};

const demoCourse1: Course = {
    courseCode: 'CSE 316',
    courseName: 'Fundamentals of Software Development',
    instructor: demoInstructor,
    TAs: demoTAs,
    posts: [demoPost1, demoPost2, demoPost3]
};

const demoCourse2: Course = {
    courseCode: 'CSE 320',
    courseName: 'Programming Languages',
    instructor: demoInstructor,
    TAs: demoTAs,
    posts: [demoPost1],
};

const demoCourses: Course[] = [demoCourse1, demoCourse2];

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [courses, setCourses] = useState<Course[]>(demoCourses);
    const [activeCourse, setActiveCourseState] = useState<Course | null>(demoCourses[0]);
    const [isCourseBarOpen, setIsCourseBarOpen] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [resultPosts, setResultPosts] = useState<Post[]>([]);

    const protectedRefs = useRef<React.RefObject<HTMLElement>[]>([]);

    const addProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        if (!protectedRefs.current.includes(ref)) {
            protectedRefs.current.push(ref);
        }
    };


    const removeProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        protectedRefs.current = protectedRefs.current.filter(r => r !== ref);
    };

    const toggleCourseBar = () => {
        setIsCourseBarOpen(!isCourseBarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isCourseBarOpen) {
                const isClickOutsideProtectedRefs = !protectedRefs.current.some(ref => ref.current?.contains(event.target as Node));
                if (isClickOutsideProtectedRefs) {
                    toggleCourseBar();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCourseBarOpen]);

    const setActiveCourse = (courseCode: string) => {
        const selectedCourse = courses.find(course => course.courseCode === courseCode) || null;
        setActiveCourseState(selectedCourse);
    };

    const searchPosts = (keyword: string): Post[] => {
        if (!activeCourse) return [];
        const lowercasedKeyword = keyword.toLowerCase();
        const results = activeCourse.posts.filter(post => {
            const { postedBy, title, textBody, postId, postType } = post;
            const userName = postType === 'anonymous' ? '' : postedBy.userName?.toLowerCase() || '';
            const name = postType === 'anonymous' ? '' : postedBy.name?.toLowerCase() || '';
            const postTitle = title.toLowerCase();
            const postTextBody = textBody?.toLowerCase() || '';
            const postID = postId.toLowerCase();
    
            return userName.includes(lowercasedKeyword) ||
                name.includes(lowercasedKeyword) ||
                postTitle.includes(lowercasedKeyword) ||
                postTextBody.includes(lowercasedKeyword) ||
                postID.includes(lowercasedKeyword);
        });
        setResultPosts(results);
        setIsSearching(true);
        return results;
    };

    return (
        <CoursesContext.Provider value={{
            courses,
            activeCourse,
            setActiveCourse,
            toggleCourseBar,
            isCourseBarOpen,
            addProtectedRef,
            removeProtectedRef,
            isSearching,
            resultPosts,
            searchPosts
        }}>           
             {children}
        </CoursesContext.Provider>
    );
};

export const useCourses = (): CoursesContextType => {
    const context = useContext(CoursesContext);
    if (context === undefined) {
        throw new Error('useCourses must be used within a CoursesProvider');
    }
    return context;
};
