import "../../css/GlobalStyle.css";
import "../../css/Qr/scanner.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Scanner from "./Scanner";
import { motion } from "framer-motion";
import axiosinstance from "../../api/axiosApi";
import { useEffect } from "react";

//© 2023 Mike Vermeer & Guido Erdtsieck. All rights reserved.

function QrProfile(userdata, option) {

  const [scan, setScan] = useState(false);
  const url = "http://localhost:8000";

  if (userdata.userdata === undefined) {
    if (scan === false) {
  return (
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="InvalidContainer">
            <div className="row">
              <div className="col">
                <p className="InvalidTitle">Invalid QR Code</p>
                <p className="InvalidText">No user found or invited with this QR Code!</p>
              </div>
              </div>
                <button className="btn btn-primray buttonscan" onClick={() => setScan(true)}>Scan Again</button>
            </div>
        </motion.div>
      </div>
    );
  }
}


  return (
    <div>
      {scan ? (
        <Scanner ReturnedOption={option} />
      ) : (
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="QRProfileContainer">
          <div className="row">
            <div className="col Userprofile">
              <p className="ProfileTitle">Scanned Profile</p>
            </div>
          </div>
          <div className="row">
            <div className="col Userprofile">
            {userdata.userdata.imageurl === null ? (
                      <p>No Profile Picture</p>
                  ) : (
                    <div>
                      <img
                        className="Image"
                        src={url + userdata.userdata.imageurl}
                      />
                    </div>
                  )}
            </div>
          </div>

          <div className="row">
            <div className="col Userprofile">
              <p>
                {userdata.userdata.first_name} {userdata.userdata.last_name}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col Userprofile">
              <p>{userdata.userdata.date_of_birth}</p>
            </div>
          </div>
          <div className="row">
            <div className="col Userprofile">
              <p>{userdata.userdata.gender}</p>
            </div>
          </div>
          <button className="btn btn-primray buttonscan" onClick={() => setScan(true)}>Scan Again</button>
        </div>
      </motion.div>
      )}
    </div>
  );
}

export default QrProfile;