import "./../../css/Miscellaneous/GlobalStyle.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import { Link } from "react-router-dom";
import * as TbIcons from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";


function MyEvents() {
  const [events, setevent] = useState([]);
  const navigate = useNavigate();
  const navigateToSingleEvent = (singleventpk) => {
    localStorage.setItem("singleventpk", singleventpk);
    navigate("/singleeventview");
  };
  const getPersonalEvents = async () => {
    await axiosinstance
      .get("/api/eventslist?show=owned")
      .then(function (response) {
        setevent(response.data);
      });
  };

  useEffect(() => {
    getPersonalEvents();
  }, []);
  return (
    <>
        <div className="container-fluid">
        <div className="row">
          <div className="col EventBanner">My Events</div>
        </div>
        {events.map((event, index) => (
          <EventCard event={event} key={index} />
          ))}
          </div>
        <div className="heightmaker"></div>
      <Link to="/events">
        <TbIcons.TbArrowBackUp className="BackButton" />
      </Link>
    </>
  );
}

export default MyEvents;
