import axios from 'axios'
const baseURL = "https://guidoerdtsieck.nl"
const axiosInstance = axios.create({
    baseURL: baseURL + "/django",
    withCredentials: true,
});

export default axiosInstance;