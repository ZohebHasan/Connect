import React, { createContext, useContext, useState, ReactNode } from 'react';

import dummyPhoto1 from '../../components/main/dummies/dummyPhotoPortrait1.png';
import dummyPhoto2 from '../../components/main/dummies/dummyPhotoPortrait2.png';
import dummyPhoto3 from '../../components/main/dummies/dummyPhotoPortrait3.png';
import dummyPhoto4 from '../../components/main/dummies/dummyPhotoPortrait4.png';
import dummyVideo from '../../components/main/dummies/dummyVideoPortrait.mp4';
import Adnan from '../../components/main/dummies/Adnan.jpeg';
import Zoheb from "../../components/main/dummies/personal.jpeg"
import Zoheb1 from "../../components/main/dummies/school.jpeg"
import Zoheb2 from "../../components/main/dummies/ProfPostessional.jpeg"
import Priyanka from "../../components/main/dummies/Priyanka.jpeg"


interface Media {
    type: 'image' | 'video';
    url: string;
}

interface Post {
    id: string;
    media?: Media[];
    comments: number;
    likes: number;
    views: number;
    textBody: string;
    postType: "pixel" | "chirp" | "clip";
}

interface ProfPostContextProps {
    profPosts: Post[];
}

interface ProfPostProviderProps {
    children: ReactNode;
}

const ProfPostContext = createContext<ProfPostContextProps | undefined>(undefined);

export const ProfPostProvider: React.FC<ProfPostProviderProps> = ({ children }) => {
    const [profPosts, setprofPosts] = useState<Post[]>([
        {
            id: '1',
            postType: 'chirp',
            textBody: `
            I am saddened to share that today. I have been laid off from Google. Please let me know if you have any opportunity for me.
            Here's a code snippet: \`\`const[state, setState]\`\`.
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
            This message is extended to reach a total of 300 characters. Let's make sure to provide the best support for those in need.
          `,
            comments: 10,
            likes: 100,
            views: 1000,
        },
        {
            id: '2',
            postType: 'pixel',
            textBody: "The ongoing conflict in Palestine has led to immense suffering. Israeli forces have been accused of ``torturing`` Palestinians, causing widespread pain and injustice. It's crucial for the international community to stand together and advocate for ``human rights`` and peace. #JusticeForPalestine",
            media: [{ type: 'image', url: Zoheb }],
            comments: 5,
            likes: 50,
            views: 500,
        },
        {
            id: '3',
            textBody: "The ongoing conflict in Palestine has led to immense suffering. Israeli forces have been accused of ``torturing`` Palestinians, causing widespread pain and injustice. It's crucial for the international community to stand together and advocate for ``human rights`` and peace. #JusticeForPalestine",
            postType: 'pixel',
            media: [{ type: 'image', url: Zoheb1 }],
            comments: 8,
            likes: 80,
            views: 800,
        },
    ]);







    return (
        <ProfPostContext.Provider
            value={{ profPosts }}
        >
            {children}
        </ProfPostContext.Provider>
    );
};

export const useProfPostContext = (): ProfPostContextProps => {
    const context = useContext(ProfPostContext);
    if (!context) {
        throw new Error('useProfPostContext must be used within a ProfPostProvider');
    }
    return context;
};
