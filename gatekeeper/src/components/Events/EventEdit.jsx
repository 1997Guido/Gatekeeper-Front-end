import React from "react";
import axiosInstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import "./../../css/Events/EventEdit.css";

function EventEdit(event) {
  let csrftoken = useCookies(["csrftoken"]);
  const [isChecked, setIsChecked] = useState(event.eventdata.EventIsPrivate);
  const [Status, setStatus] = useState("ready");
  const [error , setError] = useState("no error");
  const [EventInfo, setEventInfo] = useState({
    EventTitle: event.eventdata.EventTitle,
    EventDescription: event.eventdata.EventDescription,
    EventDate: event.eventdata.EventDate,
    EventTimeStart: event.eventdata.EventTimeStart,
    EventTimeEnd: event.eventdata.EventTimeEnd,
    EventLocation: event.eventdata.EventLocation,
    EventMaxGuests: event.eventdata.EventMaxGuests,
    EventOrganizer: event.eventdata.EventOrganizer,
    EventIsCancelled: event.eventdata.EventIsCancelled,
    EventIsPrivate: event.eventdata.EventIsPrivate,
    EventPrice: event.eventdata.EventPrice,
    EventMinimumAge: event.eventdata.EventMinimumAge,
    pk: event.eventdata.pk,
  });
  const handleChange = (event) => {
    setEventInfo({ ...EventInfo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
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
          EventIsPrivate: isChecked,
          EventPrice: EventInfo.EventPrice,
          EventMinimumAge: EventInfo.EventMinimumAge,
          pk: EventInfo.pk,
        },
        { headers: { "X-CSRFToken": csrftoken[0].csrftoken } }
      )
      .then(function (response, error) {
        console.log(response);
        if (response.status === 200) {
          if (response.data === "Event edited") {
            setError("no error")
            setStatus("Event edited");
            window.scrollTo(0, 0);
          } else {
            window.scrollTo(0, 0);
            setError(response.data)
          }
        } 
      }).catch(function (error) {
        console.log("Error",error);
      });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <div onClick={() => setStatus("ready")} className="container-flex EditEventContainer">
            <form onSubmit={handleSubmit} className="myFormGroupEvent">
              <div className="">
              {Status === "Event edited" ? (<div className="success">Event Edited</div>) : (null)}
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
              <div className="form-group">
                <label for="EventDescription">
                  Event Description
                </label>
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
              <div className="myFormEditEvent">
                <label htmlFor="EventLocation">Where is your event going to be located?</label>
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
              <div className="myFormEditEvent">
                <label htmlFor="EventMaxGuests">What is your guest capacity?</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventMaxGuests}</div>
                ) : null}
                <input
                  type="range"
                  className="form-range"
                  min={0}
                  max={1000}
                  name="EventMaxGuests"
                  placeholder="Enter EventPrice"
                  onChange={handleChange}
                  value={EventInfo.EventMaxGuests}
                />
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
                <label htmlFor="EventOrganizer">Who or what is organizing this event?</label>
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
              <div className="myFormEditEvent">
                <label htmlFor="EventTimeStart">When will your event start?</label>
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
              <div className="myFormEditEvent">
                <label htmlFor="EventTimeEnd">When will it end?</label>
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
                <label htmlFor="EventMinimumAge">How old should your guests be?<br/>
                {EventInfo.EventMinimumAge} years old
                </label>
                {error !== "no error" ? (
                  <div className="error">{error.EventMinimumAge}</div>
                ) : null}
                <input
                  type="range"
                  className="form-range"
                  name="EventMinimumAge"
                  placeholder="Enter EventMinimumAge"
                  onChange={handleChange}
                  value={EventInfo.EventMinimumAge}
                />
              </div>
              <div className="myFormEditEvent">
                              <label htmlFor="agree">
                Do you want your event to be private?
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
            </div>
              <button type="submit" className="btn btn-primary">
                Edit Event
              </button>
            </form>
          </div>
          <div className="heightmaker"></div>
        </div>
      </motion.div>
    </>

  );
}

export default EventEdit;
