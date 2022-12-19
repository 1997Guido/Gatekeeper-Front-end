import axiosinstance from './axiosApi';


const validateUserLoggedIn = async () => {
    const response = await axiosinstance.get('api/authcheck');
    if (response.data === 'false') {
        console.log(response.data)
        localStorage.setItem('Auth', 'false');
    }
    if (response.data === 'true') {
        localStorage.setItem('Auth', 'true');
        console.log(response.data)
    }
}

export default validateUserLoggedIn;