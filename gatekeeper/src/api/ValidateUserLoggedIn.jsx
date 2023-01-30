import axiosinstance from './axiosApi';

//© 2023 Mike Vermeer & Guido Erdtsieck. All rights reserved.

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