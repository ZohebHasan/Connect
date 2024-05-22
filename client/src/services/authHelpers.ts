import axios from 'axios';

export const refreshAuthToken = async () => {
    try {
        console.log("Trying to refresh Token");
        const response = await axios.post('http://localhost:8000/refresh-token', {}, {
            withCredentials: true,
        });
        console.log("Token refresh successful");
        return response.data;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
};

export const checkSession = async () => {
    try {
        console.log("Trying to check existing token");
        const response = await axios.get('http://localhost:8000/auth/check-session', {
            withCredentials: true,
        });
        console.log("Authentication successful for existing token");
        return response.data;
    } catch (error) {
        console.error('Session check failed:', error);
        return null;
    }
};
