import "./../css/GlobalStyle.css";
import "./../css/scanner.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import AdminQr from "./AdminQr";
import { motion } from "framer-motion";
import axiosinstance from "../api/axiosApi";
import { useEffect } from "react";

function QrProfile(userdata, option) {

  const [scan, setScan] = useState(false);
  const [picture, setPicture] = useState([{}]);

  const url = "http://gatekeeper.uksouth.cloudapp.azure.com/";

  const getProfilePicture = () => {
    axiosinstance
      .get(`api/imageview?allmypictures=profilepicture`)
      .then(function (response) {
        console.log(response);
        setPicture(response.data);
      });
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  // if (userdata.userdata.invited === 'false') {
  //   if (scan === false) {
  //     return (
  //         <div>
  //           <motion.div
  //             initial={{ opacity: 0, scale: 0.5 }}
  //             animate={{ opacity: 1, scale: 1 }}
  //             transition={{ duration: 1 }}
  //           >
  //             <div className="InvalidContainer">
  //               <div className="row">
  //                 <div className="col">
  //                   <p className="InvalidTitle">Invalid QR Code</p>
  //                   <p className="InvalidText">This user was not invited to this event!</p>
  //                 </div>
  //                 </div>
  //                   <button className="btn btn-primray buttonscan" onClick={() => setScan(true)}>Scan Again</button>
  //               </div>
  //           </motion.div>
  //         </div>
  //       );
  //     }
  //   }

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
        <AdminQr ReturnedOption={option} />
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
            {picture.Image === null ? (
                      <p>No Profile Picture</p>
                  ) : (
                    <div>
                      <img
                        className="Image"
                        src={url + picture.Image}
                        alt={picture.Title}
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