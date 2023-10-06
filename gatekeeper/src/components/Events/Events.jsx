import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosApi";
import * as TbIcons from "react-icons/tb";
import EventCard from "./EventCard";
import "./../../css/Events/Events.css";
import "bootstrap/dist/css/bootstrap.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axiosInstance.get("/api/eventslist");
        setEvents(response.data);
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      }
    };
    getEvents();
  }, []);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col EventBanner">Events</div>
        </div>
        {events.map((event, index) => (
          <EventCard event={event} key={index} />
        ))}
      </div>
          </motion.div>
      <div className="heightmaker"></div>
      <Link to="/myevents">
        <TbIcons.TbListDetails className="EventButton" />
      </Link>
      <Link to="/eventcreate">
        <TbIcons.TbPlus className="EventButton2" />
      </Link>
    </>
  );
};

export default Events;
