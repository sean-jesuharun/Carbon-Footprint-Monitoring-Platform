import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Function to store tokens in localStorage
const storeTokens = (tokens) => {
    localStorage.setItem('accessToken', tokens.AccessToken);
    localStorage.setItem('refreshToken', tokens.RefreshToken);
    localStorage.setItem('idToken', tokens.IdToken);
};

// Function to remove tokens from localStorage
const removeTokens = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

// Function to retrieve tokens from localStorage
const getTokens = () => {
    return {
        idToken: localStorage.getItem('idToken'),
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
    };
};

// Function to include accessToken in headers for authenticated requests
const getAuthHeaders = () => {
    const { accessToken } = getTokens();
    if (accessToken) {
        return { Authorization: `Bearer ${accessToken}` };
    }
    return {};
};

export const signup = (username, password, email) => {
    return axios.post(`${API_URL}/signup`, { username, password, email });
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const tokens = response.data; // Assuming your API returns idToken, accessToken, refreshToken
        storeTokens(tokens); // Store the tokens in localStorage
        return response;
    } catch (error) {
        throw error;
    }
};

export const verifyEmail = (username, code) => {
    return axios.post(`${API_URL}/verify-email`, { username, code });
};

export const logout = () => {
    removeTokens(); // Remove tokens from localStorage on logout
    // Additional logout actions can be added here if necessary
};

export const fetchProtectedData = () => {
    return axios.get(`${API_URL}/protected-data`, { headers: getAuthHeaders() });
};
