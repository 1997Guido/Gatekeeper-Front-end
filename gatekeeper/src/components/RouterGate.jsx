import { Route, Routes, useLocation} from 'react-router-dom';
import Home from './General/Home';
import UserProfile from '../components/Profile/UserProfile';
import UserQr from './UserQr';
import CreateEvent from '../components/Events/CreateEvent';
import Events from '../components/Events/Events'
import AdminQr from './AdminQr'
import Register from './General/Register';
import Login from './General/Login';
import {AnimatePresence} from "framer-motion";
import React from 'react';
import PrivateRoutes from '../api/ProtectedRoutes.jsx';
import Nav from './Other/NavBar.jsx';
import MyEvents from '../components/Events/MyEvents';
import SingleEvent from '../components/Events/SingleEventPage';
import validateUserLoggedIn from '../api/ValidateUserLoggedIn';

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
                <Route path="/admin" element={<AdminQr />}></Route>
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