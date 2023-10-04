import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import axiosinstance from "../../api/axiosApi";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import Select from "react-select";
import QrProfile from "./QRProfile";

import "./../../css/Miscellaneous/GlobalStyle.css";
import "./../../css/QR/scanner.css";
import "bootstrap/dist/css/bootstrap.css";

// This is the Scanner component. It is used to scan QR codes and verify them.


function Scanner() {
  const [selectedOption, setSelectedOption] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedOption")) || null;
  });
  const [encryptedqrdata, setEncryptedQRData] = useState("");
  const [data, setData] = useState("");
  const [eventList, setEventList] = useState([]);
  const [error, setError] = useState("no error");
  const [status, setStatus] = useState(null);
  const csrftoken = useCookies(["csrftoken"])[0];

  useEffect(() => {
    qrVerify();
    getPersonalEvents();
  }, [encryptedqrdata]);

  const handleChange = selected => {
    setSelectedOption(selected);
    console.log(`Option Selected:`, selected);
  };

  const getPersonalEvents = async () => {
    await axiosinstance.get('/api/eventslist?show=owned')
    .then(response => {
      const tempList = response.data.map(event => ({
        value: event.pk,
        label: event.EventTitle
      }));
  
      tempList.unshift({ value: "", label: "Select an event" });
  
      setEventList(tempList);
    })
    .catch(error => {
      console.log(error.response);
    });
  };

  const qrVerify = () => {
    if (!encryptedqrdata) {
      console.log("No QR Scanned yet");
      return;
    }

    const headers = {
      "X-CSRFToken": csrftoken.csrftoken
    };

    axiosinstance.post("api/qrcode", {
      encryptedqrdata,
      event: selectedOption.value
    }, { headers })
      .then(response => {
        console.log("QR Verified!" , response);
        localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
        setData(response.data.userdata);
        setStatus(response.status);
      })
      .catch(handleError);
  };

  const handleError = err => {
    console.error("Request Error:", err);
    if (err.response) {
      setStatus(err.response.status);
      switch (err.response.status) {
        case 400:
          setError("Bad Request");
          break;
        case 401:
          setError("QR not Verified! User not invited to this event");
          break;
        case 404:
          setError("Invalid QR Code. User not found!");
          break;
        case 500:
          setError("Internal Server Error");
          break;
        default:
          setError(`Unknown error: ${err.response.status}`);
      }
    } else {
      setError("Network Error");
      setStatus(null);
    }
  };

  const renderContent = () => {
    if (selectedOption && selectedOption.value) {
      if (encryptedqrdata) {
        return <QrProfile userdata={data} option={selectedOption} status={status} />;
      }
      return (
        <ScannerContent
          selectedOption={selectedOption}
          handleChange={handleChange}
          eventList={eventList}
          setEncryptedQRData={setEncryptedQRData}
          error={error}
        />
      );
    }
    return (
      <ChooseEventContent
        handleChange={handleChange}
        eventList={eventList}
      />
    );
  };

  return <div>{renderContent()}</div>;
};

const ScannerContent = ({ selectedOption, handleChange, eventList, setEncryptedQRData, error }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col scanner">
          <QrReader
            facingMode="environment"
            onResult={(result, err) => {
              if (result) {
                setEncryptedQRData(result?.text);
              }
            }}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
    <Select
      className="select"
      defaultValue={selectedOption}
      onChange={handleChange}
      options={eventList}
      isMulti={false}
      isClearable={true}
    />
    {error === "Network Error" && <div>"Network Error"</div>}
  </motion.div>
);

const ChooseEventContent = ({ handleChange, eventList }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="temptext">
      <p>Choose one of your personal events you want to start scanning for</p>
    </div>
    <Select
      className="select"
      onChange={handleChange}
      options={eventList}
      isMulti={false}
      isClearable={true}
    />
  </motion.div>
);

export default Scanner;