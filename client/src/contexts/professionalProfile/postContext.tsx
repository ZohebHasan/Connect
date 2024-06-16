import React, { createContext, useContext, useState, ReactNode } from 'react';

import DummyClip from "../../components/main/dummies/dummyClip.mp4";
import DummyClip1 from "../../components/main/dummies/dummyClip1.mp4";

interface Media {
    type: 'video';
    url: string;
}

interface Post {
    id: string;
    media: Media[];
    comments: number;
    likes: number;
    views: number;
}

interface ClipContextProps {
    posts: Post[];
    addPost: (post: Post) => void;
    updatePost: (id: string, updatedPost: Partial<Post>) => void;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    isClipBarOpen: boolean;
    toggleClipBar: () => void;
}

interface ClipProviderProps {
    children: ReactNode;
}

const ClipContext = createContext<ClipContextProps | undefined>(undefined);

export const ClipProvider: React.FC<ClipProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            media: [{ type: 'video', url: DummyClip }],
            comments: 10,
            likes: 100,
            views: 1000,
        },
        {
            id: '2',
            media: [{ type: 'video', url: DummyClip1 }],
            comments: 10,
            likes: 100,
            views: 1000,
        },
        {
            id: '3',
            media: [{ type: 'video', url: DummyClip }],
            comments: 10,
            likes: 100,
            views: 1000,
        },
        {
            id: '4',
            media: [{ type: 'video', url: DummyClip1 }],
            comments: 10,
            likes: 100,
            views: 1000,
        },
        {
            id: '5',
            media: [{ type: 'video', url: DummyClip }],
            comments: 10,
            likes: 100,
            views: 1000,
        },
        {
            id: '6',
            media: [{ type: 'video', url: DummyClip1 }],
            comments: 10,
            likes: 100,
            views: 1000,
        },
    ]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isClipBarOpen, setIsClipBarOpen] = useState(false);

    const addPost = (post: Post) => {
        setPosts((prevPosts) => [...prevPosts, post]);
    };

    const updatePost = (id: string, updatedPost: Partial<Post>) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
        );
    };

    const toggleClipBar = () => {
        setIsClipBarOpen((prev) => !prev);
    };

    return (
        <ClipContext.Provider
            value={{ posts, addPost, updatePost, activeIndex, setActiveIndex, isClipBarOpen, toggleClipBar }}
        >
            {children}
        </ClipContext.Provider>
    );
};

export const useClipContext = (): ClipContextProps => {
    const context = useContext(ClipContext);
    if (!context) {
        throw new Error('useClipContext must be used within a ClipProvider');
    }
    return context;
};
