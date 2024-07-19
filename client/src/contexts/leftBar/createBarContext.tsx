import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, MutableRefObject } from 'react';

import SchoolPhoto from "../../components/main/dummies/school.jpeg";
import ProfessionalPhoto from "../../components/main/dummies/professional.jpeg";
import PersonalPhoto from "../../components/main/dummies/personal.jpeg";

// Define the profile types
type ProfileType = 'personal' | 'professional' | 'school';



// Define the media type
export interface Media {
  type: 'image' | 'video';
  url: string;
}

// Define the base post type
interface Post {
  media?: Media[];
  location: string;
  title?: string;
  comments: number;
  likes: number;
  views: number;
  textBody?: string;
}

// Define the specific post types
interface Pixel extends Post {
  media: Media[];
}

interface Chirp extends Post {
  textBody: string;
}

interface Clip extends Post {
  media: Media[];
}

// Define the profile type
interface Profile {
  photoUrl: string;
  postType: Pixel | Chirp | Clip | null;
}

// Define the context state type
interface CreateBarContextType {
  isCreateBarOpen: boolean;
  openCreateBar: () => void;
  closeCreateBar: () => void;
  postAs: ProfileType;
  setPostAs: (profile: ProfileType) => void;
  profiles: Record<ProfileType, Profile>;
  setProfiles: React.Dispatch<React.SetStateAction<Record<ProfileType, Profile>>>;
  isPostingAsBarOpen: boolean;
  togglePostingAsBar: () => void;
  addProtectedRef: (ref: MutableRefObject<HTMLElement | null>) => void;
  removeProtectedRef: (ref: MutableRefObject<HTMLElement | null>) => void;
  isClipAndPixelActive: boolean;
  setClipAndPixelActive: () => void;
  setChirpActive: () => void;
  addMediaToPersonalPost: (media: Media[]) => void;
  clearPersonalMedia: () => void;
}

// Create the context
const CreateBarContext = createContext<CreateBarContextType | undefined>(undefined);

// Create a provider component
export const CreateBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCreateBarOpen, setIsCreateBarOpen] = useState<boolean>(false);
  const [postAs, setPostAs] = useState<ProfileType>('personal');
  const [profiles, setProfiles] = useState<Record<ProfileType, Profile>>({
    personal: {
      photoUrl: PersonalPhoto,
      postType: null
    },
    professional: {
      photoUrl: ProfessionalPhoto,
      postType: null
    },
    school: {
      photoUrl: SchoolPhoto,
      postType: null
    }
  });
  const [isPostingAsBarOpen, setIsPostingAsBarOpen] = useState<boolean>(false);
  const [isClipAndPixelActive, setIsClipAndPixelActive] = useState<boolean>(true);

  const protectedRefs = useRef<MutableRefObject<HTMLElement | null>[]>([]);

  const openCreateBar = () => {
    setIsCreateBarOpen(true);
  };

  const closeCreateBar = () => {
    setIsCreateBarOpen(false);
  };

  const togglePostingAsBar = () => {
    setIsPostingAsBarOpen(prev => !prev);
  };

  const addProtectedRef = (ref: MutableRefObject<HTMLElement | null>) => {
    protectedRefs.current.push(ref);
  };

  const removeProtectedRef = (ref: MutableRefObject<HTMLElement | null>) => {
    protectedRefs.current = protectedRefs.current.filter(protectedRef => protectedRef !== ref);
  };

  const setClipAndPixelActive = () => {
    setIsClipAndPixelActive(true);
  };

  const setChirpActive = () => {
    setIsClipAndPixelActive(false);
  };

  const addMediaToPersonalPost = (media: Media[]) => {
    setProfiles(prevProfiles => {
      const personalProfile = prevProfiles.personal;
      if (personalProfile.postType && 'media' in personalProfile.postType) {
        const currentMedia = personalProfile.postType.media || [];
        const newMedia = [...currentMedia, ...media].slice(0, 15); // Ensure no more than 15 items
        personalProfile.postType.media = newMedia;
      } else {
        personalProfile.postType = { media: media.slice(0, 15) } as Pixel;
      }
      return {
        ...prevProfiles,
        personal: { ...personalProfile, postType: { ...personalProfile.postType } },
      };
    });
  };

  const clearPersonalMedia = () => {
    setProfiles(prevProfiles => ({
      ...prevProfiles,
      personal: {
        ...prevProfiles.personal,
        postType: null
      }
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isPostingAsBarOpen) {
        const isClickOutsideProtectedRefs = !protectedRefs.current.some(ref => ref.current?.contains(event.target as Node));
        if (isClickOutsideProtectedRefs) {
          togglePostingAsBar();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPostingAsBarOpen]);

  return (
    <CreateBarContext.Provider value={{
      isCreateBarOpen,
      openCreateBar,
      closeCreateBar,
      postAs,
      setPostAs,
      profiles,
      setProfiles,
      isPostingAsBarOpen,
      togglePostingAsBar,
      addProtectedRef,
      removeProtectedRef,
      isClipAndPixelActive,
      setClipAndPixelActive,
      setChirpActive,
      addMediaToPersonalPost,
      clearPersonalMedia
    }}>
      {children}
    </CreateBarContext.Provider>
  );
};

// Create a custom hook to use the CreateBarContext
export const useCreateBar = (): CreateBarContextType => {
  const context = useContext(CreateBarContext);
  if (!context) {
    throw new Error('useCreateBar must be used within a CreateBarProvider');
  }
  return context;
};
