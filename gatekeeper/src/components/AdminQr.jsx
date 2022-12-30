import './../css/GlobalStyle.css'
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

    function ScanAgain() {
        window.location.reload(false);
      }
    
    let csrftoken = useCookies(['csrftoken'])
    const [encryptedqrdata, setencryptedqrdata] = useState('Scan a QR Code');
    const [userdata, setuserdata] = useState('');

    const qrVerify = () => {
        axiosinstance.post('api/qrcodeverificatorapi', {encryptedqrdata},
        {headers: {'X-CSRFToken': csrftoken[0].csrftoken}})
          .then(function(response){
            if (response.data.check === 'True') {
                console.log('QR Verified!')
                console.log(response.data.userdata);
                setuserdata(response.data.userdata);
              } 
            //console.log(response);
          })
    }

    useEffect(() => {
        qrVerify();
    }, [encryptedqrdata])

    if (encryptedqrdata !== 'Scan a QR Code') {
        return(
            <div className='UserProfileContainer'>
            <div className='row'>
                <div className='col Userprofile'>
                <p className='ProfileTitle'>Scanned Profile</p>
            </div>
            </div>
            <div className='row'>
                <div className='col Userprofile'>
                <p>{userdata.first_name} {userdata.last_name}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col Userprofile'>
                    <p>{userdata.date_of_birth}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col Userprofile'>
                    <p>{userdata.gender}</p>
                </div>
            </div>
            <button className='ScanAgain' onClick={() => setencryptedqrdata('Scan a QR Code')} >Scan Again</button>
        </div>
        )
    } else
    return ( 
<motion.div
    initial= {{ opacity: 0, scale: 0.5}}
    animate= {{ opacity: 1, scale: 1}}
    transition= {{ duration: 1 }}
>
    <>

        <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col scanner">
                <QrReader
                    facingMode="environment"
                    onResult={(result, error) => {
                    if (!!result) {
                    setencryptedqrdata(result?.text);
                    result = '';
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
    <div className="result">
        <p className="encryptedqrdata"> {encryptedqrdata} </p>
    </div>
</>
</motion.div>
     );
}

export default AdminQr;