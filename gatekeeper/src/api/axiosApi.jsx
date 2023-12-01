import axios from 'axios'
const URL = process.env.NODE_ENV === 'production' ? "https://guidoerdtsieck.nl/django" : "http://localhost:8000"
console.log("URL: ", URL)
const axiosInstance = axios.create({
    baseURL: URL,
    withCredentials: true,
});

export default axiosInstance;