import { Outlet, Navigate } from 'react-router-dom'
import validateUserLoggedIn from './ValidateUserLoggedIn'
const PrivateRoutes = () => {
    let auth = {'token':validateUserLoggedIn()}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes