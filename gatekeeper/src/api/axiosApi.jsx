import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://gatekeeper.uksouth.cloudapp.azure.com/',
    withCredentials: true,
});

export default axiosInstance;