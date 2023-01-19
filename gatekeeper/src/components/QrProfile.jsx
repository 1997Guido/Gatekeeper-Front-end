import "./../css/GlobalStyle.css";
import "./../css/scanner.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import AdminQr from "./AdminQr";
import { motion } from "framer-motion";

function QrProfile(userdata) {

  console.log("userdata profile page: " , userdata)

  const [scan, setScan] = useState(false);

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
        <AdminQr />
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