import "./../css/GlobalStyle.css";
import "./../css/scanner.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import axiosinstance from "./../api/axiosApi";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Select from "react-select";
import QrProfile from "./QrProfile";

function AdminQr() {
  const [selectedOption, setSelectedOption] = useState(null);
  let csrftoken = useCookies(["csrftoken"]);
  const [encryptedqrdata, setencryptedqrdata] = useState("Scan a QR Code");
  const [userdata, setuserdata] = useState("");
  const [event, setevent] = useState("");
  const [eventlist, seteventlist] = useState([{}]);
  const tempList = [{}];
  let result = "";


  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const getPersonalEvents = async () => {
    await axiosinstance.get('/api/eventviewapipersonal')
    .then(function(response){
      setevent(response.data);
      console.log(response.data)
      for (let i = 0; i < response.data.length; i++) {
        if (tempList.includes(response.data[i].id) === false) {
          tempList.push({
            value: response.data[i].pk,
            label: response.data[i].EventTitle,
          });
        }
      }

      seteventlist(tempList);
    })
  }

  const qrVerify = () => {
    if (encryptedqrdata !== "Scan a QR Code") {
      axiosinstance
        .post(
          "api/qrcodeverificatorapi",
          { encryptedqrdata },
          { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
        )
        .then(function (response) {
          result = "";
          if (response.data.check === "True") {
            console.log("QR Verified!");
            console.log("Response Userdata: " + response.data.userdata);
            console.log("Selected Option: " + selectedOption);
            setuserdata(response.data.userdata);
          }
          //console.log(response);
        });
    } else {
      console.log("No QR Scanned yet");
    }};

  useEffect(() => {
    qrVerify();
    getPersonalEvents();
    result = "";
  }, [encryptedqrdata]);
  return(
    <div>
      {encryptedqrdata !== "Scan a QR Code" ? (<QrProfile userdata={userdata} />) : (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col scanner">
                <QrReader
                  facingMode="environment"
                  onResult={(result, error) => {
                    if (!!result) {
                      setencryptedqrdata(result?.text);
                    }
                    if (!!error) {
                      //console.info(error);
                    }
                  }}
                  style={{ width: "100%" }}
                />
                <div className="result"></div>
              </div>
            </div>
          </div>
          <div className="result">
            <p className="encryptedqrdata"> {encryptedqrdata} </p>
          </div>
          <Select
          defaultValue={selectedOption}
          onChange={handleChange}
          options={eventlist}
          isMulti={false}
        />
        </>
      </motion.div>
    )
};
</div>
)};

export default AdminQr;