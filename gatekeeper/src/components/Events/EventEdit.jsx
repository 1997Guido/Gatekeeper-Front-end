import React from "react";
import axiosInstance from "../../api/axiosApi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import "./../../css/Events/EventEdit.css";
import axios from "axios";
function EventEdit({ eventdata }) {
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
    EventLatitude: "",
    EventLongitude: "",
    EventLocationName: eventdata.EventLocationName,
    EventMaxGuests: eventdata.EventMaxGuests,
    EventOrganizer: eventdata.EventOrganizer,
    EventIsCancelled: eventdata.EventIsCancelled,
    EventIsPrivate: eventdata.EventIsPrivate,
    EventPrice: eventdata.EventPrice,
    EventMinimumAge: eventdata.EventMinimumAge,
    pk: eventdata.pk,
    EventBanner: null,
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const mediaURL =
    process.env.NODE_ENV === "production"
      ? "https://guidoerdtsieck.nl"
      : "http://localhost:8000";
  const [currentEventBanner, setCurrentEventBanner] = useState(
    mediaURL + eventdata.EventBannerURL
  );

  const handleChange = (event) => {
    if (event.target.name === "EventBanner") {
      setEventInfo({ ...EventInfo, EventBanner: event.target.files[0] });
    } else {
      setEventInfo({ ...EventInfo, [event.target.name]: event.target.value });
    }
  };

  const handleLocationSearch = async (event) => {
    const searchValue = event.target.value;
    setEventInfo({ ...EventInfo, EventLocationName: searchValue });

    if (searchValue.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchValue
          )}`
        );
        setLocationSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    } else {
      setLocationSuggestions([]);
    }
  };

  const selectLocation = (suggestion) => {
    setEventInfo({
      ...EventInfo,
      EventLocationName: suggestion.display_name,
      EventLatitude: suggestion.lat,
      EventLongitude: suggestion.lon,
    });
    setLocationSuggestions([]);
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            setEventInfo({
              ...EventInfo,
              EventLocationName: response.data.display_name,
              EventLatitude: latitude,
              EventLongitude: longitude,
            });
          } catch (error) {
            console.error("Error in reverse geocoding:", error);
            setError({
              ...error,
              EventLocationName: "Could not find the location",
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setError({
            ...error,
            EventLocationName: "Could not get current location",
          });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError({ ...error, EventLocationName: "Geolocation not supported" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(EventInfo).forEach((key) => {
      if (key === "EventBanner" && EventInfo[key]) {
        formData.append(key, EventInfo[key], EventInfo[key].name);
      } else if (key !== "EventBanner") {
        formData.append(key, EventInfo[key]);
      }
    });

    axiosInstance
      .put(`api/eventupdate/${EventInfo.pk}/`, formData, {
        headers: {
          "X-CSRFToken": csrftoken[0].csrftoken,
          "Content-Type": "multipart/form-data",
        },
      })
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
                <label htmlFor="EventLocation">Event Location</label>
                {error !== "no error" ? (
                  <div className="error">{error.EventLocation}</div>
                ) : null}
                <input
                  type="text"
                  className="form-control"
                  name="EventLocation"
                  placeholder="Enter EventLocation"
                  onChange={handleLocationSearch}
                  value={EventInfo.EventLocationName}
                />
                <button type="button" onClick={getCurrentLocation}>
                  Use My Current Location
                </button>
                {locationSuggestions.length > 0 && (
                  <ul className="location-suggestions">
                    {locationSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => selectLocation(suggestion)}
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                )}
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
                <div className="EventBannerPreviewContainer">
                  {currentEventBanner && (
                    <img
                      className="EventBannerPreview"
                      src={currentEventBanner}
                      alt="Current Event Banner"
                    />
                  )}
                </div>
                {error !== "no error" && (
                  <div className="error">{error.EventBanner}</div>
                )}
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
