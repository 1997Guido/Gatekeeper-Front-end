import React from "react";
import axiosInstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import "./../../css/Events/EventEdit.css";

function EventEdit({eventdata}) {
  let csrftoken = useCookies(["csrftoken"]);
  const [isChecked, setIsChecked] = useState(eventdata.EventIsPrivate);
  const [Status, setStatus] = useState("ready");
  const [error, setError] = useState("no error");
  const [EventInfo, setEventInfo] = useState({
    EventTitle: eventdata.EventTitle,
    EventDescription: eventdata.EventDescription,
    EventDate: eventdata.EventDate,
    EventTimeStart: eventdata.EventTimeStart,
    EventTimeEnd: eventdata.EventTimeEnd,
    EventLocation: eventdata.EventLocation,
    EventMaxGuests: eventdata.EventMaxGuests,
    EventOrganizer: eventdata.EventOrganizer,
    EventIsCancelled: eventdata.EventIsCancelled,
    EventIsPrivate: eventdata.EventIsPrivate,
    EventPrice: eventdata.EventPrice,
    EventMinimumAge: eventdata.EventMinimumAge,
    pk: eventdata.pk,
    EventBanner: null,  // Initialize EventBanner as null
  });
  const [currentEventBanner, setCurrentEventBanner] = useState(eventdata.EventBannerURL); // Add this line

  const handleChange = (event) => {
    if (event.target.name === "EventBanner") {
      setEventInfo({ ...EventInfo, EventBanner: event.target.files[0] });
    } else {
      setEventInfo({ ...EventInfo, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(EventInfo).forEach(key => {
      // Append only if EventBanner is changed
      if (key === "EventBanner" && EventInfo[key]) {
        formData.append(key, EventInfo[key], EventInfo[key].name);
      } else if (key !== "EventBanner") {
        formData.append(key, EventInfo[key]);
      }
    });

    axiosInstance.put(
      `api/eventupdate/${EventInfo.pk}/`,
      formData,
      { 
        headers: { 
          "X-CSRFToken": csrftoken[0].csrftoken,
          "Content-Type": "multipart/form-data", 
        } 
      }
    )
    .then(function (response) {
      setStatus("Event edited");
      window.scrollTo(0, 0);
    })
    .catch(function (error) {
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
        <div>
          <div
            onClick={() => setStatus("ready")}
            className="container-flex EditEventContainer"
          >
            <form onSubmit={handleSubmit} className="myFormGroupEvent">
              <div className="">
                {Status === "Event edited" ? (
                  <div className="success">Event Edited</div>
                ) : null}
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
                <label for="EventDescription">Event Description</label>
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
                <label htmlFor="EventLocation">
                  Where is your event going to be located?
                </label>
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
                <label htmlFor="EventMaxGuests">
                  What is your guest capacity?
                </label>
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
                  placeholder="Enter EventOrganizer"
                  onChange={handleChange}
                  value={EventInfo.EventOrganizer}
                />
              </div>
              <div className="myFormEditEvent">
                <label htmlFor="EventTimeStart">
                  When will your event start?
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
                <label htmlFor="EventMinimumAge">
                  How old should your guests be?
                  <br />
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
              <div className="myFormGroupEvent">
                <label htmlFor="EventBanner">Event Banner</label>
                {currentEventBanner && (
                  <img src={currentEventBanner} alt="Current Event Banner" />
                )}
                {error !== "no error" && <div className="error">{error.EventBanner}</div>}
                <input
                  type="file"
                  className="form-control"
                  name="EventBanner"
                  onChange={handleChange}
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
