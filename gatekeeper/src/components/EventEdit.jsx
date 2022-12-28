import React from "react";
import axiosInstance from "../api/axiosApi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";

function EventEdit() {
    let singleevent = JSON.parse(localStorage.getItem("singleevent"));
    let csrftoken = useCookies(['csrftoken'])
    const [Success, setSuccess] = useState(false);  
  const [EventInfo, setEventInfo] = useState({
    EventTitle: singleevent.EventTitle,
    EventDescription: singleevent.EventDescription,
    EventDate: singleevent.EventDate,
    EventTimeStart: singleevent.EventTimeStart,
    EventTimeEnd: singleevent.EventTimeEnd,
    EventLocation: singleevent.EventLocation,
    EventMaxGuests: singleevent.EventMaxGuests,
    EventOrganizer: singleevent.EventOrganizer,
    EventInvitedGuests: singleevent.EventInvitedGuests,
    EventIsCancelled: singleevent.EventIsCancelled,
    EventIsPrivate: singleevent.EventIsPrivate,
    EventPrice: singleevent.EventPrice,
    EventMinimumAge: singleevent.EventMinimumAge,
  });
  const handleChange = (event) => {
    setEventInfo({ ...EventInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    console.log(EventInfo);
    event.preventDefault();
    axiosInstance
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
          EventInvitedGuests: EventInfo.EventInvitedGuests,
          EventIsCancelled: EventInfo.EventIsCancelled,
          EventIsPrivate: EventInfo.EventIsPrivate,
          EventPrice: EventInfo.EventPrice,
          EventMinimumAge: EventInfo.EventMinimumAge,
        },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response) {
        console.log(EventInfo);
        console.log(response);
        setSuccess(true);
      });
  };
  return (
    <div className="container-flex CreateEventContainer">
      <form onSubmit={handleSubmit} className="myFormEvent">
        <div className="myFormGroupEvent">
          <label htmlFor="EventTitle">EventTitle</label>
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
          <input
            type="time"
            className="form-control"
            name="EventTimeEnd"
            placeholder="Enter EventTimeEnd"
            onChange={handleChange}
            value={EventInfo.EventTimeEnd}
          />
        </div>
        <div className="myFormGroupEvent">
          <label htmlFor="EventTimeEnd">EventTimeEnd</label>
          <input
            type="time"
            className="form-control"
            name="EventTimeEnd"
            placeholder="Enter EventTimeEnd"
            onChange={handleChange}
            value={EventInfo.EventTimeEnd}
          />
        </div>
        <div className="myFormGroupEvent">
          <label htmlFor="EventPrice">EventPrice</label>
          <input
            type="text"
            className="form-control"
            name="EventPrice"
            placeholder="Enter EventPrice"
            onChange={handleChange}
            value={EventInfo.EventPrice}
          />
        </div>
        <div className="myFormGroupEvent">
          <label htmlFor="EventMinimumAge">EventMinimumAge</label>
          <input
            type="text"
            className="form-control"
            name="EventMinimumAge"
            placeholder="Enter EventMinimumAge"
            onChange={handleChange}
            value={EventInfo.EventMinimumAge}
          />
        </div>
        <div className="myFormGroupEvent">
          <label htmlFor="EventIsCancelled">EventIsCancelled</label>
          <input
            type="text"
            className="form-control"
            name="EventIsCancelled"
            placeholder="Enter EventIsCancelled"
            onChange={handleChange}
            value={EventInfo.EventIsCancelled}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default EventEdit;
