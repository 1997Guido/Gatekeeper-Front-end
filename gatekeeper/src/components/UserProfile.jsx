import 'bootstrap/dist/css/bootstrap.css';
import './../css/style.css';
import './../css/userprofile.css';
import { useEffect, useState } from 'react';
import axiosinstance from './../api/axiosApi';
import {motion} from "framer-motion";

function UserProfile() {

    const [data, setData] = useState([]);

    const getProfile = () => {
        axiosinstance.get('api/profileapi')
        .then(function(response){
            const Actualdata = response.data
            setData(Actualdata)
        });
    }
      useEffect(() => {
        getProfile();
      }, []);
    return ( 
        <motion.div
        initial={{ opacity: 0, scale: 0.5}}
        animate={{ opacity: 1, scale: 1}}
        transition={{ duration: 1 }}
      >
    <div className='UserProfileContainer'>
        <div className='row'>
            <div className='col Userprofile'>
            <p className='ProfileTitle'>Your Profile</p>
        </div>
    </div>
        <div className='row'>
            <div className='col Userprofile'>
                <p>{data.first_name} {data.last_name}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col Userprofile'>
                <p>{data.date_of_birth}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col Userprofile'>
                <p>{data.gender}</p>
            </div>
        </div>
    </div>


    </motion.div>
     );
}

export default UserProfile;