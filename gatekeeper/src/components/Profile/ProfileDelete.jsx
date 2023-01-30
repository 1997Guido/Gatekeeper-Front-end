import React from 'react'
import axiosInstance from '../../api/axiosApi'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

//© 2023 Mike Vermeer & Guido Erdtsieck. All rights reserved.

function ProfileDelete(data) {
    const navigate = useNavigate()
    const deleteProfile = async () => {
        await axiosInstance
            .delete('/api/profiledeleteapi')
            .then(function (response) {
                console.log(response)
            })
    }
    return ( 
        <>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
        <div className='container-fluid UserProfileContainer'>
          <div>Are you sure u want to delete?</div>
            {data.data.first_name} {data.data.last_name}<br/>
          <button className='btn btn-primary' onClick={function() {deleteProfile(); navigate("/login")}}>YES</button>
        </div>
        </motion.div>
        </>
     );
}

export default ProfileDelete;