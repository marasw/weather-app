// src/api/auth.js
import axios from 'axios';

// API function to authenticate user
export const authenticateUser = async (username, password) => {
    try {
        const response = await axios.post('http://auth-api-url/login', { username, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred during login');
    }
};
