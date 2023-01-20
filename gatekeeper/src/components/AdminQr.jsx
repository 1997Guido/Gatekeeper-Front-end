import "./../css/GlobalStyle.css";
import * as TbIcons from "react-icons/tb";
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

// This is the component that is used to scan QR codes

function AdminQr(props) {
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem("selectedOption") ? JSON.parse(localStorage.getItem("selectedOption")) : null);
  let csrftoken = useCookies(["csrftoken"]);
  const [encryptedqrdata, setencryptedqrdata] = useState("Scan a QR Code");
  const [data, setdata] = useState("");
  const [eventlist, seteventlist] = useState([{}]);
  const [error, setError] = useState("no error");
  const tempList = [{}];
  let result = "";
  let check = "";

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option Selected:`, selectedOption);
    // document.querySelector(".scanner").style.display = "block";
    // document.querySelector(".temptext").style.display = "none";
  };

  const getPersonalEvents = async () => {
    await axiosinstance.get('/api/eventviewapipersonal')
      .then(function (response) {
        console.log("Fetched personal events: " , response.data)
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
          {
            encryptedqrdata: encryptedqrdata,
            event: selectedOption.value
          },
          { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
        )
        .then(function (response) {
          localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
          //console.log("Response: " , response)
          check = "";
          if (response.status === 200) {
          if (response.data.check === 'true') {
            result = "";
            console.log("QR Verified!");
            //console.log("Response Check: ", response.data.check);
            //console.log("Response: " , response)
            //console.log("Userdata: ", response.data.userdata);
            //console.log("Selected Option: " , selectedOption);
            //console.log("Guestlist: ", response.data.guestlist)
            setdata(response.data.userdata, response.data.check);
            //console.log("UseState Userdata: " , data);
          } else {
            setencryptedqrdata("Scan a QR Code");
            console.log("QR not Verified!");
            console.log("Response Check: ", response.data.check);
            console.log("Invalid QR Code");
            if (response.data.check === 'false') {
              check = false;
            }
          }
        }})
        .catch(function (error) {
          setencryptedqrdata("Scan a QR Code");
          if (error.response.status === 500) {
            setError("Internal Server Error");
          } else if(!error.response) {
            // network error
            setError("Network Error");
          }
        });
    } else {
      console.log("No QR Scanned yet");
    }
  };

  useEffect(() => {
    qrVerify();
    getPersonalEvents();
    result = "";
  }, [encryptedqrdata]);

  return (
    <div>
    {selectedOption !== null ? (
    <div>
    {encryptedqrdata !== "Scan a QR Code" ? (<QrProfile userdata={data} option={selectedOption} />) : (
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
              </div>
            </div>
          </div>

          <Select className="select"
            defaultValue={selectedOption}
            onChange={function() {handleChange(); }}
            options={eventlist}
            isMulti={false}
          />

          <div>
            {error === "Internal Server Error" ? (<div>"Invalid QR Code"</div>) : (null)}
            {error === "Network Error" ? (<div>"Network Error"</div>) : (null)}
          </div>
        </>
      </motion.div>
    )
    };
  </div>
    ) : (
    <div>

    <div className="temptext">
      <p>Choose one of your personal events you want to start scanning for</p>
    </div>

    <Select className="select"
      defaultValue={selectedOption}
      onChange={handleChange}
      options={eventlist}
      isMulti={false}
    />
    </div>
    )}
  </div>
  );
};

export default AdminQr;