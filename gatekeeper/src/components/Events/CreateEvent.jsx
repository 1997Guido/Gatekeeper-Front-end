import React from "react";
import axiosinstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import "./../../css/CreateEvent.css";
import { Link } from "react-router-dom";
import * as TbIcons from "react-icons/tb";

function CreateEvent() {
  let csrftoken = useCookies(["csrftoken"]);
  const [Success, setSuccess] = useState(false);
  const [error, setError] = useState("no error");
  const [EventInfo, setEventInfo] = useState({
    EventTitle: "",
    EventDescription: "",
    EventDate: "",
    EventTimeStart: "",
    EventTimeEnd: "",
    EventLocation: "",
    EventMaxGuests: "",
    EventOrganizer: "",
  });
  const handleChange = (event) => {
    setEventInfo({ ...EventInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    console.log(EventInfo);
    event.preventDefault();
    axiosinstance
      .post(
        "api/eventcreationapi",
        {
          EventTitle: EventInfo.EventTitle,
          EventDescription: EventInfo.EventDescription,
          EventDate: EventInfo.EventDate,
          EventTimeStart: EventInfo.EventTimeStart,
          EventTimeEnd: EventInfo.EventTimeEnd,
          EventLocation: EventInfo.EventLocation,
          EventMaxGuests: EventInfo.EventMaxGuests,
          EventOrganizer: EventInfo.EventOrganizer,
        },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        console.log("Error", response);
        setError(response.data);
        console.log(EventInfo);
        console.log(response);
        setSuccess(true);
      })
      .catch(function (error) {
        console.log("Error", error);
        setError(error.response.data);
      });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {Success ? (
          <div>Successs</div>
        ) : (
          <div className="container-flex CreateEventContainer">
            <form onSubmit={handleSubmit} className="myFormEvent">
              <div className="myFormGroupEvent">
                <label htmlFor="EventTitle">EventTitle</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventTitle}</div>
                ) : null}
                <input
                  type="text"
                  className="form-control"
                  name="EventTitle"
                  placeholder="Enter EventTitle"
                  onChange={handleChange}
                  value={EventInfo.EventTitle}
                />
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventDescription">EventDescription</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventDescription}</div>
                ) : null}
                <input
                  type="text"
                  className="form-control"
                  name="EventDescription"
                  placeholder="Enter EventDescription"
                  onChange={handleChange}
                  value={EventInfo.EventDescription}
                />
              </div>
              <div className="myFormGroupRegister">
                <label htmlFor="date_of_birth">Date of Event</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventDate}</div>
                ) : null}
                <input
                  type="date"
                  className="form-control"
                  name="EventDate"
                  placeholder="Date of Event"
                  onChange={handleChange}
                  value={EventInfo.EventDate}
                />
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventLocation">EventLocation</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventLocation}</div>
                ) : null}
                <input
                  type="text"
                  className="form-control"
                  name="EventLocation"
                  placeholder="Enter EventLocation"
                  onChange={handleChange}
                  value={EventInfo.EventLocation}
                />
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventMaxGuests">EventMaxGuests</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventMaxGuests}</div>
                ) : null}
                <input
                  type="text"
                  className="form-control"
                  name="EventMaxGuests"
                  placeholder="Enter EventMaxGuests"
                  onChange={handleChange}
                  value={EventInfo.EventMaxGuests}
                />
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventOrganizer">EventOrganizer</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventOrganizer}</div>
                ) : null}
                <input
                  type="text"
                  className="form-control"
                  name="EventOrganizer"
                  placeholder="Enter EventOrganizer"
                  onChange={handleChange}
                  value={EventInfo.EventOrganizer}
                />
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventTimeStart">EventTimeStart</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventTimeStart}</div>
                ) : null}
                <input
                  type="time"
                  className="form-control"
                  name="EventTimeStart"
                  placeholder="Enter EventTimeStart"
                  onChange={handleChange}
                  value={EventInfo.EventTimeStart}
                />
              </div>
              <div className="myFormGroupEvent">
                <label htmlFor="EventTimeEnd">EventTimeEnd</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventTimeEnd}</div>
                ) : null}
                <input
                  type="time"
                  className="form-control"
                  name="EventTimeEnd"
                  placeholder="Enter EventTimeEnd"
                  onChange={handleChange}
                  value={EventInfo.EventTimeEnd}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Event
              </button>
            </form>
          </div>
        )}
      </motion.div>
      <Link to="/events">
        <TbIcons.TbArrowBackUp className="BackButton" />
      </Link>
    </>
  );
}

export default CreateEvent;
