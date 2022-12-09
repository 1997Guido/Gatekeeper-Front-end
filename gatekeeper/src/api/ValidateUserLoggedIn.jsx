import axiosinstance from './axiosApi';


const validateUserLoggedIn = async () => {
    const response = await axiosinstance.get('autcheck');
    return response.data;
}

export default validateUserLoggedIn;