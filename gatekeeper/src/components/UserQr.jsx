import './../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {motion} from "framer-motion";
import React from "react";
import axiosinstance from './../api/axiosApi';
import QRCode from "react-qr-code";
import { useEffect, useState } from 'react';



function UserQr() {

const [Actualdata, setActualdata] = useState([]);
  const getProfile = () => {
    axiosinstance.get('api/qrcodegeneratorapi')
    .then(function(response){
        setActualdata(response.data)
        console.log(Actualdata)
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

        

      <div style={{ height: "auto", margin: "auto", maxWidth: "auto", width: "100%", background: "white", padding: "4px"  }}>
          <QRCode
            size={512}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={Actualdata}
            viewBox={`0 0 256 256`}
          />
      </div>
    </motion.div>
    );
}

export default UserQr;