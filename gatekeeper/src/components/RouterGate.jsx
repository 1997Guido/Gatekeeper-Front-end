import { Route, Routes, useLocation} from 'react-router-dom';
import Home from './Home';
import UserProfile from './UserProfile';
import UserQr from './UserQr';
import Admin from './Admin'
import AdminQr from './AdminQr'
import Register from './Register';
import Login from './Login';
import {AnimatePresence} from "framer-motion";
import React from 'react';
import PrivateRoutes from '../api/ProtectedRoutes.jsx';
import Nav from './NavBar.jsx';



function RouterGate() {
    const location = useLocation();
    return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="adminqr" element={<AdminQr/>} exact/>
                <Route path="/userprofile" element={<UserProfile />}></Route>
                <Route path="/userqr" element={<UserQr />}></Route>
            </Route>
        </Routes>
        <div>
    {location.pathname !== '/login' && location.pathname !== '/register' ?
      <Nav/>:null
    }
    </div>
    </AnimatePresence>
    );
}


export default RouterGate;