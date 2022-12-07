import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import UserProfile from './UserProfile';
import UserQr from './UserQr';
import Admin from './Admin'
import AdminQr from './AdminQr'
import Register from './Register';
import Login from './Login';
import {AnimatePresence} from "framer-motion";
import React from 'react';

function AnimatedRoutes() {
    const location = useLocation();

    return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/adminqr" element={<AdminQr />}></Route>
            <Route path="/userprofile" element={<UserProfile />}></Route>
            <Route path="/userqr" element={<UserQr />}></Route>
        </Routes>
    </AnimatePresence>
    );
}


export default AnimatedRoutes;