import './../css/style.css'
import './../css/scanner.css'
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';


function AdminQr() {
    const [data, setData] = useState('No result');
    return ( 
        <>
        <div className="row">
            <div className="col"></div>
            <div className="col scanner">
                <QrReader
                    onResult={(result, error) => {
                    if (!!result) {
                    setData(result?.text);
                    }
                    if (!!error) {
                    console.info(error);
                    }
                    }}
                    style={{ width: '50vh' }}
                />
                    <p>{data}</p>
            </div>
            <div className="col"></div>
        </div>
        </>
     );
}

export default AdminQr;