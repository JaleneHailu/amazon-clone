import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://amazon-api-deploy-5vg1.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export { axiosInstance };
