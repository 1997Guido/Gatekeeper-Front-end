import React, { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";

import "./../../css/Miscellaneous/GlobalStyle.css";
import "./../../css/QR/userqr.css";
import "bootstrap/dist/css/bootstrap.css";

// This is the UserQR component. It is used to display the user's QR code.

function UserQR() {
  const [qrData, setQrData] = useState([]);

  const getProfile = async () => {
    await axiosinstance.get("api/qrcode")
      .then(response => {
        console.log(response.data);
        setQrData(response.data);
      })
      .catch(error => {
        console.log(error.response);
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
      <div className="container-fluid UserProfileContainer">
        <div className="col">
          <div className="QrTitle">Your QR-Code</div>
        </div>
      </div>
      <div className="QRContainer">
        <QRCode
          size={512}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrData.toString()}
          viewBox={`0 0 256 256`}
        />
      </div>
    </motion.div>
  );
}

export default UserQR;