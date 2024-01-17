import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../api/axiosApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as TbIcons from "react-icons/tb";
import "./../../css/Events/CreateEvent.css";

function CreateEvent() {
  let csrftoken = useCookies(["csrftoken"]);
  const [Success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [EventInfo, setEventInfo] = useState({
    EventTitle: "",
    EventDescription: "",
    EventDate: "",
    EventTimeStart: "",
    EventTimeEnd: "",
    EventLocationName: "",
    EventMaxGuests: "",
    EventOrganizer: "",
    EventPrice: "",
    EventMinimumAge: "",
    EventIsPrivate: false,
    EventIsCancelled: false,
    EventCurrentGuests: "",
    EventIsFree: false,
    EventBanner: null,
    EventLatitude: "",
    EventLongitude: "",
  });
  const [locationSuggestions, setLocationSuggestions] = useState([]);
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

  const handleChange = (event) => {
    if (event.target.name === "EventBanner") {
      setEventInfo({ ...EventInfo, EventBanner: event.target.files[0] });
    } else {
      setEventInfo({ ...EventInfo, [event.target.name]: event.target.value });
    }
  };

  const geocodeLocation = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          EventInfo.EventLocationName
        )}`
      );
      if (response.data && response.data[0]) {
        const { lat, lon } = response.data[0];
        setEventInfo({ ...EventInfo, EventLatitude: lat, EventLongitude: lon });
      }
    } catch (error) {
      console.error("Error in geocoding:", error);
      setError({
        ...error,
        EventLocationName: "Could not geocode the location",
      });
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await geocodeLocation();

    const formData = new FormData();
    Object.keys(EventInfo).forEach((key) => {
      if (key === "EventBanner" && EventInfo[key]) {
        formData.append(key, EventInfo[key], EventInfo[key].name);
      } else {
        formData.append(key, EventInfo[key]);
      }
    });

    axiosInstance
      .post("api/eventcreate", formData, {
        headers: {
          "X-CSRFToken": csrftoken[0].csrftoken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccess(true);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
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
              {error !== false ? (
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
              {error !== false ? (
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
              {error !== false ? (
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
              <label htmlFor="EventLocationName">Location</label>
              {error && error.EventLocationName ? (
                <div className="error">{error.EventLocationName}</div>
              ) : null}
              <input
                type="text"
                className="form-control"
                name="EventLocationName"
                placeholder="Where is your event located?"
                onChange={handleLocationSearch}
                value={EventInfo.EventLocationName}
              />
              {locationSuggestions.length > 0 && (
                <ul className="location-suggestions">
                  {locationSuggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => selectLocation(suggestion)}>
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              )}
              <button type="button" onClick={getCurrentLocation}>
                Use My Current Location
              </button>
            </div>
            <div className="myFormGroupEvent">
              <label htmlFor="EventMaxGuests">Event Capacity</label>
              {error !== false ? (
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
              {error !== false ? (
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
              {error !== false ? (
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
              {error !== false ? (
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
              {error !== false ? (
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
              {error !== false ? (
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
            <div className="myFormGroupEvent">
              <label htmlFor="EventBanner">Event Banner</label>
              {error !== false ? (
                <div className="error">{error.EventBanner}</div>
              ) : null}
              <input
                type="file"
                className="form-control"
                name="EventBanner"
                onChange={handleChange}
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
