import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://amazon-api-deploy-1-yufe.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export { axiosInstance };
