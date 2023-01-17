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

function AdminQr() {
  const [selectedOption, setSelectedOption] = useState(null);
  let csrftoken = useCookies(["csrftoken"]);
  const [encryptedqrdata, setencryptedqrdata] = useState("Scan a QR Code");
  const [data, setdata] = useState("");
  const [event, setevent] = useState("");
  const [eventlist, seteventlist] = useState([{}]);
  const [check, setcheck] = useState(false);
  const [error, setError] = useState("no error");
  const tempList = [{}];
  let result = "";


  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const getPersonalEvents = async () => {
    await axiosinstance.get('/api/eventviewapipersonal')
      .then(function (response) {
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
          {
            encryptedqrdata: encryptedqrdata,
            event: selectedOption.value
          },
          { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
        )
        .then(function (response) {
          console.log("Response: " , response)
          if (response.status === 200) {
          if (response.data.check === 'true') {
            result = "";
            console.log("QR Verified!");
            console.log("Response Check: ", response.data.check);
            //console.log("Response: " , response)
            console.log("Userdata: ", response.data.userdata);
            //console.log("Selected Option: " , selectedOption);
            //console.log("Guestlist: ", response.data.guestlist)
            setdata(response.data.userdata, response.data.check);
            //console.log("UseState Userdata: " , data);
          } else {
            console.log("QR not Verified!");
            console.log("Response Check: ", response.data.check);
            console.log("Invalid QR Code");
            if (response.data.check === 'false') {
              setcheck(false);
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
      {encryptedqrdata !== "Scan a QR Code" ? (<QrProfile userdata={data} />) : (
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

            <div>
              {check === true ? (<div>"U are not invited"</div>) : (null)}
              {error === "Internal Server Error" ? (<div>"Invalid QR Code"</div>) : (null)}
              {error === "Network Error" ? (<div>"Network Error"</div>) : (null)}
            </div>
          </>
        </motion.div>
      )
      };
    </div>
  )
};

export default AdminQr;