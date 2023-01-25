import "./../../css/MyEvents.css";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosinstance from "../../api/axiosApi";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import * as TbIcons from "react-icons/tb";
import { useNavigate } from "react-router-dom";
function MyEvents() {
  const [event, setevent] = useState([]);
  const navigate = useNavigate();
  const navigateToSingleEvent = (singleventpk) => {
    localStorage.setItem("singleventpk", singleventpk);
    navigate("/singleeventview");
  };
  const getPersonalEvents = async () => {
    await axiosinstance
      .get("/api/eventviewapipersonal")
      .then(function (response) {
        setevent(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    getPersonalEvents();
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {event.map((event, index) => (
          <>
                        <div className="col SingleEventBanner">Your Events</div>
              <div className="row EventContainer" key={index}>
                <div className="col EventTitle">{event.EventTitle}</div>
                <div className="">
                  <div className="col">
                    Organized by:
                    <br />
                    {event.EventOrganizer}
                    <br />
                    {event.EventDate}
                    <br />
                    {event.EventLocation}
                    <br />
                  </div>
                </div>
                <div className="col">
                  <TbIcons.TbFileInfo
                    className="EventInfoButton"
                    onClick={() => navigateToSingleEvent(event.pk)}
                  />
                </div>
              </div>
          </>
        ))}
        <div className="heightmaker"></div>
      </motion.div>
      <Link to="/events">
        <TbIcons.TbArrowBackUp className="BackButton" />
      </Link>
    </>
  );
}

export default MyEvents;
