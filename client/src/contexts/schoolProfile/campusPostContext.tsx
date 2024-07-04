import React, { createContext, useContext, useState, ReactNode } from 'react';

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
}

export interface Media {
    type: 'image' | 'video';
    url: string;
}

export interface Post {
    postedBy: User;
    title: string;
    datePosted: Date;
    textBody?: string;
    media?: Media[];
    postType: 'normal' | 'anonymous';
    display: 'profile' | 'feed';
    isQuestion: boolean;
}

export interface Campus {
    photoUrl: string;
    orgName: string;
    isVerified: boolean;
    posts: Post[];
}

export interface CampusPostContextType {
    campus: Campus;
    isSearching: boolean;
    resultPosts: Post[];
    searchPosts: (keyword: string) => Post[];
}

const CampusPostContext = createContext<CampusPostContextType | undefined>(undefined);

const demoUser: User = {
    name: 'Jane Smith',
    userName: 'janesmith',
    link: '#',
    photoUrl: UserPhoto3,
    isVerified: true,   
};

const demoUser1: User = {
    name: 'Zoheb Hasan',
    userName: 'janesmith',
    link: '#',
    photoUrl: UserPhoto3,
    isVerified: true,   
};

const demoUser2: User = {
    name: 'Faysal Ahmed',
    userName: 'janesmith',
    link: '#',
    photoUrl: UserPhoto3,
    isVerified: true,   
};

const demoPost1: Post = {
    postedBy: demoUser,
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
};

const demoPost2: Post = {
    postedBy: demoUser1,
    title: "What does ``const[state,setState]`` mean in react?",
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
    postedBy: demoUser2,
    title: "What does ``const[state,setState]`` mean in react?",
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

const demoCampus: Campus = {
    orgName: 'Stony Brook University',
    photoUrl: DummyOrg,
    posts: [demoPost1, demoPost2, demoPost3],
    isVerified: true
};

export const CampusPostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [campus, setCampus] = useState<Campus>(demoCampus);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [resultPosts, setResultPosts] = useState<Post[]>([]);

    const searchPosts = (keyword: string): Post[] => {
        const lowercasedKeyword = keyword.toLowerCase();
        const results = campus.posts.filter(post => {
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
        <CampusPostContext.Provider value={{
            campus,
            isSearching,
            resultPosts,
            searchPosts
        }}>
            {children}
        </CampusPostContext.Provider>
    );
};

export const useCampusPost = (): CampusPostContextType => {
    const context = useContext(CampusPostContext);
    if (context === undefined) {
        throw new Error('useCampusPost must be used within an CampusPostProvider');
    }
    return context;
};
