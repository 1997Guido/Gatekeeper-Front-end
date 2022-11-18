import './../css/style.css'
import './../css/scanner.css'
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

function AdminQr() {
    const apiresponse ='';
    const [data, setData] = useState('nothing yet');

    const sendData = (parsed) => {
        axios.post('http://localhost/PHPApiForm/test.php', data)
        .then(function(response){
              console.log(response);
          });
          console.log(data);
      };
    return ( 
        <>
    <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col scanner">
                <QrReader
                    facingMode="environment"
                    onResult={(result, error) => {
                    if (!!result) {
                    setData(result?.text);
                    }
                    if (!!error) {
                    console.info(error);
                    }
                    }}
                    style={{ width: '100%' }}
                />
                <div className='result'>{apiresponse}</div>
            </div>
        </div>
    </div>
        </>
     );
}

export default AdminQr;