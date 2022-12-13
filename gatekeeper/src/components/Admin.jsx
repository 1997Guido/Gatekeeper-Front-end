import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import axiosinstance from './../api/axiosApi';

function Admin() {
    const [data, setData] = useState([]);

    const getQrCode = () => {
        axiosinstance.get('api/qrcodegeneratorapi')
        .then(function(response){
            const Actualdata = response.data
            setData(Actualdata)
            console.log(Actualdata)
        });
    }
      useEffect(() => {
        getQrCode();
      }, []);
    return ( 
        <>
        <button className='btn btn-primary' onClick={getQrCode}>click me</button>

        </>
     );
}

export default Admin;