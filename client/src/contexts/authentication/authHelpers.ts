
import axios from 'axios';

export const checkSession = async () => {
    try {
        const response = await axios.get('http://localhost:8000/check-session', {
            withCredentials: true // Ensure cookies are included in the request
        });
        return response.data; // Assuming the server returns user data if the session is valid
    } catch (error) {
        console.error('Session check failed:', error);
        return null;
    }
};
