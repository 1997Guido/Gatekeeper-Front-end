import './../css/style.css'
import './../css/scanner.css'
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import axiosinstance from './../api/axiosApi';
import {motion} from "framer-motion";

function AdminQr() {
    const [encryptedqrdata, setencryptedqrdata] = useState('Scan a QR Code');
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
                    axiosinstance.post('api/qrcodeverificatorapi', {encryptedqrdata: 'gAAAAABjnLU5LD68MyflBcUgs4AX12OW4gL-UcFA6Qvt1g5eblyNKZy_Tlhye7ar0y40EjSnD32LNvkAqILE1vyxcLouGFqJv4sBcapkYkTmV6Kaa3l7JEs='})
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