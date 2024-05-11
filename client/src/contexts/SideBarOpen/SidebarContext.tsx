import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface SidebarContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    addProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    removeProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
}

const SidebarContext = createContext<SidebarContextType>({
    isSidebarOpen: false,
    toggleSidebar: () => {},
    addProtectedRef: () => {},
    removeProtectedRef: () => {}
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const protectedRefs = useRef<React.RefObject<HTMLElement>[]>([]);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    const addProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        if (!protectedRefs.current.includes(ref)) {
            protectedRefs.current.push(ref);
        }
    };

    const removeProtectedRef = (ref: React.RefObject<HTMLElement>) => {
        protectedRefs.current = protectedRefs.current.filter(r => r !== ref);
    };
    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isSidebarOpen) {
                const isClickOutsideProtectedRefs = !protectedRefs.current.some(ref => ref.current?.contains(event.target as Node));
                if (isClickOutsideProtectedRefs) {
                    toggleSidebar();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <SidebarContext.Provider value={{
            isSidebarOpen,
            toggleSidebar,
            addProtectedRef,
            removeProtectedRef
        }}>
            {children}
        </SidebarContext.Provider>
    );
};
