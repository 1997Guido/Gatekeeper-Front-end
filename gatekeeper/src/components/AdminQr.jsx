import './../css/style.css'
import './../css/scanner.css'
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import axiosinstance from './../api/axiosApi';
import {motion} from "framer-motion";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function AdminQr() {
    
    let csrftoken = useCookies(['csrftoken'])
    const [encryptedqrdata, setencryptedqrdata] = useState('Scan a QR Code');

    const qrVerify = () => {
        axiosinstance.post('api/qrcodeverificatorapi', {encryptedqrdata},
        {headers: {'X-CSRFToken': csrftoken[0].csrftoken}})
          .then(function(response){
            console.log(response);
          })
    }
    useEffect(() => {
        qrVerify();
    });
    return ( 
<motion.div
    initial={{ opacity: 0, scale: 0.5}}
    animate={{ opacity: 1, scale: 1}}
    transition={{ duration: 1 }}
>
    <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col scanner">
                <QrReader
                    facingMode="environment"
                    onResult={(result, error) => {
                    if (!!result) {
                    setencryptedqrdata(result?.text);
                    }
                    if (!!error) {
                    //console.info(error);
                    }
                    }}
                    style={{ width: '100%' }}
                />
                <div className='result'></div>
            </div>
        </div>
    </div>

    <br></br>

    <div className="result">
        <p className="encryptedqrdata"> {encryptedqrdata} </p>
    </div>
</motion.div>
     );
}

export default AdminQr;