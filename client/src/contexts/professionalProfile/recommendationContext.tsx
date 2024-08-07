import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfile {
    userId: string;
    userName: string;
    name?: string;
    isVerified?: boolean;
    profilePhoto?: string;
    currentStatus: {
      role: string;
      orgName?: string;
    };
  }

interface Media {
    type: 'image' | 'video';
    url: string;
}

interface RecommendationInfo {
    recommender: UserProfile;
    text?: string;
    media?: Media[];
    recTime: string;
    recType?: 'strongly' | 'formally';
    description: string;
    relation: string;
    relationStatus: 'current' | 'former';
}

interface RecInfoContextData {
    recommendations: RecommendationInfo[];
    loading: boolean;
    error: string | null;
}

interface RecInfoProviderProps {
    children: ReactNode;
}

const RecInfoContext = createContext<RecInfoContextData | undefined>(undefined);

export const RecInfoProvider: React.FC<RecInfoProviderProps> = ({ children }) => {
    const [recommendations, setRecommendations] = useState<RecommendationInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/currentUserProfessionalRecommendations`, {
                    withCredentials: true,
                });

                setRecommendations(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                setError('Failed to fetch recommendations');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <RecInfoContext.Provider value={{ 
            recommendations,
            loading,
            error
        }}>
            {children}
        </RecInfoContext.Provider>
    );
};

export const useRecInfoContext = (): RecInfoContextData => {
    const context = useContext(RecInfoContext);
    if (!context) {
        throw new Error('useRecInfoContext must be used within a RecInfoProvider');
    }
    return context;
};
