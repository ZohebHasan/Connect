import React, { createContext, useState, useContext, ReactNode } from 'react';

import Zoheb from "../../components/feed/dummies/personal.jpeg";
import Fahim from "../../components/feed/dummies/Fahim.jpg";
import Adnan from "../../components/feed/dummies/Adnan.jpeg";
import Faysal from "../../components/feed/dummies/Faysal.jpg";
import Faisal from "../../components/feed/dummies/Faisal.jpeg";
import Priyanka from "../../components/feed/dummies/Priyanka.jpeg";
import Yodahe from "../../components/feed/dummies/Yodahe.jpg";
import Puja from "../../components/feed/dummies/Puja.jpeg";

interface User {
  id: number;
  src: string;
  username: string;
}

interface CombinedContextType {
  users: User[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  scrollLeft: () => void;
  scrollRight: () => void;
  isStoriesPageOpen: boolean;
  toggleStoriesPage: (index?: number) => void;
}

interface CombinedProviderProps {
  children: ReactNode;
}

const CombinedContext = createContext<CombinedContextType | undefined>(undefined);

export const StoriesProvider: React.FC<CombinedProviderProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isStoriesPageOpen, setIsStoriesPageOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([
    { id: 0, src: Zoheb, username: '@zoheb' },
    { id: 1, src: Priyanka, username: '@priyanka' },
    { id: 2, src: Fahim, username: '@fahim' },
    { id: 3, src: Yodahe, username: '@yodahe' },
    { id: 4, src: Adnan, username: '@adnan' },
    { id: 5, src: Faysal, username: '@faysal' },
    { id: 6, src: Faisal, username: '@faisal' },
    { id: 7, src: Puja, username: '@puja' },
  ]);

  const scrollLeft = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, users.length - 1));
  };

  const toggleStoriesPage = (index?: number) => {
    if (typeof index === 'number') {
      setActiveIndex(index);
    }
    setIsStoriesPageOpen((prev) => !prev);
  };

  return (
    <CombinedContext.Provider value={{ users, activeIndex, setActiveIndex, scrollLeft, scrollRight, isStoriesPageOpen, toggleStoriesPage }}>
      {children}
    </CombinedContext.Provider>
  );
};

export const useStories = () => {
  const context = useContext(CombinedContext);
  if (!context) {
    throw new Error('useStories must be used within a StoriesProvider');
  }
  return context;
};
