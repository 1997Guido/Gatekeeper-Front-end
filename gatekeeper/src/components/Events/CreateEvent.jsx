import React from "react";
import axiosinstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import "./../../css/Events/CreateEvent.css";
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
        window.scrollTo(0, 0);
      })
      .catch(function (error) {
        console.log("Error", error);
        setError(error.response.data);
        window.scrollTo(0, 0);
      });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          onClick={() => setSuccess(false)}
          className="container-flex CreateEventContainer"
        >
          <form onSubmit={handleSubmit} className="myFormEvent">
            <div className="myFormGroupEvent">
              {Success ? <div className="success">Event Created</div> : null}
              <label htmlFor="EventTitle">Event Title</label>
              {error !== "no error" ? (
                <div className="error">{error.EventTitle}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="EventTitle"
                placeholder="What is the title of your event?"
                onChange={handleChange}
                value={EventInfo.EventTitle}
              />
            </div>
            <div className="myFormGroupEvent">
              <label htmlFor="EventDescription">Description</label>
              {error !== "no error" ? (
                <div className="error">{error.EventDescription}</div>
              ) : null}
              <textarea
                className="form-control"
                name="EventDescription"
                placeholder="What is the description of your event?"
                onChange={handleChange}
                value={EventInfo.EventDescription}
                rows="4"
                maxLength={100}
              ></textarea>
            </div>
            <div className="myFormGroupRegister">
              <label htmlFor="date_of_birth">Date</label>
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
              <label htmlFor="EventLocation">Location</label>
              {error !== "no error" ? (
                <div className="error">{error.EventLocation}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="EventLocation"
                placeholder="Where is your event located?"
                onChange={handleChange}
                value={EventInfo.EventLocation}
              />
            </div>
            <div className="myFormGroupEvent">
              <label htmlFor="EventMaxGuests">Event Capacity</label>
              {error !== "no error" ? (
                <div className="error">{error.EventMaxGuests}</div>
              ) : null}
              <input
                type="range"
                className="form-range"
                min={0}
                max={1000}
                name="EventMaxGuests"
                placeholder="Enter Capacity"
                onChange={handleChange}
                value={EventInfo.EventMaxGuests}
              />
              <input
                type="text"
                className="form-control"
                name="EventMaxGuests"
                placeholder="Event Capacity"
                onChange={handleChange}
                value={EventInfo.EventMaxGuests}
              />
            </div>
            <div className="myFormGroupEvent">
              <label htmlFor="EventOrganizer">
                Who or what is organizing this event?
              </label>
              {error !== "no error" ? (
                <div className="error">{error.EventOrganizer}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="EventOrganizer"
                placeholder="Tell me i'm curious:)"
                onChange={handleChange}
                value={EventInfo.EventOrganizer}
              />
            </div>
            <div className="myFormGroupEvent">
              <label htmlFor="EventTimeStart">
                When does your event start?
              </label>
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
              <label htmlFor="EventTimeEnd">When does your event end?</label>
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
            <div className="myFormEditEvent price">
              <label htmlFor="EventPrice">What is the price?</label>
              <br />
              {error !== "no error" ? (
                <div className="error">{error.EventPrice}</div>
              ) : null}
              ${EventInfo.EventPrice}
              <input
                type="range"
                className="form-range"
                min={0}
                max={300}
                name="EventPrice"
                placeholder="Enter EventPrice"
                onChange={handleChange}
                value={EventInfo.EventPrice}
              />
            </div>
            <div className="myFormEditEvent price">
              <label htmlFor="EventMinimumAge">
                What is the minimum age for this event?
              </label>
              <br />
              {error !== "no error" ? (
                <div className="error">{error.EventMinimumAge}</div>
              ) : null}
              {EventInfo.EventMinimumAge} years old
              <input
                type="range"
                className="form-range"
                name="EventMinimumAge"
                placeholder="Enter EventMinimumAge"
                onChange={handleChange}
                value={EventInfo.EventMinimumAge}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
          </form>
        </div>
        <div className="heightmaker"></div>
      </motion.div>
      <Link to="/events">
        <TbIcons.TbArrowBackUp className="BackButton" />
      </Link>
    </>
  );
}

export default CreateEvent;
