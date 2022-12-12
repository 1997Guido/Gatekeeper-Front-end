import axiosinstance from './axiosApi';


const validateUserLoggedIn = async () => {
    const response = await axiosinstance.get('authcheck');
    return response.data;
}

export default validateUserLoggedIn;