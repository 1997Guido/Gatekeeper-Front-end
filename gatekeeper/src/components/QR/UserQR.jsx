import React, { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";

import "./../../css/Miscellaneous/GlobalStyle.css";
import "./../../css/QR/userqr.css";
import "bootstrap/dist/css/bootstrap.css";


function UserQR() {
  const [qrData, setQrData] = useState([]);

  const getProfile = async () => {
    await axiosinstance.get("api/qrcode")
      .then(response => {
        setQrData(response.data);
      })
      .catch(error => {
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container-fluid">
        <div className="row">
        <div className="col py-3 QrTitle">
          <div className="text-center">Your QR-Code</div>
        </div>
      <div className="QRContainer">
        <QRCode
          size={512}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrData.toString()}
          viewBox={`0 0 256 256`}
        />
      </div>
      </div>
      </div>
    </motion.div>
  );
}

export default UserQR;