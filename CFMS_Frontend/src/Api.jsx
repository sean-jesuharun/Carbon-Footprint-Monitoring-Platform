import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

const storeTokens = (tokens) => {
    localStorage.setItem('accessToken', tokens.AccessToken);
    localStorage.setItem('refreshToken', tokens.RefreshToken);
    localStorage.setItem('idToken', tokens.IdToken);
};


const removeTokens = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};


const getTokens = () => {
    return {
        idToken: localStorage.getItem('idToken'),
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
    };
};

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
        const tokens = response.data; // API returns idToken, accessToken, refreshToken
        storeTokens(tokens);
        return response;
    } catch (error) {
        throw error;
    }
};

export const verifyEmail = (username, code) => {
    return axios.post(`${API_URL}/verify-email`, { username, code });
};

export const logout = () => {
    removeTokens();
};

export const fetchProtectedData = () => {
    return axios.get(`${API_URL}/protected-data`, { headers: getAuthHeaders() });
};

export const initiatePasswordReset = (username) => {
    return axios.post(`${API_URL}/reset-password`, { username });
};

export const confirmResetPassword = (username, code, newPassword) => {
    return axios.post(`${API_URL}/confirm-reset-password`, { username, code, newPassword });
};
