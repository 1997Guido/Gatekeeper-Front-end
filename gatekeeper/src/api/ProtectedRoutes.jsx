import { Outlet, Navigate } from 'react-router-dom'
import axiosinstance from './axiosApi';
import { useState, useEffect } from 'react';


const PrivateRoutes = () => {
    let [isAuth, setIsAuth] = useState(localStorage.getItem('Auth') === 'true' ? true : false);
    useEffect(() => {
        const validateUserLoggedIn = async () => {
            await axiosinstance.get('/api/authcheck').then(function(response){
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
                    alert('Network Error');
                    localStorage.setItem('Auth', 'false');
                    setIsAuth(false);
                } else {
                    localStorage.setItem('Auth', 'false');
                    setIsAuth(false);
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