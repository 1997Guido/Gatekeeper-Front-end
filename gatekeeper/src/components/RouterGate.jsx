// Third-party imports
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

// General components
import Home from './General/Home';
import Register from './General/Register';
import Login from './General/Login';

// Profile components
import UserProfile from './Profile/UserProfile';

// QR components
import UserQr from './QR/UserQR';
import Scanner from '../components/QR/Scanner';

// Event components
import CreateEvent from './Events/CreateEvent';
import Events from './Events/Events';
import MyEvents from './Events/MyEvents';
import SingleEvent from './Events/SingleEvent';

// Other components and utilities
import Nav from './Other/NavBar';
import PrivateRoutes from '../api/ProtectedRoutes';

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
                <Route path="/singleevent/:pk" element={<SingleEvent />}></Route>
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