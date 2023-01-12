import "./../css/GlobalStyle.css";
import "./../css/scanner.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import AdminQr from "./AdminQr";

function QrProfile(userdata) {
  const [scan, setscan] = useState(false);
  return (
    <div>
      {scan ? (
        <AdminQr />
      ) : (
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
          <button className="btn btn-primray" onClick={() => setscan(true)}>Scan Again</button>
        </div>

      )}
    </div>
  );
}

export default QrProfile;
