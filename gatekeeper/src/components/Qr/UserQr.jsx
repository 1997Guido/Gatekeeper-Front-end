import "./../../css/Miscellaneous/GlobalStyle.css";
import "./../../css/QR/userqr.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import React from "react";
import axiosinstance from "../../api/axiosApi";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

// © 2023 Mike Vermeer & Guido Erdtsieck. All rights reserved.

function UserQr() {
  const [QrData, setQrData] = useState([]);
  const getProfile = () => {
    axiosinstance.get("api/qrcodegeneratorapi").then(function (response) {
      setQrData(response.data);
    });
  };
  useEffect(() => {
    getProfile();;
  }, []);

  return (
    <>
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
            value={QrData}
            viewBox={`0 0 256 256`}
          />
        </div>
      </motion.div>
    </>
  );
}

export default UserQr;
