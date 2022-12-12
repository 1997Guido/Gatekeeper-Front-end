import { Outlet, Navigate } from 'react-router-dom'
import axiosinstance from './axiosApi';
import { useState, useEffect } from 'react';
import validateUserLoggedIn from './ValidateUserLoggedIn';



const PrivateRoutes = () => {
    let [isAuth, setIsAuth] = useState(localStorage.getItem('Auth') === 'true' ? true : false);
    useEffect(() => {
        const validateUserLoggedIn = async () => {
            await axiosinstance.get('api/authcheck').then(function(response){
                if (response.data === false) {
                    localStorage.setItem('Auth', 'false');
                    setIsAuth(false);
                }
                if (response.data === true) {
                    localStorage.setItem('Auth', 'true');
                    setIsAuth(true);
                }
            });
        }
        validateUserLoggedIn();    
    })

    return(
        isAuth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes