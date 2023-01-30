import { Route, Routes, useLocation} from 'react-router-dom';
import Home from './General/Home';
import UserProfile from './Profile/UserProfile';
import UserQr from './QR/UserQr';
import CreateEvent from './Events/CreateEvent';
import Events from './Events/Events'
import Scanner from '../components/QR/Scanner'
import Register from './General/Register';
import Login from './General/Login';
import {AnimatePresence} from "framer-motion";
import React from 'react';
import PrivateRoutes from '../api/ProtectedRoutes.jsx';
import Nav from './Other/NavBar.jsx';
import MyEvents from './Events/MyEvents';
import SingleEvent from './Events/SingleEventPage';

//© 2023 Mike Vermeer & Guido Erdtsieck. All rights reserved.

function RouterGate() {
    const location = useLocation();
    return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route element={<PrivateRoutes/>}>
                <Route path="*" element={<Home />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/scanner" element={<Scanner />}></Route>
                <Route path="/qrpage" element={<UserQr/>}/>
                <Route path="/userprofile" element={<UserProfile />}></Route>
                <Route path="/events" element={<Events />}></Route>
                <Route path="/eventcreate" element={<CreateEvent />}></Route>
                <Route path="/singleeventview" element={<SingleEvent />}></Route>
                <Route path="/myevents" element={<MyEvents />}></Route>
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