import { Outlet, Navigate } from 'react-router-dom'
import axiosinstance from './axiosApi';
import { useState, useEffect } from 'react';
import validateUserLoggedIn from './ValidateUserLoggedIn';



const PrivateRoutes = () => {
    let [isAuth, setIsAuth] = useState(localStorage.getItem('Auth') === 'true' ? true : false);
    useEffect(() => {
        const validateUserLoggedIn = async () => {
            await axiosinstance.get('api/authcheck').then(function(response){
            if (response.status === 200) {
                if (response.data === false) {
                    localStorage.setItem('Auth', 'false');
                    setIsAuth(false);
                }
                if (response.data === true) {
                    localStorage.setItem('Auth', 'true');
                    setIsAuth(true);
                }
            }
            }).catch(error => {
                if (!error.response) {
                    // network error
                    localStorage.setItem('Auth', 'false');
                    this.errorStatus = 'Error: Network Error';
                } else {
                    localStorage.setItem('Auth', 'false');
                    this.errorStatus = error.response.data.message;
                }
              })
        }
        validateUserLoggedIn();    
    })

    return(
        isAuth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes