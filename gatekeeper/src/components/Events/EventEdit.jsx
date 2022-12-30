import React from "react";
import axiosInstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import "./../../css/EventEdit.css";

function EventEdit() {
    let singleevent = JSON.parse(localStorage.getItem("singleevent"));
    let csrftoken = useCookies(['csrftoken'])
    const [Status, setStatus] = useState('ready');  
  const [EventInfo, setEventInfo] = useState({
    EventTitle: singleevent.EventTitle,
    EventDescription: singleevent.EventDescription,
    EventDate: singleevent.EventDate,
    EventTimeStart: singleevent.EventTimeStart,
    EventTimeEnd: singleevent.EventTimeEnd,
    EventLocation: singleevent.EventLocation,
    EventMaxGuests: singleevent.EventMaxGuests,
    EventOrganizer: singleevent.EventOrganizer,
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
      .put(
        "api/eventeditapi",
        {
          EventTitle: EventInfo.EventTitle,
          EventDescription: EventInfo.EventDescription,
          EventDate: EventInfo.EventDate,
          EventTimeStart: EventInfo.EventTimeStart,
          EventTimeEnd: EventInfo.EventTimeEnd,
          EventLocation: EventInfo.EventLocation,
          EventMaxGuests: EventInfo.EventMaxGuests,
          EventOrganizer: EventInfo.EventOrganizer,
          EventIsCancelled: EventInfo.EventIsCancelled,
          EventIsPrivate: EventInfo.EventIsPrivate,
          EventPrice: EventInfo.EventPrice,
          EventMinimumAge: EventInfo.EventMinimumAge,
          pk: singleevent.pk,
        },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response, error) {
        console.log(response)
        if (response.status === 200){
          if(response.data === "Event edited"){
          setStatus("Event edited");
          }
          else{
            console.log(response.headers['content-type'])
            console.log(Status)
          setStatus(response.headers['content-type'])
          console.log(Status)
          }
        }
        else{
          setStatus(error)
        }
      });
  };
  return (
  <>
  {Status === "ready" ? (
  <div>
    <div className="container-flex EditEventContainer">
      <form onSubmit={handleSubmit} className="myFormGroupEvent">
        <div className="">
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
        <div className="">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
          Edit Event
        </button>
      </form>
    </div>
    <div className="heightmaker"></div>
  </div>
  ) : (
    <>
    {Status === "Event edited" ? (
    <div className="Success">{Status}</div>
  ) : (
    <div>
      <div className="Error">{Status}</div>
    <div className="container-flex EditEventContainer">
      <form onSubmit={handleSubmit} className="myFormGroupEvent">
        <div className="">
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
        <div className="">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
        <div className="myFormEditEvent">
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
          Edit Event
        </button>
        <div className="Error">{Status}</div>
      </form>
    </div>
    <div className="heightmaker"></div>
  </div>
  )}
    </>
  )}
  </>
  );
}

export default EventEdit;
