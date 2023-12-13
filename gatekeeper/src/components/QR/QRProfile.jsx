import React, { useState } from "react";
import Scanner from "./Scanner";
import { motion } from "framer-motion";
import axiosInstance from "./../../api/axiosApi";
import baseURL from "./../../api/axiosApi";
import "./../../css/Miscellaneous/GlobalStyle.css";
import "./../../css/QR/scanner.css";

// This is the QrProfile component. It is used to handle scanned QR codes.

const mediaURL = process.env.NODE_ENV === 'production' ? "https://guidoerdtsieck.nl" : "http://localhost:8000"
function QrProfile({ userdata, option, status }) {
  const [scan, setScan] = useState(false);

  if (!scan) {
    const InvalidMessage = 
      status === 401 ? 
      {
          title: "Invalid Request",
          text: "This user has not been invited to the selected event!"
      } : 
      status === 406 ? 
      {
          title: "QR Code Expired",
          text: "This QR Code has expired!"
      } :
      {
          title: "Invalid QR Code",
          text: "This user does not exist or the QR code is invalid!"
      };
      

    if (status === 401 || status === 404 || status === 500 || status === 400 || status === 406) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="InvalidContainer">
            <div className="row">
              <div className="col">
                <p className="InvalidTitle">{InvalidMessage.title}</p>
                <p className="InvalidText">{InvalidMessage.text}</p>
              </div>
            </div>
            <button className="btn btn-primary buttonscan" onClick={() => setScan(true)}>Scan Again</button>
          </div>
        </motion.div>
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
                {userdata.profilepicture_url ? (
                  <div>
                    <img className="Image" src={mediaURL + userdata.profilepicture_url} alt="Profile Picture" />
                  </div>
                ) : (
                  <p>No Profile Picture</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>
                  {userdata.first_name} {userdata.last_name}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>{userdata.date_of_birth}</p>
              </div>
            </div>
            <div className="row">
              <div className="col Userprofile">
                <p>{userdata.gender}</p>
              </div>
            </div>
            <button className="btn btn-primary buttonscan" onClick={() => setScan(true)}>Scan Again</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default QrProfile;