import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type FilterType = 'balanced' | 'personal' | 'professional' | 'school';

interface FiltersContextType {
    activeFilter: FilterType;
    handleFiltersChange: (Filter: FilterType) => void;
    isActiveBalanced: boolean;
    isActivePersonal: boolean;
    isActiveProfessional: boolean;
    isActiveSchool: boolean;
    isFiltersbarOpen: boolean;
    toggleFiltersbar: () => void;
    addProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
    removeProtectedRef: (ref: React.RefObject<HTMLElement>) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('balanced');
    const [isFiltersbarOpen, setIsFiltersbarOpen] = useState<boolean>(false);
    const protectedRefs = useRef<React.RefObject<HTMLElement>[]>([]);

    const isActiveBalanced = activeFilter === 'balanced';
    const isActivePersonal = activeFilter === 'personal';
    const isActiveProfessional = activeFilter === 'professional';
    const isActiveSchool = activeFilter === 'school';

    const handleFiltersChange = (Filter: FilterType) => {
        setActiveFilter(Filter);
        setIsFiltersbarOpen(false);
    };

    const toggleFiltersbar = () => {
        setIsFiltersbarOpen(prev => !prev);
    };

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
            if (isFiltersbarOpen) {
                const isClickOutsideProtectedRefs = !protectedRefs.current.some(ref => ref.current?.contains(event.target as Node));
                if (isClickOutsideProtectedRefs) {
                    toggleFiltersbar();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFiltersbarOpen]);

    return (
        <FiltersContext.Provider value={{
            activeFilter,
            handleFiltersChange,
            isActiveBalanced,
            isActivePersonal,
            isActiveProfessional,
            isActiveSchool,
            isFiltersbarOpen,
            toggleFiltersbar,
            addProtectedRef,
            removeProtectedRef
        }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilter = (): FiltersContextType => {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};
