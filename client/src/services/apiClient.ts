import axios from 'axios';
import { refreshAuthToken } from './authHelpers';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await refreshAuthToken();
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
