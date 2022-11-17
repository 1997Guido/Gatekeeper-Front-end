import './../css/style.css'
import './../css/scanner.css'
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { useEffect } from 'react';

function AdminQr() {

    const [data, setData] = useState('nothing yet');

    const sendData = (parsed) => {
        axios.post('http://localhost/PHPApiForm/test.php', {data: {
          name: parsed.name
            }}).then(function(response){
              console.log(response);
          });
          console.log(parsed);
      };
    return ( 
        <>
    <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col scanner">
                <QrReader
                    onResult={(result, error) => {
                    if (!!result) {
                    setData(result?.text);
                    const parsed = JSON.parse(result?.text)
                    console.log(parsed);
                    console.log(parsed.name);
                    sendData(parsed);
                    }
                    if (!!error) {
                    console.info(error);
                    }
                    }}
                    style={{ width: '100%' }}
                />
                <div className='result'>{data}</div>
            </div>
        </div>
    </div>
        </>
     );
}

export default AdminQr;