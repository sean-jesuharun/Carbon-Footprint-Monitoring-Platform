import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const signup = (username, password, email) => {
    return axios.post(`${API_URL}/signup`, { username, password, email });
};

export const login = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

export const verifyEmail = (username, code) => {
    return axios.post(`${API_URL}/verify-email`, { username, code });
};
