import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://guidoerdtsieck.nl/',
    withCredentials: true,
});

export default axiosInstance;