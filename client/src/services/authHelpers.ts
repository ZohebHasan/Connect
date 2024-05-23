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
