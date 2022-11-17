import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './../components/Home';
import UserProfile from './../components/UserProfile';
import UserQr from './../components/UserQr';
import Admin from './../components/Admin'
import AdminQr from './../components/AdminQr'
import {AnimatePresence} from "framer-motion";
import React from 'react';

function AnimatedRoutes() {
    const location = useLocation();

    return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/adminqr" element={<AdminQr />}></Route>
            <Route path="/userprofile" element={<UserProfile />}></Route>
            <Route path="/userqr" element={<UserQr />}></Route>
        </Routes>
    </AnimatePresence>
    );
}


export default AnimatedRoutes;