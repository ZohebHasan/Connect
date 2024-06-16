import React, { createContext, useContext, useState, ReactNode } from 'react';

import dummyPhoto1 from '../../components/main/dummies/dummyPhotoPortrait1.png';
import dummyPhoto2 from '../../components/main/dummies/dummyPhotoPortrait2.png';
import dummyPhoto3 from '../../components/main/dummies/dummyPhotoPortrait3.png';
import dummyPhoto4 from '../../components/main/dummies/dummyPhotoPortrait4.png';
import dummyVideo from '../../components/main/dummies/dummyVideoPortrait.mp4';
import Adnan from '../../components/main/dummies/Adnan.jpeg';
import Zoheb from "../../components/main/dummies/personal.jpeg"
import Zoheb1 from "../../components/main/dummies/school.jpeg"
import Zoheb2 from "../../components/main/dummies/professional.jpeg"
import Priyanka from  "../../components/main/dummies/Priyanka.jpeg"


interface Media {
    type: 'image' | 'video';
    url: string;
}

interface Post {
    id: string;
    media: Media[];
    comments: number;
    likes: number;
    views: number;
}

interface PixelContextProps {
    posts: Post[];
    addPost: (post: Post) => void;
    updatePost: (id: string, updatedPost: Partial<Post>) => void;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    isPixelBarOpen: boolean;
    togglePixelBar: () => void;
}

interface PixelProviderProps {
    children: ReactNode;
}

const PixelContext = createContext<PixelContextProps | undefined>(undefined);

export const PixelProvider: React.FC<PixelProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            media: [
                { type: 'image', url: dummyPhoto1 },
                { type: 'image', url: dummyPhoto2 },
                { type: 'image', url: dummyPhoto3 },
                { type: 'image', url: dummyPhoto4 },
                { type: 'video', url: dummyVideo },
            ],
            comments: 10,
            likes: 100,
            views: 1000,
        },
        {
            id: '2',
            media: [{ type: 'image', url: Zoheb }],
            comments: 5,
            likes: 50,
            views: 500,
        },
        {
            id: '3',
            media: [{ type: 'image', url: Zoheb1 }],
            comments: 8,
            likes: 80,
            views: 800,
        },
        {
            id: '4',
            media: [{ type: 'image', url: Zoheb2}],
            comments: 3,
            likes: 30,
            views: 300,
        },
        {
            id: '5',
            media: [{ type: 'image', url: Priyanka }],
            comments: 7,
            likes: 70,
            views: 700,
        },
        {
            id: '6',
            media: [{ type: 'image', url: Adnan }],
            comments: 6,
            likes: 60,
            views: 600,
        },
    ]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPixelBarOpen, setIsPixelBarOpen] = useState(false);

    const addPost = (post: Post) => {
        setPosts((prevPosts) => [...prevPosts, post]);
    };

    const updatePost = (id: string, updatedPost: Partial<Post>) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
        );
    };

    const togglePixelBar = () => {
        setIsPixelBarOpen((prev) => !prev);
    };

    return (
        <PixelContext.Provider
            value={{ posts, addPost, updatePost, activeIndex, setActiveIndex, isPixelBarOpen, togglePixelBar }}
        >
            {children}
        </PixelContext.Provider>
    );
};

export const usePixelContext = (): PixelContextProps => {
    const context = useContext(PixelContext);
    if (!context) {
        throw new Error('usePixelContext must be used within a PixelProvider');
    }
    return context;
};
