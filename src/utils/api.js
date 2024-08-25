import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/bfhl', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const postData = async (data) => {
    return await apiClient.post('/bfhl', data);
};
