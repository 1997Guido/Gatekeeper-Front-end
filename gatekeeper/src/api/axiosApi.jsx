import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://guidoerdtsieck.nl/django",
    withCredentials: true,
});

export default axiosInstance;