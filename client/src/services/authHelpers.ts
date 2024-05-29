import axios from 'axios';

export const refreshAuthToken = async () => {
    try {
        const response = await axios.post('http://localhost:8000/refresh-token', {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkSession = async () => {
    try {
        const response = await axios.get('http://localhost:8000/auth/check-session', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

export const scheduleTokenRefresh = () => {
    // Refresh the token 5 minutes before it expires
    const refreshInterval = 55 * 60 * 1000; // 55 minutes

    setTimeout(async () => {
        try {
            await refreshAuthToken();
            // Token refreshed successfully
            scheduleTokenRefresh(); // Schedule the next refresh
        } catch (error) {
            console.error('Failed to refresh token:', error);
        }
    }, refreshInterval);
};
