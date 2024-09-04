import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

import UserPhoto1 from "../../components/main/dummies/personal.jpeg";
import UserPhoto2 from '../../components/main/dummies/Adnan.jpeg';
import UserPhoto3 from "../../components/main/dummies/Priyanka.jpeg";

import dummyPhoto1 from '../../components/main/dummies/dummyPhotoPortrait1.png';
import dummyPhoto2 from '../../components/main/dummies/dummyPhotoPortrait2.png';
import dummyPhoto3 from '../../components/main/dummies/dummyPhotoPortrait3.png';
import dummyPhoto4 from '../../components/main/dummies/dummyPhotoPortrait4.png';
import dummyVideo from '../../components/main/dummies/dummyVideoPortrait.mp4';

import DummyOrg from '../../components/main/dummies/Connect.jpg';

export interface User {
    name?: string;
    userName?: string;
    link: string;
    photoUrl: string;
    isVerified?: boolean;
    userType: 'eBoard' | 'member' | 'advisor';
}

export interface Eboard extends User {
    userType: 'eBoard';
    title: string;
}

export interface Member extends User {
    userType: 'member';
}

export interface Advisor extends User {
    userType: 'advisor';
}

export interface Media {
    type: 'image' | 'video';
    url: string;
}

export interface Post {
    postedBy: Eboard | Member | Advisor;
    datePosted: Date;
    textBody?: string;
    media?: Media[];
    postType: 'normal' | 'anonymous';
    display: 'profile' | 'feed';
    isQuestion: boolean;
}

export interface Org {
    photoUrl: string;
    orgName: string;
    orgCode: string;
    advisor?: Advisor;
    eBoard: Eboard[];
    posts: Post[];
}

export interface OrgsContextType {
    orgs: Org[];
    activeOrg: Org | null;
    setActiveOrg: (orgCode: string) => void;
    toggleOrgBar: () => void;
    isOrgBarOpen: boolean;
    addProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    removeProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    isSearching: boolean;
    resultPosts: Post[];
    searchPosts: (keyword: string) => Post[];
}

const OrgsContext = createContext<OrgsContextType | undefined>(undefined);

const demoAdvisor: Advisor = {
    name: 'Christopher Kane',
    userName: 'chrisKane',
    link: '#',
    photoUrl: UserPhoto2,
    isVerified: true,
    userType: 'advisor'
};

const demoMember: Member = {
    name: 'Jane Smith',
    userName: 'janesmith',
    link: '#',
    photoUrl: UserPhoto3,
    isVerified: true,
    userType: 'member'
};

const demoEboard: Eboard[] = [
    {
        name: 'John Doe',
        userName: 'johndoe',
        link: '#',
        photoUrl: UserPhoto1,
        userType: 'eBoard',
        title: 'President'
    },
    {
        name: 'Alice Johnson',
        userName: 'alicejohnson',
        link: '#',
        photoUrl: UserPhoto2,
        userType: 'eBoard',
        title: 'Vice-President'
    },
    {
        name: 'Zoheb Hasan',
        userName: 'zohebhasan',
        link: '#',
        photoUrl: UserPhoto2,
        title: 'Secretary',
        userType: 'eBoard'
    },
    {
        name: 'Kamrul Hasan',
        userName: 'kamhasan',
        link: '#',
        photoUrl: UserPhoto2,
        userType: 'eBoard',
        title: 'Treasurer'
    },
];

const demoPost1: Post = {
    postedBy: demoEboard[0],
    datePosted: new Date('2023-02-01'),
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
};

const demoPost2: Post = {
    postedBy: demoEboard[2],
    datePosted: new Date('2023-02-01'),
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
};

const demoPost3: Post = {
    postedBy: demoMember,
    datePosted: new Date('2023-02-01'),
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
};

// const generateOrgCode = (orgName: string) => {
//     return orgName
//         .split(' ')
//         .map(word => word.charAt(0).toLowerCase())
//         .join('');
// };

const demoOrg1: Org = {
    orgName: 'Stony Brook Computing Society',
    photoUrl: DummyOrg,
    orgCode: 'sbcs',
    advisor: demoAdvisor,
    eBoard: demoEboard,
    posts: [demoPost1, demoPost2, demoPost3]
};

const demoOrg2: Org = {
    orgName: 'Bengalis Unite',
    photoUrl: DummyOrg,
    orgCode:'bu',
    advisor: demoAdvisor,
    eBoard: demoEboard,
    posts: [demoPost1],
};

const demoOrgs: Org[] = [demoOrg1, demoOrg2];

export const OrgsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orgs, setOrgs] = useState<Org[]>(demoOrgs);
    const [activeOrg, setActiveOrgState] = useState<Org | null>(demoOrgs[0]);
    const [isOrgBarOpen, setIsOrgBarOpen] = useState<boolean>(false);
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

    const toggleOrgBar = () => {
        setIsOrgBarOpen(!isOrgBarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOrgBarOpen) {
                const isClickOutsideProtectedRefs = !protectedRefs.current.some(ref => ref.current?.contains(event.target as Node));
                if (isClickOutsideProtectedRefs) {
                    toggleOrgBar();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOrgBarOpen]);

    const setActiveOrg = (orgCode: string) => {
        const selectedOrg = orgs.find(org => org.orgCode === orgCode) || null;
        setActiveOrgState(selectedOrg);
    };

    const searchPosts = (keyword: string): Post[] => {
        if (!activeOrg) return [];
        const lowercasedKeyword = keyword.toLowerCase();
        const results = activeOrg.posts.filter(post => {
            const { postedBy, textBody, postType } = post;
            const userName = postType === 'anonymous' ? '' : postedBy.userName?.toLowerCase() || '';
            const name = postType === 'anonymous' ? '' : postedBy.name?.toLowerCase() || '';
            const postTextBody = textBody?.toLowerCase() || '';

            return userName.includes(lowercasedKeyword) ||
                name.includes(lowercasedKeyword) ||
                postTextBody.includes(lowercasedKeyword);
        });
        setResultPosts(results);
        setIsSearching(true);
        return results;
    };

    return (
        <OrgsContext.Provider value={{
            orgs,
            activeOrg,
            setActiveOrg,
            toggleOrgBar,
            isOrgBarOpen,
            addProtectedRef,
            removeProtectedRef,
            isSearching,
            resultPosts,
            searchPosts
        }}>
            {children}
        </OrgsContext.Provider>
    );
};

export const useOrgs = (): OrgsContextType => {
    const context = useContext(OrgsContext);
    if (context === undefined) {
        throw new Error('useOrgs must be used within an OrgsProvider');
    }
    return context;
};
