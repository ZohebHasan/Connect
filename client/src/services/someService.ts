import apiClient from './apiClient';

export const getProtectedResource = async () => {
    try {
        const response = await apiClient.get('/protected-resource');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch protected resource:', error);
        throw error;
    }
};
