import './../css/style.css'
import './../css/adminresult.css'
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import axios from 'axios';
import axiosinstance from './../api/axiosApi';
import {motion} from "framer-motion";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function AdminResult(props) {

console.log(props.data);

<motion.div
initial= {{ opacity: 0, scale: 0.5}}
animate= {{ opacity: 1, scale: 1}}
transition= {{ duration: 1 }}
>

<div className='UserProfileContainer'>
    <div className='row'>
        <div className='col Userprofile'>
        <p className='ProfileTitle'>Your Profile</p>
    </div>
    </div>
    <div className='row'>
        <div className='col Userprofile'>
            <p></p>
        </div>
    </div>
    <div className='row'>
        <div className='col Userprofile'>
            <p>Placeholder Date of Birth</p>
        </div>
    </div>
    <div className='row'>
        <div className='col Userprofile'>
            <p></p>
        </div>
    </div>
</div>

</motion.div>
}

export default AdminResult;